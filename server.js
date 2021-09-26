require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars"); // "express-handlebars"
const mainRoutes = require("./routes/mainRoutes");
const errorHandler = require("./middleware/errorHandler");
const { connectDB } = require("./config/db");

connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//var router = express.Router();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(mainRoutes);

app.use(errorHandler);

const server = app.listen(4000, function () {
  console.log("express-handlebars example server listening on: 3000");
});

process.on("unhandledRejection", (err, promise) => {
  console.error(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error(err);
  server.close(() => process.exit(1));
});
