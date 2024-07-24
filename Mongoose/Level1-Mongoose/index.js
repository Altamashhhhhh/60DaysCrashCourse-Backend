const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/masai")
  .then(() => console.log("Mongoose is connected to the server"))
  .catch((error) => console.log(`ERROR ERROR ERROR: ${error}`));

app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(3001, () => {
  console.log("Server 3001 is running in the background");
});
