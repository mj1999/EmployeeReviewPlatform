const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/", homeController.home);

router.use("/review", require("./reviews"));
router.use("/auth", require("./auth"));
router.use("/user", require("./user"));

module.exports = router;
