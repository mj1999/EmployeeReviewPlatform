const Reviews = require("../model/reviews");
const Users = require("../model/users.js");

module.exports.view = async function (req, res) {
  let reviews = await Reviews.find({}).populate(["reviewee", "reviewer"]);
  let employees = await Users.find({});
  res.render("performanceReviews", { reviews, employees });
};

module.exports.viewAllotted = async function (req, res) {
  let allottedReviews = await Reviews.find({ reviewer: req.user.id }).populate([
    "reviewee",
    "reviewer",
  ]);
  res.render("allottedReviews", { reviews: allottedReviews });
};

module.exports.create = async function (req, res) {
  let existingReview = await Reviews.findOne({
    reviewer: req.body.reviewer,
    reviewee: req.body.reviewee,
  });

  if (!existingReview) {
    if (req.body.reviewee != req.body.reviewer) {
      let newReview = await Reviews.create(req.body);
      let user = await Users.findById(req.body.reviewer);
      newReview = await newReview.populate(["reviewee", "reviewer"]);
      user.reviews.push(newReview);
      user.save();
      res.status(200).json({
        data: { newReview },
        message: "Review created successfully",
      });
    } else {
      res.status(409).json({
        message: "Reviewer cant be same as reviewee",
      });
    }
  } else {
    res.status(406).json({
      message: "Review already exists for the provided reviewer and reviewee",
    });
  }
};

module.exports.update = async function (req, res) {
  let review = await Reviews.findById(req.body.id);
  review.rating = req.body.rating;
  review.comment = req.body.comment;
  review.completed = true;
  review.save();
  res.redirect("back");
};
