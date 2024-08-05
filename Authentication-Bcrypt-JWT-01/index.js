const connection = require("./config/db");
const express = require("express") ; 
const authRoute = require("./routes/auth.route") ;  // this route is for login register 
const prodRouter = require("./routes/product.route") // this route is for products

const app = express() ;
const port = process.env.PORT || 3001 ;
app.use(express.json())


app.use("/auth" , authRoute)
app.use("/products" , prodRouter )

app.get("/homepage" , (req,res)=>{
    res.send(`
        <h1 style="color:#0066FF;text-align:center;font-size:3em;font-family:Arial;margin-top:20%;font-weight:bold;">
            Welcome to the Homepage
        </h1>
    `);
    
})



app.listen(port , ()=>{
    console.log(`${port} is running in the background`)
})