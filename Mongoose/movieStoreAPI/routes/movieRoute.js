const express = require("express");
const mongoose = require("mongoose");
const movieModel = require("../models/movie");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { q, rating, sortBy, page = 1, limit = 10 } = req.query;
    const query = {};

    if (q) query.title = new RegExp(q, "i");
    if (rating) query.rating = rating;

    const movies =await  movieModel
      .find(query)
      .sort(sortBy ? { [sortBy]: 1 } : {})
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.status(200).send(movies);
  } catch (err) {
    res.status(500).send(`Error While Fetching and Sorting Movie Data ${err}`);
  }
});

router.get("/get-movie", async (req, res) => {
  try {
    let movieData = await movieModel.find();
    res.status(201).send(movieData);
  } catch (err) {
    res.status(404).send(`Error While Getting Movie Data ${err}`);
  }
});

router.post("/add-movie", async (req, res) => {
  try {
    let { title, rating, description, cast } = req.body;

    await movieModel.create({
      title,
      rating,
      description,
      cast,
    });
    res.status(201).send(`Movie Data is Successfully Added `);
  } catch (err) {
    res.status(404).send(`Error While Adding The Movie Data ${err}`);
  }
});

router.patch("/update-movie/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let movieInput = req.body;
    await movieModel.findByIdAndUpdate(id, movieInput);
    res.status(201).send("Data is Successfully Updated");
  } catch (err) {
    res.status(404).send(`Error While Updating The Data ${err}`);
  }
});
router.delete("/delete-movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await movieModel.findByIdAndDelete(id);
    res.status(201).send(`Data Successfully Has Been Deleted`);
  } catch (err) {
    res.status(404).send(`Error While Deleting Movie Data ${err}`);
  }
});

module.exports = router;
