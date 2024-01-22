const formModel = require("../models/form.model");
const cloudinary = require("../configs/cloudinary");
require('dotenv').config();

const submitForm = async (req, res, next)=>{
    const files = req.files.photo;
    const {name, age, address, userId, n, selection} = req.body;
    if(!files) next({status: 404, message: 'Photo not found'});
    if(!name|| !age || !address) next({status: 404, message: 'Incomplete data'})
    try{
        let result = await cloudinary.uploader.upload(files.tempFilePath,{
            folder: 'photos'
        })
        const newForm = new formModel({name, age, address, photoUrl: result.url, securePhotoUrl: result.secure_url,userId});
        await newForm.save();
        res.status(200).send(newForm);
    }catch(err){
        console.log(err.message);
        next(err);
    }
}

module.exports = submitForm;
