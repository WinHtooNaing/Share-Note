const { validationResult } = require("express-validator");

exports.register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Failed",
      errorMessages: errors.array(),
    });
  }
  const { username, email, password } = req.body;
  console.log(username, email, password);
};
