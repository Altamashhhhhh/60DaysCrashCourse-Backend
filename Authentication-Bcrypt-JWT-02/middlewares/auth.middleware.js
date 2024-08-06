const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blackListing.model")

const auth = async (req,res,next) =>{
    const authHeaders = req.headers.authorization
    if(!authHeaders){
        res.json({error :"Authorization headers is missing or invalid"})
    }

    let token = authHeaders.split(" ")[1]

    const findBlackListed = await blacklistModel.findOne({ token });
        if (findBlackListed) {
            return res.status(401).json({ error: "Token is blacklisted. Please log in again." });
        }
        
    console.log(findBlackListed)
    
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