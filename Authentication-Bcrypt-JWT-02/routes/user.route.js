const express = require("express")  
const mongoose = require("mongoose")
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config() 
const auth = require("../middlewares/auth.middleware")
const blacklistModel = require("../models/blackListing.model")

const accesskey = process.env.ACCESS_KEY 
const refreshkey = process.env.REFRESH_KEY

const userRouter = express.Router() 

userRouter.post("/register" , async (req,res)=>{
    try{
    const {name , role , email , password} = req.body ;

    const hashedPassword =await  bcrypt.hash(password , 5 )

    const user = new userModel({name, role , email , password : hashedPassword})

    await user.save() ;

    res.send("new user created successfully")

    }catch(error){
        res.json({message : "Error while creating new user" , error})
    }
})

userRouter.post("/login" , async (req,res)=>{
    try{
    const {email, password } = req.body ; 
    const user = await userModel.findOne({email})
    const checkPassword = await bcrypt.compare(password , user.password)
    if(!checkPassword){
        return res.json({message : "Invalid Credentials"})
    }

    const accessToken = jwt.sign({name : user.name , role : user.role} , accesskey , {expiresIn : "15m"} )
    const refreshToken = jwt.sign({name : user.name , role : user.role} , refreshkey , {expiresIn : "1d"})

    res.json({message : "User logged in successfully" , accessToken , refreshToken})

    }catch(error){
        res.json({message : "error while logging in " , error})
    }
})


userRouter.post("/logout" ,auth ,  async (req,res)=>{
    const token = req.headers.authorization.split(" ")[1] 
    const loggedout = new blacklistModel({token})
    await loggedout.save()
    res.send("you are successfully logged out")
})



userRouter.get("/allusers" , auth , async (req,res)=>{
   try{
    const users = await userModel.find()
    res.send(users)
   }catch(error){
    res.json({error})
   }

})

module.exports = userRouter 