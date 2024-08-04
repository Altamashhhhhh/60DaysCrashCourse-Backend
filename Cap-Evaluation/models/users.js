const mongoose = require("mongoose") ; 

mongoose.connect("mongodb://127.0.0.1:27017/courseManagement")

const userSchema = new  mongoose.Schema({
    id : Number , 
    username : String , 
    password : String , 
    enrolledCourse : [{type : String }]

})

const userModel = mongoose.model("users" , userSchema) ; 
module.exports = userModel ; 