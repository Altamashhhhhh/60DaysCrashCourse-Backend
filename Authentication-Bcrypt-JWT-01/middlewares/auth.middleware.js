const express = require("express")  ; 
const jwt = require("jsonwebtoken") ; 

const auth = (req,res,next)=>{

    let authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing or invalid" });
      }

    let token = authHeader.split(" ")[1]

    jwt.verify(token , process.env.SECRET_KEY  , function(err , decode){
        if(err){
            return res.json({message : "Please Log-in First"})
        }
        if(decode){
            console.log(decode)
            next()
        }

    } )
}


module.exports = auth ; 