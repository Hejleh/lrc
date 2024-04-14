import { Request, Response } from "express";
import { ILike, Repository } from "typeorm";
import { validationResult } from "express-validator";
import AppDataSource from "../DB/database";
import { CourseEntity } from "../Entity/courses";

const GetAllCourses = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const perPage = parseInt(req.query.perPage) || 10; // Default to 10 items per page if not provided
    const name = req.query.name || null;
    const level = req.query.level || null;
    const type = req.query.type || null;

    // Access the repository associated with your entity
    const courseRepository = AppDataSource.getRepository(CourseEntity);

    // Calculate the offset based on the current page and items per page
    const offset = (page - 1) * perPage;

    // Fetch paginated courses from the database
    const courses = await courseRepository.find({
      skip: offset,
      take: perPage,
      where: {
        course_name: name ? ILike(`%${name}%`) : undefined,
        course_level: level ? level : undefined,
        course_type: type ? type : undefined,
      },
    });

    // Return the paginated courses in the response
    return res.status(200).json({
      page: page,
      perPage: perPage,
      total: courses.length, // This might not be the total count, it's the count of fetched records
      data: courses,
    });
  } catch (error) {
    // Handle database errors
    console.error("Error fetching courses:", error);
    return res.status(500).json({ error: "Failed to fetch courses" });
  }
};

const GetCourseById = async (req: any, res: any) => {
  try {
    const courseId = req.params.courseId;

    // Access the repository associated with your entity
    const courseRepository = AppDataSource.getRepository(CourseEntity);

    // Fetch the course by its ID from the database
    const course = await courseRepository.findOne({
      where: { course_id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    return res.status(500).json({ error: "Failed to fetch course" });
  }
};

const AddCourse = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { courseName, courseLevel, courseType, recommendedBy, courseLink } =
    req.body;
  try {
    const courseRepository = AppDataSource.getRepository(CourseEntity);

    // Create a new course entity instance
    const newCourse = courseRepository.create({
      course_name: courseName,
      course_level: courseLevel,
      course_type: courseType,
      recommended_by: recommendedBy,
      course_link: courseLink,
    });

    // Save the new course to the database
    const savedCourse = await courseRepository.save(newCourse);

    // Return the created course in the response
    return res.status(201).json(savedCourse);
  } catch (error: any) {
    // Check if the error is a database constraint violation error
    if (error.name === "QueryFailedError") {
      return res.status(400).json({
        error: "Database constraint violation",
        constraint: error.constraint,
      });
    } else {
      // Handle other errors
      console.error("Error creating course:", error);
      return res.status(500).json({ error: "Failed to create course" });
    }
  }
};

const UpdateCourse = async (req: any, res: any) => {
  try {
    const courseId = req.params.courseId;

    // Access the repository associated with your entity
    const courseRepository = AppDataSource.getRepository(CourseEntity);

    // Fetch the course by its ID from the database
    let course = await courseRepository.findOne({
      where: { course_id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Update the course entity with the data from the request body
    course = Object.assign(course, req.body);

    if (course) {
      // Save the updated course entity to the database
      await courseRepository.save(course);
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ error: "Failed to update course" });
  }
};

const DeleteCourse = async (req: any, res: any) => {
  try {
    const courseId = req.params.courseId;

    // Access the repository associated with your entity
    const courseRepository = AppDataSource.getRepository(CourseEntity);

    // Delete the course from the database based on course_id
    const deleteResult = await courseRepository.delete({ course_id: courseId });

    // Check if the delete operation was successful
    if (deleteResult.affected === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res
      .status(200)
      .json({ status: "Course has been deleted successfully" }); // No content returned
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ error: "Failed to delete course" });
  }
};

export default {
  GetAllCourses,
  GetCourseById,
  AddCourse,
  UpdateCourse,
  DeleteCourse,
};
