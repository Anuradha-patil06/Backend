const express=require("express");
const UserModel = require("../model/User");
const bcrypt=require("bcryptjs")
exports.getAllusers=async(req,res,next) => {
    try{
        const users=await UserModel.find();
        res.status(200).json(users);
    }catch(error){
        next(error)
    }
}

exports.userRegister=async (req,res,next) => {
    const {name,email,password,role}=req.body;
    console.log(name)
    try{
        const exitUser=await UserModel.findOne({email});
        if(exitUser){
            const error=new Error ("user already register")
            error.statuscode=400;
            throw error
        }
        const newpassword=await bcrypt.hash(password,10)
        const user=await UserModel.create({name,email,password:newpassword,role});
        res.status(201).json({message:"user registered successfully"})
    }catch(error){
        console.log(error)
        next(error)
    }
    
}
    
