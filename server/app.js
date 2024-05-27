const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();

const noteRoutes = require("./routes/note");
const authRoutes = require("./routes/auth");

const dotenv = require("dotenv").config();
const multer = require("multer");

const storageConfigure = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "-" + file.originalname);
  },
});
const filterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.json());
app.use(
  multer({ storage: storageConfigure, fileFilter: filterConfigure }).single(
    "cover_image"
  )
);

app.use(cors());

app.use(noteRoutes);
app.use(authRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then((_) => {
    app.listen(process.env.PORT);
    console.log("Connected to database && running on port 8000");
  })
  .catch((err) => {
    console.log("Error Connection ");
    console.log(err);
  });
