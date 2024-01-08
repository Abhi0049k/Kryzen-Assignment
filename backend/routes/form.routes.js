const { Router } = require("express");
const PDFDocument = require('pdfkit');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const authorization = require("../middlewares/authorization.middleware");
const formModel = require("../models/form.model");
// const cloudinary = require("../configs/cloudinary");
// const upload = require("../configs/multer");

const formRouter = Router();
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;
const BACKEND_SERVER_URL = process.env.BACKEND_SERVER_URL;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY
});


formRouter.post('/submit-form', authorization ,async (req, res, next)=>{
    const files = req.files.photo;
    const {name, age, address, userId} = req.body;
    if(!files) next({status: 404, message: 'Photo not found'});
    if(!name|| !age || !address) next({status: 404, message: 'Incomplete data'})
    try{
        let result = await cloudinary.uploader.upload(files.tempFilePath,{
            folder: 'photos'
        })
        const doc = new PDFDocument();
        doc.fontSize(16).text('User Details: ', {underline: true});
        doc.fontSize(14).text(`Name: ${name}`)
        doc.fontSize(14).text(`Age: ${age}`)
        doc.fontSize(14).text(`Address: ${address}`);

        const imageResponse = await axios.get(result.secure_url, { responseType: 'arraybuffer' });
        const imagePath = 'tempImage.png'; 

        fs.writeFileSync(imagePath, imageResponse.data);

        doc.image(imagePath, { width: 500, height: 400 });

        fs.unlinkSync(imagePath);
        
        const pdfName = `${Date.now()}.pdf`
        const pdfPath = path.join(__dirname,'..', 'pdfs', pdfName)
        const pdfStream = fs.createWriteStream(pdfPath);
        doc.pipe(pdfStream);
        doc.end();

        await new Promise((resolve, reject) => {
            pdfStream.on('finish', resolve);
            pdfStream.on('error', reject);
        });

        const newForm = new formModel({name, age, address, photoUrl: result.url, securePhotoUrl: result.secure_url, pdfUrl: `${BACKEND_SERVER_URL}pdfs/${pdfName}`, securePdfUrl: `${BACKEND_SERVER_URL}pdfs/${pdfName}`, pdfName,userId});
        await newForm.save();
        res.status(200).send(newForm);
    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = formRouter;