const { Router } = require("express");
const { userRegisterCredentials, userLoginCredentials } = require("../validations/user.validation");
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const userRouter = Router();

userRouter.post('/register', async(req, res, next)=>{
    const {name, email, password} = req.body;
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    try{
        const check = userRegisterCredentials.safeParse({name, email, password});
        if(!check.success) return next({status: 422, message: 'Invalid Credentials'});
        const userExists = await userModel.findOne({email});
        if(userExists) return next({status: 401, message: 'User Already Exists'});
        if(!SALT_ROUNDS) return next({status: 500, message: 'Internal Server Error'});
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = new userModel({name, email, password: hashedPassword});
        await newUser.save();
        res.status(201).send({message: 'User Added'});
    }catch(err){
        next({status: err.status, message: err.message});
    }
})

userRouter.post('/login', async(req, res, next)=>{
    let {email, password} = req.body;
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    try{
        const check = userLoginCredentials.safeParse({email, password});
        if(!check.success) return next({status: 422, message: 'Invalid Credentials'});
        const userExists = await userModel.findOne({email});
        if(!userExists) return next({status: 401, message: 'User not found'});
        const match = await bcrypt.compare(password, userExists.password);
        if(!match) return next({status: 401, message: 'Incorrect Password'});
        if(!JWT_SECRET_KEY) next({status: 500, message: 'Internal Server Error'})
        const token = jwt.sign({userId: userExists.id}, JWT_SECRET_KEY);
        res.status(200).send({token});
    }catch(err){
        next({status: err.status, message: err.message});
    }
})

module.exports = userRouter;
