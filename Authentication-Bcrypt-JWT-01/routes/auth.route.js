const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");

const authRouter = express.Router();

const secretkey = process.env.SECRET_KEY;

authRouter.post("/register", async (req, res) => {
  const { name, email, role, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new userModel({ name, email, role, password: hashedPassword });
  user.save();
  res.json({ message: "User Successfully Signed Up " });
});



authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      res.json({ message: "Invalid Credentials" });
    }

    let token = jwt.sign({ name: user.name, role: user.role }, secretkey, {
      expiresIn: "1h",
    });
    res.json({ message: "User Successfully Logged in ", token });
  } catch (error) {
    res.json({ message: "Error Logging In", error: error });
  }
});

module.exports = authRouter;
