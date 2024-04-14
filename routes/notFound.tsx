const express = require("express");
const router = express.Router();

const notFoundController = require("../Controllers/notFound");

router
  .route("/")
  .get(notFoundController.notFound)
  .post(notFoundController.notFound);

export default router;
