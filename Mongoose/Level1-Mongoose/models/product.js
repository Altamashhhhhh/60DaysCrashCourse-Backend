const mongoose = require("mongoose") ; 

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    category: String,
    stock: { type: Number, default: 0 },
  });
  
  const productModel = mongoose.model("product", productSchema);

  module.exports = productModel ;