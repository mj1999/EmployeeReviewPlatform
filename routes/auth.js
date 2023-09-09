const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const passport = require("passport");

router.get("/login", authController.login);
router.get("/register", authController.register);
router.get("/logout", authController.destroySession);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/auth/login" }),
  authController.createSession
);

module.exports = router;
