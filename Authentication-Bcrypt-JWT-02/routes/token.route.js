const express = require("express");
const auth = require("../middlewares/auth.middleware");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config()

const tokenRouter = express.Router();

tokenRouter.get("/" , (req,res)=>{
    res.send(` <h1 style="color : royalblue , text-align:center;"> WELCOME TO THE HOMEPAGE OF TOKEN GENERATION</h1>  `)
})


tokenRouter.get("/newtoken",  (req, res) => {
    const accessKey = process.env.ACCESS_KEY ;
    const refreshKey = process.env.REFRESH_KEY

  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.json({ error: "Authorization headers is missing or invalid" });
  }

  const refreshToken = authHeaders.split(" ")[1];

  jwt.verify(refreshToken, refreshKey, (err, decode) => {
    if (err) {
      return res.status(401).json({ error: "Invalid Refresh Token", err });
    }

    const accessToken = jwt.sign(
      { name: decode.name, role: decode.role },
      accessKey,
      { expiresIn: "10m" }
    );
    res.json({ message: "new token Successfully created", accessToken });
  });
});

module.exports = tokenRouter;
