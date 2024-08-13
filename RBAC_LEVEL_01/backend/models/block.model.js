const mongoose = require("mongoose")

const blockSchema = new mongoose.Schema({
    token : {type : String , required : true}
})

const blockModel = mongoose.model("block" , blockSchema)

module.exports = blockModel 