const { Router } = require("express");
const controller = require("../controller/controller");
const validators = require("../validators");
const { passport } = require("../passport");
const { isAuthenticated, isAdmin } = require("../miscellaneousMiddlewares");

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
router.get(
  "/create-new-message",
  isAuthenticated,
  controller.createNewMessageGet,
);
router.post(
  "/create-new-message",
  isAuthenticated,
  validators.validateMessage,
  controller.createNewMessagePost,
);
router.get("/become-member", isAuthenticated, controller.getBecomeMember);
router.post("/become-member", isAuthenticated, controller.postBecomeMember);
router.get("/become-admin", isAuthenticated, controller.getBecomeAdmin);
router.post("/become-admin", isAuthenticated, controller.postBecomeAdmin);
router.post("/:messageId/delete", isAdmin, controller.postMessageDelete);

module.exports = router;
