const express = require("express") 
const dotenv = require("dotenv").config()
const connection = require("./config/db")
const userRouter = require("./routes/user.route")
const cors = require("cors")
const morgan = require("morgan")
const fs = require("fs") 
const path = require("path")
const { Stream } = require("stream")
const bookRouter = require("./routes/book.route")
const auth = require("./middlewares/auth.middleware")


const app = express()

const accessLog = fs.createWriteStream(path.join(__dirname , "logger.txt") , {flag : "a"})

app.use(morgan("combined" , {stream : accessLog}))
app.use(cors())
app.use(express.json())
app.use("/user" , userRouter)
app.use("/book",bookRouter)


app.get("/" , (req,res)=>{
    res.json({message : "WELCOME TO THE HOMEPAGE OF RBAC ASSIGNMENT"})
})
app.listen(3001 , ()=>{
    console.log("port 3001 is running ........")
})