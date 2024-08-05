const jwt = require("jsonwebtoken") ; 

const adminCheck = (req,res,next)=>{
    if(req.body.role === "admin"){
        next()
    }else{
        return res.send("you do not have access to this features")
    }
}


module.exports = adminCheck ; 