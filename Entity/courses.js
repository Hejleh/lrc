const { EntitySchema } = require("typeorm");

const CourseEntity = new EntitySchema({
  name: "Courses",
  tableName: "courses",
  columns: {
    course_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    course_name: {
      type: "varchar",
    },
    course_level: {
      type: "varchar",
    },
    course_type: {
      type: "varchar",
    },
    recommended_by: {
      type: "varchar",
    },
    course_link: {
      type: "varchar",
      unique: true,
    },
  },
});

module.exports = CourseEntity;