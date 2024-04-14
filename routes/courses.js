const express = require("express");
const router = express.Router();

const coursesController = require("../Controllers/coursesController");
const courseValidation = require("../Middleware/validation");

router
  .route("/")
  .get(coursesController.GetAllCourses)
  .post(courseValidation(), coursesController.AddCourse);

router
  .route("/:courseId")
  .get(coursesController.GetCourseById)
  .patch(coursesController.UpdateCourse)
  .delete(coursesController.DeleteCourse);

module.exports = router;
