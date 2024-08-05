const express = require("express") ; 
const jwt = require("jsonwebtoken")

const auth = (req,res,next) =>{
    let token = req.query.token
   
    jwt.verify(token, 'masai', function(err, decoded) {
        if(err){
            res.send("you are not authorized to access this login first ")
        }
        if(decoded){
            req.body.username = decoded.name ; 
            req.body.role = decoded.role ; 
            console.log(decoded)
            next()
        }
      });
}

module.exports = auth ; 