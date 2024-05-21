const express = require("express");
const noteController = require("../controllers/note");
const router = express.Router();

const { body } = require("express-validator");

const authMiddleware = require("../middlewares/is-auth");

// Get /notes
router.get("/notes", noteController.getNotes);

// Get /notes/:id
router.get("/notes/:id", noteController.getNote);

// Post /create
router.post(
  "/create",
  authMiddleware,
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

// Delete /delete/:id
router.delete("/delete/:id", authMiddleware, noteController.deleteNote);

// GET /edit/:id
router.get("/edit/:id", authMiddleware, noteController.getOldNote);

// post /edit
router.post("/edit", authMiddleware, noteController.updateNote);

module.exports = router;
