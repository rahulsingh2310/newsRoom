const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  mobile: {
    type: Number,
    default: 0
  },
  city: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    min: 100000,
    max: 999999,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "I am new!"
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  likedposts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: false
    }
  ],
  dislikedposts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: false
    }
  ],
  commentedposts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: false
    }
  ],
  confirmed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", userSchema);
