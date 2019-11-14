const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    reaction: {
      type: String,
      required: true
    },
    reactor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", postSchema);
