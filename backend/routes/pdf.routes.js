const express = require("express");
const path = require('path');

const pdfRouter = express.Router();

pdfRouter.get('/:name', (req, res, next)=>{
    const {name} = req.params;
    const filePath = path.join(__dirname, '..','pdfs', name);
    console.log(filePath);
    res.status(200).sendFile(filePath, (err)=>{
        if(err){
            console.log(err);
            res.status(404).send({Error: 'File not found'})
        }
    });
})

module.exports = pdfRouter;