// Imports
require("dotenv").config();
const express = require("express");
const path = require("node:path");
const router = require("./router/router");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");
const { passport } = require("./passport");

// Create Express App
const app = express();

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to specify "public" folder
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// middleware to parse form data into req.body
app.use(express.urlencoded({ extended: true }));

//set up session and passport session
app.use(
  session({
    store: new pgSession({
      pool: pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());

// Make views have access to req.user
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Router
app.use("/", router);

// Handle 404
app.use((req, res) => res.status(404).render("404"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw error;
  }

  console.log(`Listening on port ${process.env.PORT}!`);
});
