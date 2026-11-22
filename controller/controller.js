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

  console.log(req.body);
  const hasedPassword = await bcrypt.hash(req.body.password, 10);

  await db.createUser(
    req.body.first_name,
    req.body.last_name,
    req.body.username,
    hasedPassword,
  );

  return res.redirect("/");
}

module.exports = { getIndex, signUpGet, signUpPost };
