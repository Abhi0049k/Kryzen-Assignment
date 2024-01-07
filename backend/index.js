const express = require('express');
const cors = require('cors');
const connection = require('./configs/db');
const userRouter = require('./routes/user.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send({msg: 'Welcome to Kryzen Assignment'});
})

app.use('/user', userRouter);

app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({Error: err.message || 'Internal Server Error'});
})

app.listen(PORT, ()=>{
    connection();
    console.log(`App is running on Port: ${PORT}`)
})