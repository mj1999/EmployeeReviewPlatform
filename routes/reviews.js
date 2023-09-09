const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");
const passport = require("passport");

router.get("/view-all", passport.checkAuth, reviewController.view);
router.get("/view-allotted", passport.checkAuth, reviewController.viewAllotted);
router.post("/update", passport.checkAuth, reviewController.update);
router.post("/create", passport.checkAuth, reviewController.create);

module.exports = router;
