const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    age: Number,
    number: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    gender: String,
  });
  
  userModel = mongoose.model("user", userSchema);

  module.exports = userModel