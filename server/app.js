const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const noteRoutes = require("./routes/note");
const dotenv = require("dotenv").config();

app.use(bodyParser.json());

app.use(cors());

app.use(noteRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then((_) => {
    app.listen(process.env.PORT);
    console.log("Connected to database && running on port 8000");
  })
  .catch((err) => {
    console.log("Error Connection " + err);
  });
