const { DataSource } = require("typeorm");
const dotenv = require("dotenv");
const CourseEntity = require("../Entity/courses");
dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entities: [CourseEntity],
  synchronize: true, // Be cautious with this in production
  logging: false,
});

module.exports = AppDataSource;