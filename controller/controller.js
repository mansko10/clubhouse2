const { validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function getIndex(req, res) {
  const messages = await db.getAllMessages();
  return res.render("index", { messages });
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
    return res.redirect("/");
  });
}

async function createNewMessageGet(req, res) {
  return res.render("createNewMessage");
}

async function createNewMessagePost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("createNewMessage", {
      errors: errors.array(),
    });
  }

  await db.createMessage(
    req.user.id,
    req.body.message_title,
    req.body.message_text,
  );

  return res.redirect("/");
}

async function getBecomeMember(req, res) {
  return res.render("becomeMember");
}

async function postBecomeMember(req, res) {
  if (req.body.admin_code === process.env.MEMBER_SECRET_CODE) {
    await db.makeAdmin(req.user.id);
  } else {
    return res.render("becomeMember", {
      errorMessage: "Sorry. Code not correct.",
    });
  }
  return res.redirect("/");
}

module.exports = {
  getIndex,
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
  logOutGet,
  createNewMessageGet,
  createNewMessagePost,
  getBecomeMember,
  postBecomeMember,
};
