const mongoose = require("mongoose") ; 

const connection = mongoose.connect(process.env.DATABASE).then(()=>console.log("DATABASE IS SUCCESSFULLY CONNECTED"))

module.exports = connection ; 