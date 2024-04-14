import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { CourseEntity } from "../Entity/courses";
dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entities: [CourseEntity],
  synchronize: false, // Be cautious with this in production
  logging: true,
});

console.log(CourseEntity);

export default AppDataSource;
