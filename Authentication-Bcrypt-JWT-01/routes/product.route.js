const express = require("express") ; 

const productModel = require("../models/product.model") ;

const auth = require("../middlewares/auth.middleware") ; 

const prodRouter = express.Router() ; 

prodRouter.get("/getproducts" , auth , async (req,res)=>{ // get all the products from db
    const products = await productModel.find() ; 
    res.json(products)
})

prodRouter.post("/addproduct" , auth , async (req,res)=>{ //add new products
    try{
        const {name , price , description } = req.body ; 
    const newProduct = new productModel({name, price , description})
    await newProduct.save() ; 
    res.send({message : ` ${name} Product Added Successfully `})
    }
    catch(error){
        res.json({message : "Error while adding product" , error})
    }
})

prodRouter.get("/products/:id" , auth , async (req,res)=>{ // get product by id 
   try{
    const {id} = req.params ; 
    const product = await productModel.findById(id)
    
    res.send(product)

   } catch(err){
    res.json({message : "Error Finding Product by ID" , err})
   }
})

prodRouter.put("/update-product/:id" ,  auth , async (req,res)=>{ // find product by id and update 
    try{
        const {id} = req.params ; 
    const updatedProduct =await productModel.findByIdAndUpdate(id , req.body ) 
    res.json( {message : "product updated Successfully" , updatedProduct })
    }catch(error){
        res.json({message : "Error while updating the product by ID" , error})
    }
})

prodRouter.delete("/delete-product/:id" , auth , async (req,res)=>{
    const {id} = req.params ; 
    await productModel.findByIdAndDelete(id)
    res.json({message : "Product Is Successfullty Deleted"})
})

module.exports = prodRouter 