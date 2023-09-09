const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");

router.get("/view-all", reviewController.view);
router.get("/view-allotted", reviewController.viewAllotted);
router.post("/update", reviewController.update);
router.post("/create", reviewController.create);

module.exports = router;
