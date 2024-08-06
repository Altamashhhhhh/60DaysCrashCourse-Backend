const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const database = process.env.DATABASE;

const connection = mongoose
  .connect(database)
  .then(() => {
    console.log("DATABASE is successfully connected");
  })
  .catch((error) =>
    console.log(`Error while connecting the database ${error}`)
  );

module.exports = connection;
