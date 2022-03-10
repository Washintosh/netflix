const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    img: {
      type: String,
    },
    titleImg: {
      type: String,
    },
    thumbImg: {
      type: String,
    },
    trailer: {
      type: String,
    },
    video: {
      type: String,
    },
    year: {
      type: String,
    },
    limit: {
      type: Number,
    },
    genre: {
      type: String,
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
