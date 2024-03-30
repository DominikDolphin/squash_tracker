const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const apiRoutes = require("./Routes/index");

app.use(
  cors({
    origin: `http://localhost:8080`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/api", apiRoutes);

module.exports = app;