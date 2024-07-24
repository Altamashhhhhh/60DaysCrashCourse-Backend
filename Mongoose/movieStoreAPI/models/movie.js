const mongoose = require("mongoose");
const { type } = require("os");

const movieSchema = mongoose.Schema({
    title : {type : String , required : true , unique : true } ,
    rating : {type : Number , required : true} ,
    description : String , 
    cast : [{
        type : String 
    }] 
})


const movieModel = mongoose.model("movieapi" , movieSchema)

module.exports = movieModel ; 