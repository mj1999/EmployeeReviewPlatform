const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const passport = require("passport");

router.post("/create", userController.createUser);
router.get("/view", userController.employeeView);
router.post("/toggle-status", userController.toggleStatus);
router.post("/remove", userController.remove);

module.exports = router;
