const blockModel = require("../models/block.model")
const jwt = require("jsonwebtoken")


const auth = async (req,res,next) =>{
    try{
        if(!req.headers.authorization){
            return res.json({message : "token is not available in the header"})
        }
        const token = req.headers.authorization.split(" ")[1]
    
        const blocked = await blockModel.findOne({token})
        if(blocked){
            return res.json({message : "Token is Blocked : Please login again"})
        }
        jwt.verify(token , process.env.SECRET_KEY , (err,decode)=>{
            if(err){
                return res.json({message : "you are not Authorized to Access this website"})
            }
            if(decode){
                req.user = decode
                console.log(decode)
                next()
            }
        })
    } catch(error){
        res.json({message : "Error in Authentication" , error})
    }
}

module.exports = auth