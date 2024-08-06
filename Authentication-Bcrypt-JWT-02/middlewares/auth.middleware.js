const jwt = require("jsonwebtoken")


const auth = (req,res,next) =>{
    const authHeaders = req.headers.authorization
    if(!authHeaders){
        res.json({error :"Authorization headers is missing or invalid"})
    }

    let token = authHeaders.split(" ")[1]
    
    jwt.verify(token , process.env.ACCESS_KEY , function(err , decode ){
        if(err){
            res.send("Please Login First")
        }
        if(decode){
            next()
        }
    })
}

module.exports = auth ; 