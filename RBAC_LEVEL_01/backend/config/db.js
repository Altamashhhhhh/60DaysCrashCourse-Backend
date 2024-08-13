const mongoose = require("mongoose");

const connection = mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("database is connected"))
  .catch((error) =>
    console.log(`error while connecting to database Error : ${error}`)
  );



module.exports = connection ;