const express = require("express");
const userModel = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("WELCOME TO THE USER MANAGEMENT DATABASE");
});

router.get("/get-user", async (req, res) => {
  let users = await userModel.find();
  res.send(users);
});

router.post("/add-user", async (req, res) => {
  try {
    let { firstName, lastName, age, number, email, gender } = req.body;
    await userModel.create({
      firstName,
      lastName,
      age,
      number,
      email,
      gender,
    });
    res.status(201).send("ADDED SUCCESSFULLY");
  } catch (err) {
    res.status(500).send(`Error Occured : ${err}`);
  }
});

router.patch("/update-user/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let updatedInput = req.body;
    await userModel.findByIdAndUpdate(id, updatedInput);
    res.status(201).send("Data Updated Successfully");
  } catch (err) {
    res.status(500).send(`Error While Updating User : ${err}`);
  }
});

router.delete("/delete-user/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).send("Successfully Deleted");
  } catch (err) {
    res.status(500).send(`Error While Deleting ; ${err}`);
  }
});


module.exports = router ; 