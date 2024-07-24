const express = require("express");
const movieRoute = require("./routes/movieRoute");
const mongoose = require("mongoose")

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/moviestore")
  .then(() => {
    console.log("movieStore API is connect to the server");
  })
  .catch((err) => {
    console.log(`Error While Connecting to the server ${err}`);
  });

app.use("/movies", movieRoute);

app.listen(3001, () => {
  console.log("MOVIE SERVER 3001 IS RUNNING IN BACKGROUND");
});
