const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title : {type : String , required : true  , unique : true} , 
    description : {type : String , required : true  } , 
    price : {type : Number , required : true  } ,
    userId : {type : mongoose.Schema.Types.ObjectId , 
        ref : "user" , 
        required : true 
    } 
} , { timestamps : true })


const bookModel = mongoose.model("book" , bookSchema)

module.exports = bookModel 