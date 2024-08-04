const express = require("express") ; 
const morganLogger = require("./middleware/morganLogger") 
const userModel = require("./models/users") ; 
const courseModel = require("./models/course")

const app = express() ;
app.use(express.json()) 
app.use(morganLogger)

const port = 3001 ; 

app.get("/courses" ,async (req , res)=>{
    let courses = await   courseModel.find() ;
    // let parsedData = JSON.parse(courses)

    res.status(201).send(courses)
})


app.listen(port , ()=>{
    console.log(`port ${port} is running ......`)
})