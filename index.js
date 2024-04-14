const express = require("express");
const app = express();
const courseRouter = require("./routes/courses");
const notFound = require("./routes/notFound");
const AppDataSource = require("./DB/database");
const baseRouter = "/api/";
const cors = require("cors");
const dotenv = require("dotenv");

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
