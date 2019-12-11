const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();
//GET /feed/posts
router.get('/posts', feedController.getPosts);

router.get('/posts/:tag', feedController.getbyTag);

//POST /feed/post
router.post(
	'/post',
	isAuth,
	[
		body('title')
			.trim()
			.isLength({ min: 5 }),
		body('content')
			.trim()
			.isLength({ min: 5 })
	],
	feedController.createPost
);

router.get('/post/:postId', feedController.getPost);

router.put(
	'/post/:postId',
	isAuth,
	[
		body('title')
			.trim()
			.isLength({ min: 5 }),
		body('content')
			.trim()
			.isLength({ min: 5 })
	],
	feedController.updatePost
);

router.delete('/post/:postId', isAuth, feedController.deletePost);

router.delete(
	'/post/deletecomment/:commentId',
	isAuth,
	feedController.deleteComment
);

router.post(
	'/post/comment/:postId',
	isAuth,
	[
		body('reaction')
			.trim()
			.isLength({ min: 1 })
	],
	feedController.makeComment
);

router.post('/post/like/:postId', isAuth, feedController.likeHandler);
router.post('/post/dislike/:postId', isAuth, feedController.dislikeHandler);

router.get('/postss/grammarcheck', feedController.supplyPosts);

router.post('/correctPosts', feedController.correctPosts);
router.get('/user_posts/:id', feedController.getbyUser);

module.exports = router;
