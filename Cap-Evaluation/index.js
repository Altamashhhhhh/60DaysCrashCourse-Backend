const express = require("express")
const dotenv = require("dotenv").config() ;
const connection = require("./config/db") 
const userRouter = require("./routes/user.route")

const app = express() ; 
const port = process.env.PORT ; 

app.use(express.json())
app.use("/user" , userRouter )


app.get("/" , (req,res)=>{
    res.send("server is runnnig now ")
})

app.listen(port , ()=>{
    try{
        console.log("server is running now ")
    }catch(err){
        console.log(`error while running server and connecting to databse : ${err}`)
    }
})