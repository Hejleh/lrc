import express from "express";
import { Router } from "express";
import coursesController from "../Controllers/coursesController";
import courseValidation from "../Middleware/validation";

const router: Router = express.Router();

router
  .route("/")
  .get(coursesController.GetAllCourses)
  .post(courseValidation(), coursesController.AddCourse);

router
  .route("/:courseId")
  .get(coursesController.GetCourseById)
  .patch(coursesController.UpdateCourse)
  .delete(coursesController.DeleteCourse);

export default router;
