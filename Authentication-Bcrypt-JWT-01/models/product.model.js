const mongoose = require("mongoose") ; 

const productSchema =  new mongoose.Schema({
    name : {type : String , required : true } ,
    price : {type : Number , required : true } ,
    description : {type : String , required : true }
})

const productModel = mongoose.model("product" ,  productSchema) ; 

module.exports = productModel ; 