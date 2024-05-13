const { validationResult } = require("express-validator");

// models
const Note = require("../models/note");

exports.getNotes = (req, res, next) => {
  Note.find()
    .sort({ createdAt: -1 })
    .then((notes) => {
      return res.status(200).json(notes);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong!",
      });
    });
};
exports.getNote = (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      return res.status(200).json(note);
    })
    .catch((err) => {
      res.status(404).json({
        message: "Something went wrong!",
      });
    });
};

exports.createNote = (req, res, next) => {
  const { title, content } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Failed",
      errorMessages: errors.array(),
    });
  }
  Note.create({
    title,
    content,
  })
    .then((_) => {
      return res.status(201).json({
        message: "Note created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong!",
      });
    });
};
