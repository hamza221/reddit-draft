require("dotenv").config();
const path = require('path');
const express = require("express");
const session = require('./middleware/session');
const cors = require('./middleware/cors');
const mainRoutes = require("./routes/main");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");
const { connectDB } = require("./config/db");

/**
 * Db Connection
 */
 connectDB();

//app instance
const app = express();
/**
 * Config Middlewares
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

/**
 * Cors and Session Middlewares
 */
app.use(cors);
app.use(session);

//creating local response variable so we can access it from views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
})

/**
 * App Routes
 */
app.use('/auth', authRoutes);
app.use('/', mainRoutes);

/**
 * Error Handler
 */

app.use(errorHandler);


const server = app.listen(3000, ()=> {
  console.log("listening on port 3000");
});

/**
 * App Errors
 */
process.on("unhandledRejection", (err, _promise) => {
  console.error(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
process.on("uncaughtException", (err) => {
  console.error(err);
  server.close(() => process.exit(1));
});

process.on('SIGINT', () => {
  console.log('Received SIGINT.');
  process.exit(1)
});
process.on( 'exit', function() {
    process.kill( process.pid, 'SIGTERM' );
});

