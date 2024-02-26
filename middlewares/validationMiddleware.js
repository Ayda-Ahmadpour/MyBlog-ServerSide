import { body, validationResult } from "express-validator";

export const validateAuth = (type) => {
  let validations = [];
  if (type === "signup") {
    validations = [
      body("username").notEmpty().withMessage("Username cannot be empty"),
      body("email").isEmail().withMessage("Invalid email format"),
      body("password").notEmpty().withMessage("Password cannot be empty"),
    ];
  } else if (type === "signin") {
    validations = [
      body("email").isEmail().withMessage("Invalid email format"),
      body("password").notEmpty().withMessage("Password cannot be empty"),
    ];
  }

  return [
    ...validations,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};
