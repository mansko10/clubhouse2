const { Router } = require("express");
const controller = require("../controller/controller");
const validators = require("../validators");
const { passport } = require("../passport");

const router = Router();

router.get("/", controller.getIndex);
router.get("/sign-up", controller.signUpGet);
router.post("/sign-up", validators.validateSignUp, controller.signUpPost);
router.get("/log-in", controller.loginGet);
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
);
router.get("/logout", controller.logOutGet);

module.exports = router;
