const mongoose = require("mongoose") 

const blackListingSchema = mongoose.Schema({
    token : {type : String }
})

const blackListModel = mongoose.model('blacklisted' , blackListingSchema)

module.exports = blackListModel 