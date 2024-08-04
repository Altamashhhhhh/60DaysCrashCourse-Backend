const mongoose = require("mongoose") ; 

mongoose.connect("mongodb://127.0.0.1:27017/courseManagement")

const courseSchema = new mongoose.Schema({
    id : String , 
    title : String , 
    category : String , 
    difficulty : String , 
    description : String , 

})

const courseModel = mongoose.model("course" , courseSchema) ; 
module.exports = courseModel ; 