const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/auth");

// POST /register
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter an valid email!")
      .normalizeEmail(),
    body("username")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Username is too Short!"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  authController.register
);

module.exports = router;
