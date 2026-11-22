const { Router } = require("express");
const controller = require("../controller/controller");
const validators = require("../validators");

const router = Router();

router.get("/", controller.getIndex);
router.get("/sign-up", controller.signUpGet);
router.post("/sign-up", validators.validateSignUp, controller.signUpPost);

module.exports = router;
