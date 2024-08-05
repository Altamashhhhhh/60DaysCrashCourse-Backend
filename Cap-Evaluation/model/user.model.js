const mongoose = require("mongoose") ; 

const userSchema = mongoose.Schema({
    name : {type : String , required : true },
    age : {type : Number , required : true },
    email : {type : String , required : true },
    password : {type : String , required : true },
    role : { type : String , required : true }
}, {
    versionKey : false 
})


const userModel = mongoose.model("users" , userSchema) ; 

module.exports = userModel ; 