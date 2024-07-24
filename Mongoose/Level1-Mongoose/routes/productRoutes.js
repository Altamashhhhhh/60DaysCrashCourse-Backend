const express = require("express") ; 
const productModel = require("../models/product");
const { route } = require("./userRoutes");

const router = express.Router() ; 


router.get("/get-product", async (req, res) => {
  let products = await productModel.find();
  res.status(201).send(products);
});

router.post("/add-product", async (req, res) => {
  try {
    let { name, price, description, category, stock } = req.body;
    productModel.create({
      name,
      price,
      description,
      category,
      stock,
    });

    res.status(201).send("Product Added Successfully");
  } catch (err) {
    res.status(404).send(`Error while adding product ${err}`);
  }
});

router.patch("/update-product/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let productInput = req.body;
    await productModel.findByIdAndUpdate(id, productInput);

    res.status(201).send("Product Updated Successfully");
  } catch (err) {
    res.status(404).send(`Error while updating product data ${err}`);
  }
});

router.delete("/delete-product/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.status(201).send(`Product Deleted Successfully`);
  } catch (err) {
    res.status(404).send(`Error While Deleting Product : ${err}`);
  }
});


module.exports = router ; 