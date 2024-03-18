require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const v1Routes = require("./api/v1/routes");
// Connect to MongoDB database if the envrionment variable is set. Else, connect to local MongoDB database.
mongoose.connect(
  process.env.MONGODB_CONNECTION_URL ||
    "mongodb://localhost:27017/SquashTracker"
);

mongoose.connection.on("connected", function () {
  console.log("MongoDB has connected successfully");
});

mongoose.connection.on("error", function (err) {
  console.error("MongoDB connection error: " + err);
});

// Middleware for parsing JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

app.use("/api/v1", v1Routes);

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to our simple API!" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
