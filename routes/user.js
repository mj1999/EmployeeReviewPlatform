const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const passport = require("passport");

router.post("/create", passport.checkAuth, userController.createUser);
router.get("/view", passport.checkAuth, userController.employeeView);
router.post("/toggle-status", passport.checkAuth, userController.toggleStatus);
router.post("/remove", passport.checkAuth, userController.remove);

module.exports = router;
