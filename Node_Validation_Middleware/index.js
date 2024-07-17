const express = require("express") ;
const validatePostRequest = require("./validatePost") 

const app = express() ; 

app.use(express.json()) ; 


app.post("/" , validatePostRequest ,  (req,res)=>{
    res.status(200).send("data received ")

})



app.listen(3001, ()=>{
    console.log("Server 3001 is running in background")
})