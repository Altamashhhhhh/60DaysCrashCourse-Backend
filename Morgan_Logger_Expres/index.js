const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const port = 3001;

const app = express();
app.use(express.json());

const logger = fs.createWriteStream(path.join(__dirname, "src/access.txt"));

app.use(morgan(`:method :status :res[content-length] -  :response-time ms :date[clf] HTTP/:http-version :url`, { stream: logger }));


app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

app.get('/get-users', (req, res) => {
  res.status(200).send('User list');
});

app.post('/add-user', (req, res) => {
  res.status(201).send('User added successfully');
});

app.put('/user/:id', (req, res) => {
  res.status(201).send(`User with ID ${req.params.id} updated successfully`);
});

app.delete('/user/:id', (req, res) => {
  res.send(`User with ID ${req.params.id} deleted successfully`);
});


app.listen(port, () => {
  console.log(`${port} is running in the background`);
});
