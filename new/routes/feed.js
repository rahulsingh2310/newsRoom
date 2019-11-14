const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

const router = express.Router();
//GET /feed/posts
router.get("/posts", isAuth, feedController.getPosts);

//POST /feed/post
router.post(
  "/post",
  isAuth,
  [
    body("title")
      .trim()
      .isLength({ min: 5 }),
    body("content")
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.createPost
);

router.get("/post/:postId", isAuth, feedController.getPost);

router.put(
  "/post/:postId",
  isAuth,
  [
    body("title")
      .trim()
      .isLength({ min: 5 }),
    body("content")
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.updatePost
);

router.delete("/post/:postId", isAuth, feedController.deletePost);

router.post(
  "/post/comment/:postId",
  isAuth,
  [
    body("reaction")
      .trim()
      .isLength({ min: 1 })
  ],
  feedController.makeComment
);

router.post("/post/like/:postId", isAuth, feedController.likeHandler);
router.post("/post/dislike/:postId", isAuth, feedController.dislikeHandler);

module.exports = router;