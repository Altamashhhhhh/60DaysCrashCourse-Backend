const userModel = require("../models/user.model")

function  roleAuth(allowedRoles){
    return (req , res , next)=>{
       try{
        if(!req.user){
            res.json({message : "User  not found "})
        }
        const token = req.headers.authorization.split(" ")[1]
        const role = req.user.role ;
        if(!allowedRoles.includes(role)){
            return res.json({message : "You Are Not Allowed to Access this route"})
        }
        next()
       }catch(error){
        res.json({message : "Error while checking roles authorization"})
       }
    }
}

module.exports = roleAuth 