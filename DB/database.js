const { DataSource } = require("typeorm");
const CourseEntityModule = require("../Entity/courses.js");
const dotenv = require("dotenv");
dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entities: [CourseEntityModule],
  synchronize: false, // Be cautious with this in production
  logging: true,
});

console.log(CourseEntityModule);

module.exports = AppDataSource;