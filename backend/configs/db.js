const mongoose = require('mongoose');
require('dotenv').config();

const connection = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('Connection with the DB established');
    }catch(err){
        console.log(err);
    }
}

module.exports = connection;
