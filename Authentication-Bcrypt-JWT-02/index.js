const express = require("express")
const dotenv = require("dotenv").config()
const userRouter = require("./routes/user.route")
const connection = require("./config/db")
const tokenRouter = require("./routes/token.route")

const app = express() ; 
const port = process.env.PORT ; 

app.use(express.json())
app.use("/user" , userRouter)
app.use("/token" , tokenRouter)

app.get("/homepage" , (req, res)=>{
    res.send("welcome to the homepage")
})

app.listen(port , ()=>{
    console.log(`port ${port} is running in the background`)
})


