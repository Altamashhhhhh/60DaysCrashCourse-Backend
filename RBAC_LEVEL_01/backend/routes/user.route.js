const express = require("express");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const blockModel = require("../models/block.model");
const auth = require("../middlewares/auth.middleware");

userRouter.get("/users", async (req, res) => {
  try {
    const user = await userModel.find();
    res.json(user);
  } catch (error) {
    res.json({ message: "Error While Fetching Data from Server ", error });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const hashed = await bcrypt.hash(password, 5);
    const user = new userModel({ name, email, role, password: hashed });
    await user.save();
    res.json({message : "user registration done"});
  } catch (error) {
    res.json({ message: "error while registering new user", error });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "user not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ message: "Password is wrong" });
    }
    const token = jwt.sign(
      { name: user.name, role: user.role },
      process.env.SECRET_KEY
    );
    res.json({ message: "login Successfull", token });
  } catch (error) {
    res.json({ message: "Error while login ", error });
  }
});

userRouter.post("/logout", auth, async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.json({ message: "TOken is not available in header " });
    }
    const token = req.headers.authorization.split(" ")[1];
    const blocked = new blockModel({ token });
    await blocked.save();
    res.json({ message: "You are Sucessfully Logged Out" });
  } catch (error) {
    res.json({ message: "Error while Logging out ", error });
  }
});

userRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error while deleting the user", error });
  }
});


module.exports = userRouter;
