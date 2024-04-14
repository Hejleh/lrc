import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { courses } from "../Entity/courses.entity";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entities: [courses],
  synchronize: true, // Be cautious with this in production
  logging: true,
});

console.log(courses);

export default AppDataSource;