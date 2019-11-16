const User = require("../models/user");
// const path = require("path");

exports.publicProfile = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .populate({ path: "followers", select: "name" })
    .populate({ path: "followings", select: "name" })
    .then(user => {
      const name = user.name;
      const followers = user.followers;
      const followings = user.followings;
      const data = {
        name: name,
        followers: followers,
        followings: followings
      };
      console.log(data);
      res.status(200).json({
        message: "Got User",
        user: data
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProfile = (req, res, next) => {
  User.findById(req.userId)
    .populate({ path: "followers", select: "name" })
    .populate({ path: "following", select: "name" })
    .then(user => {
      console.log(user);
      res.status(200).json({
        message: "Got Profile",
        user: user
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const findArray = (list, userId) => {
  for (var id of list.values()) {
    if (id == userId) {
      return true;
    }
  }
  return false;
};

exports.follow = (req, res, next) => {
  const userId = req.params.userId;
  let flag;
  let currenUser;
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 400;
        throw error;
      }
    })
    .then(result => {
      return User.findById(userId); //returns user to followed/unfollowed
    })
    .then(user => {
      currenUser = user;
      const followed = findArray(user.followers, req.userId);
      if (!followed) {
        user.followers.push(req.userId);
        flag = true;
      } else {
        user.followers.pull(req.userId);
        flag = false;
      }
      return user.save();
    })
    .then(result => {
      return User.findById(req.userId); //returns user who is following/unfollowing
    })
    .then(user => {
      if (flag) {
        user.followings.push(currenUser);
      } else {
        user.followings.pull(currenUser);
      }
      user.save();
    })
    .then(result => {
      res.status(201).json({
        message: "Followers updated"
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        console.log("Error 500");
        err.statusCode = 500;
      }
      next(err);
    });
};
