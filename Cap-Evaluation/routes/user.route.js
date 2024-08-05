const express = require("express");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware")
const adminCheck = require("../middleware/admin.middlware")

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Hello I am UserRouter");
});

userRouter.post("/register", async (req, res) => {
  const { name, age, email, password , role } = req.body;
  try {
    const newUser = new userModel({ name, age, email, password  , role });
    await newUser.save();

    res.status(201).send("User Registration Successfull");
  } catch (err) {
    res.status(500).send(`Error While Creating New USer : ${err}`);
  }
});


userRouter.get("/report" , auth,  (req,res)=>{
    res.send("you are passed")
})

userRouter.get("/students" , [auth , adminCheck ], async  (req,res)=>{
    const user = await userModel.find() 
    res.send(user)
})



userRouter.post("/login" , async (req,res)=>{
    const {email , password} = req.body ; 
    try{
    const user = await userModel.findOne({email,password}) ;

    

    if(!user){
        res.send("Invalild Credentials")
    }
    const token = jwt.sign({name : user.name , role : user.role}, "masai")
    res.json({message : "Welcome Back Here" , token})
    }catch(err){
        res.send(err)
    }

})

module.exports = userRouter;
