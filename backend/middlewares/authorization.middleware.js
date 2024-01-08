const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authorization = async(req, res, next) =>{
    const token = req.headers.authorization?.split(' ')[1] || req.headers.authorization;
    try{
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.body.userId = decoded.userId;
        next();
    }catch(err){
        res.status(500).send({Error: err.message});
    }
}

module.exports = authorization;