const express = require("express");
const noteController = require("../controllers/note");
const router = express.Router();

const { body } = require("express-validator");

// Get /notes
router.get("/notes", noteController.getNotes);

// Get /notes/:id
router.get("/notes/:id", noteController.getNote);

// Post /create
router.post(
  "/create",
  [
    body("title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Title is too short")
      .isLength({ max: 30 })
      .withMessage("Title is too long!"),
    body("content")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Content is too short"),
  ],
  noteController.createNote
);
module.exports = router;
