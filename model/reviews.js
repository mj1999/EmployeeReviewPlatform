const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  comment: {
    type: String,
    default: "",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Reviews = mongoose.model("Reviews", reviewSchema);
module.exports = Reviews;
