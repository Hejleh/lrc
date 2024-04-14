import express, { Application } from "express";
import courseRouter from "../routes/courses";
import notFound from "../routes/notFound";
import AppDataSource from "../DB/database";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const baseRouter: string = "/api/";


const port = process.env.PORT;
console.log(port);
app.use(cors());
app.use(express.json());
app.use(baseRouter + "courses", courseRouter);
app.use("*", notFound);
dotenv.config();

const ConnectMySql = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => console.log(error));
};

app.listen(port, () => {
  console.log("listening to port: " + port);
  ConnectMySql();
});
