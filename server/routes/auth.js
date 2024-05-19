const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/auth");

const User = require("../models/user");

// POST /register
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter an valid email!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email is already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("username")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Username is too Short!")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Username is already exists!");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  authController.register
);

// Login
router.post(
  "/login",
  [body("email").isEmail().withMessage("Please enter an valid email!")],
  authController.login
);

module.exports = router;
