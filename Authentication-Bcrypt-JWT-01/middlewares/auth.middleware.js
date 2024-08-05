const express = require("express")  ; 
const jwt = require("jsonwebtoken") ; 

const auth = (req,res,next)=>{
    let token = req.query.token ; 

    jwt.verify(token , process.env.SECRET_KEY  , function(err , decode){
        if(err){
            res.json({message : "Please Log-in First"})
        }
        if(decode){
            console.log(decode)
            next()
        }

    } )
}


module.exports = auth ; 