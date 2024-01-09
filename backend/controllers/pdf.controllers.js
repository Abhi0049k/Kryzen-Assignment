const path = require('path');

const pdfs = (req, res, next)=>{
    const {name} = req.params;
    const filePath = path.join('backend', 'pdfs', name);
    res.status(200).sendFile(filePath, (err)=>{
        if(err){
            console.log(err);
            res.status(404).send({Error: 'File not found'})
        }
    });
}

module.exports = {pdfs};