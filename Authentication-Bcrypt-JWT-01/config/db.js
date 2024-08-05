const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const database = process.env.DATABASE;
const connection = mongoose
  .connect(database)
  .then("Database is connected to the server")
  .catch((err) => console.log(`Error while connecting Database ${err}`));



module.exports = connection