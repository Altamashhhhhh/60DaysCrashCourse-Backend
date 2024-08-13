const express = require("express") 
const bookModel = require("../models/book.model")
const roleAuth = require("../middlewares/role.middleware")
const auth = require("../middlewares/auth.middleware")

const bookRouter = express.Router()

bookRouter.post("/add" ,  async (req,res)=>{
    try{
        const {_id} = req.params
        const {title , description , price , userId} = req.body
        const book = new bookModel({title , description , price , userId})
        await book.save()
        return res.json({message : "Book Addess Successfully"})
    }catch(error){
        return res.json({message : "Error while adding new book" , error})
    }
})

bookRouter.get("/allbooks" , (auth , roleAuth(["viewll"]))  , async (req,res)=>{
    try{
        const books = await bookModel.find() 
       return res.json(books)
    }catch(error){
       return res.json({message : "Error while fetching book from server" , error})
    }
})

bookRouter.patch("/update/:id"  , async (req,res)=>{
    try{
        const {id} = req.params ;
        const content = req.body ;
        const updated = await bookModel.findByIdAndUpdate(id ,content )
       return res.json({message : "Book Updated Successfully"  , updated})
    }catch(error){
        return res.json({message : "Error while upading the book" , error})
    }
 })


 bookRouter.delete("/delete/:id"   , async (req,res)=>{
    try{
    const {id} = req.params
    const book = await bookModel.findByIdAndDelete(id)
    if(!book){
       return res.json({message : "book not found "})
    }
    res.json({message : "Book Deleted Successfully" })
    }catch(error){
       return  res.json({message : "Error while deleting the book" , error})
    }
 })
 
module.exports = bookRouter ;