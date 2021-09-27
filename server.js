require("dotenv").config();
const path = require('path');
const express = require("express");
const mainRoutes = require("./routes/mainRoutes");
const errorHandler = require("./middleware/errorHandler");
const { connectDB } = require("./config/db");

connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
//var router = express.Router();

app.set("view engine", "ejs");
app.use(mainRoutes);

app.use(errorHandler);

const server = app.listen(3000, function () {
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
