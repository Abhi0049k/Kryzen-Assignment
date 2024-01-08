const { Router } = require("express");
const PDFDocument = require('pdfkit');
const axios = require('axios');
const fs = require('fs');
const authorization = require("../middlewares/authorization.middleware");
// const cloudinary = require("../configs/cloudinary");
// const upload = require("../configs/multer");

const formRouter = Router();
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY
});


formRouter.post('/submit-form', authorization ,async (req, res, next)=>{
    const files = req.files.photo;
    const {name, age, address} = req.body;
    if(!files) next({status: 404, message: 'Photo not found'});
    if(!name|| !age || !address) next({status: 404, message: 'Incomplete data'})
    try{
        let result = await cloudinary.uploader.upload(files.tempFilePath,{
            folder: 'photos'
        })
        console.log(result.secure_url);
        const doc = new PDFDocument();
        doc.fontSize(16).text('User Details: ', {underline: true});
        doc.fontSize(14).text(`Name: ${name}`)
        doc.fontSize(14).text(`Age: ${age}`)
        doc.fontSize(14).text(`Address: ${address}`);

        const imageResponse = await axios.get(result.secure_url, { responseType: 'arraybuffer' });
        const imagePath = 'tempImage.png'; 

        fs.writeFileSync(imagePath, imageResponse.data);

        doc.image(imagePath, { width: 200, height: 200 });

        fs.unlinkSync(imagePath);
        
        const pdfPath = 'tempDocument.pdf';
        const pdfStream = fs.createWriteStream(pdfPath);
        doc.pipe(pdfStream);
        doc.end();

        await new Promise((resolve, reject) => {
            pdfStream.on('finish', resolve);
            pdfStream.on('error', reject);
        });

        const pdfResult = await cloudinary.uploader.upload(pdfPath, {
            folder: 'documents'
        });
        console.log(pdfResult);
        res.status(200).send({msg: 'Done'});
    }catch(err){
        console.log(err);
        next(err);
    }
})



// formRouter.post('/submit-form', upload.single("photo"), async (req, res, next)=>{
//     console.log(req.body)
//     // if(!req.photo) return next({status: 400, message: 'No file uploaded'});
//     // const {name, age, address, photo} = req.body;
//     try{
//         // cloudinary.UploadStream.upload(photo.tempFilePath, {resource_type: 'auto'}, (err, result)=>{
//         //     if(err){
//         //         console.log('Error Uploading image to cloudinary: ', err);
//         //         return next({status: 500, message: 'Internal Server Error'});
//         //     }
//         //     const imageUrl = result.secure_url;
//         //     res.json({imageUrl});
//         // })
//         console.log(req.body);
//         res.status(200).send({data: req.body})
//     }catch(err){
//         console.log(err);
//         next({message: err.message});
//     }
// })

module.exports = formRouter;