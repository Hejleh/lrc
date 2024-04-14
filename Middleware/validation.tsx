const { body } = require("express-validator");

const courseValidation = () => {
  return [
    body("courseName")
      .notEmpty()
      .withMessage("courseName is required")
      .isLength({ min: 3 })
      .withMessage("Name should be atleast 3 characters long"),
    body("courseLevel")
      .notEmpty()
      .withMessage("courseLevel is required")
      .isLength({ min: 3 })
      .withMessage("Name should be atleast 3 characters long"),
    body("courseType")
      .notEmpty()
      .withMessage("courseType is required")
      .isLength({ min: 3 })
      .withMessage("Name should be atleast 3 characters long"),
    body("recommendedBy")
      .notEmpty()
      .withMessage("recommendedBy is required")
      .isLength({ min: 3 })
      .withMessage("Name should be atleast 3 characters long"),
    body("courseLink")
      .notEmpty()
      .withMessage("courseLink is required")
      .isLength({ min: 3 })
      .withMessage("Name should be atleast 3 characters long"),
  ];
};

export default courseValidation;
