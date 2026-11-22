const { body } = require("express-validator");

const validateSignUp = [
  body("first_name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("First name length must be between 1 and 50 characters"),
  body("last_name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name length must be between 1 and 50 characters"),
  body("username")
    .trim()
    .isLength({ mix: 1, max: 50 })
    .withMessage("Username length must be between 1 and 50 characters"),
  body("password")
    .trim()
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.",
    ),
  body("confirm_password").custom((value, { req }) => {
    if (req.body.password !== value) {
      throw new Error("Passwords do not match.");
    }

    return true;
  }),
];

module.exports = { validateSignUp };
