const { validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function getIndex(req, res) {
  return res.render("index");
}

async function signUpGet(req, res) {
  return res.render("sign-up");
}

async function signUpPost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up", {
      errors: errors.array(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  await db.createUser(
    req.body.first_name,
    req.body.last_name,
    req.body.username,
    hashedPassword,
  );

  return res.redirect("/");
}

async function loginGet(req, res) {
  const errors = req.session.messages;

  // Make login error messages NOT persist upon reload
  req.session.messages = [];

  return res.render("login", { errors });
}

async function loginPost(req, res) {
  return res.redirect("/");
}

async function logOutGet(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

async function createNewMessageGet(req, res) {
  res.render("createNewMessage");
}

module.exports = {
  getIndex,
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
  logOutGet,
  createNewMessageGet,
};
