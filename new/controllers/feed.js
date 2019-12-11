const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

exports.getbyUser = (req, res, next) => {
	const user = req.params.id;
	User.findById(user)
		.then(user => {
			if (!user) {
				const error = new Error('User not Found!');
				error.statusCode = 401;
				throw error;
			} else {
				Post.find({ creator: user })
					.populate({ path: 'likes', select: 'name' })
					.populate({ path: 'dislikes', select: 'name' })
					.then(posts => {
						res.status(200).json({
							message: 'Fetched posts successfully',
							posts: posts
						});
					});
			}
		})

		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};
exports.getPosts = (req, res, next) => {
	Post.find()
		// .populate("creator")
		.populate({ path: 'likes', select: 'name' })
		.populate({ path: 'dislikes', select: 'name' })
		.then(posts => {
			console.log(posts);
			res.status(200).json({
				message: 'Fetched posts successfully',
				posts: posts
			});
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.getbyTag = (req, res, next) => {
	const tag = req.params.tag;
	Post.find({ tag: tag })
		// .populate("creator")
		.populate({ path: 'likes', select: 'name' })
		.populate({ path: 'dislikes', select: 'name' })
		.then(posts => {
			console.log(posts);
			res.status(200).json({
				message: 'Fetched posts successfully',
				posts: posts
			});
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.createPost = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect.');
		error.statusCode = 422;
		throw error;
	}

	if (!req.file) {
		const error = new Error('No image provided.');
		error.statusCode = 422;
		throw error;
	}
	// const imageUrl1 = req.file.path; // use this in LINUX or MAC
	const imagename = req.file.filename;
	const imageUrl2 = 'images/' + imagename;
	const title = req.body.title;
	const content = req.body.content;
	let total_post;
	var T_new;
	let creator;

	const post = new Post({
		title: title,
		content: content,
		imageUrl: imageUrl2, //change it to imageUrl1 for LINUX or MAC
		creator: req.userId,
		tag: req.body.tags
	});
	post
		.save()
		.then(result => {
			return User.findById(req.userId);
		})
		.then(user => {
			total_post = user.posts;
			total_post = countArray(total_post);
			const T_old = Number(user.trustfactor);
			let T_new;
			T_new = T_old * (total_post - 1) + 0.05;
			T_new = T_new / total_post;
			creator = user;
			user.posts.push(post);
			user.trustfactor = T_new;
			return user.save();
		})
		.then(result => {
			res.status(201).json({
				message: 'Post created successfully',
				post: post,
				creator: { _id: creator._id, name: creator.name }
			});
		})
		.catch(err => {
			if (!err.statusCode) {
				console.log('Error 500');
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.getPost = (req, res, next) => {
	const postId = req.params.postId;
	Post.findById(postId)
		.then(post => {
			if (!post) {
				const error = new Error('Could not find post.');
				error.statusCode = 404;
				throw error;
			}
			res.status(200).json({ message: 'post fetched', post: post });
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.updatePost = (req, res, next) => {
	const postId = req.params.postId;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect.');
		error.statusCode = 422;
		throw error;
	}
	const title = req.body.title;
	const content = req.body.content;
	let imageUrl = req.body.image;
	if (req.file) {
		// imageUrl = req.file.path;
		imageUrl = 'images/' + req.file.filename;
	}
	if (!imageUrl) {
		const error = new Error('No file picked');
		error.statusCode = 422;
		throw error;
	}
	Post.findById(postId)
		.then(post => {
			if (!post) {
				const error = new Error('Could not find post.');
				error.statusCode = 404;
				throw error;
			}
			if (post.creator.toString() !== req.userId) {
				const error = new Error('Not Authorized');
				error.statusCode = 403;
				throw error;
			}
			if (imageUrl !== post.imageUrl) {
				// console.log(imageUrl);
				// console.log(post.imageUrl);
				clearImage(post.imageUrl);
			}
			post.title = title;
			post.imageUrl = imageUrl;
			post.content = content;
			return post.save();
		})
		.then(result => {
			res.status(200).json({ message: 'Post Updated!', post: result });
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.deletePost = (req, res, next) => {
	const postId = req.params.postId;
	Post.findById(postId)
		.then(post => {
			if (!post) {
				const error = new Error('Could not find post.');
				error.statusCode = 404;
				throw error;
			}
			if (post.creator.toString() !== req.userId) {
				const error = new Error('Not Authorized');
				error.statusCode = 403;
				throw error;
			}
			//Checked logged in user
			clearImage(post.imageUrl);
			return Post.findByIdAndRemove(postId);
		})
		.then(result => {
			return User.findById(req.userId);
		})
		.then(user => {
			user.posts.pull(postId);
			return user.save();
		})
		.then(result => {
			res.status(200).json({ message: 'Deleted post' });
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

const clearImage = filePath => {
	filePath = path.join(__dirname, '..', filePath);
	fs.unlink(filePath, err => console.log(err));
};

const findArray = (list, userId) => {
	for (var id of list.values()) {
		if (id == userId) {
			return true;
		}
	}
	return false;
};

exports.likeHandler = (req, res, next) => {
	const postId = req.params.postId;
	let flag;
	let currentPost;
	let disliked;
	Post.findById(postId)
		.then(post => {
			if (!post) {
				const error = new Error('Could not find post');
				error.statusCode = 400;
				throw error;
			}
		})
		.then(result => {
			return Post.findById(postId);
		})
		.then(post => {
			currentPost = post;
			const liked = findArray(post.likes, req.userId);
			const disliked = findArray(post.dislikes, req.userId);
			if (!liked) {
				post.likes.push(req.userId);
				if (disliked) {
					post.dislikes.pull(req.userId);
				}
				flag = true;
			} else {
				post.likes.pull(req.userId);
				flag = false;
			}
			return post.save();
		})
		.then(result => {
			return User.findById(req.userId);
		})
		.then(user => {
			if (flag) {
				user.likedposts.push(currentPost);
				if (disliked) {
					user.dislikedposts.pull(currentPost);
				}
			} else {
				user.likedposts.pull(currentPost);
			}
			user.save();
		})
		.then(result => {
			res.status(201).json({
				message: 'Reacted Successfully(Liked/Unliked)'
			});
		})
		.catch(err => {
			if (!err.statusCode) {
				console.log('Error 500');
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.dislikeHandler = (req, res, next) => {
	const postId = req.params.postId;
	let flag;
	let currentPost;
	let liked;
	Post.findById(postId)
		.then(post => {
			if (!post) {
				const error = new Error('Could not find post');
				error.statusCode = 400;
				throw error;
			}
		})
		.then(result => {
			return Post.findById(postId);
		})
		.then(post => {
			currentPost = post;
			const liked = findArray(post.likes, req.userId);
			const disliked = findArray(post.dislikes, req.userId);
			if (!disliked) {
				post.dislikes.push(req.userId);
				if (liked) {
					post.likes.pull(req.userId);
				}
				flag = true;
			} else {
				post.dislikes.pull(req.userId);
				flag = false;
			}
			return post.save();
		})
		.then(result => {
			return User.findById(req.userId);
		})
		.then(user => {
			if (flag) {
				user.dislikedposts.push(currentPost);
				if (liked) {
					user.likedposts.pull(currentPost);
				}
			} else {
				user.dislikedposts.pull(currentPost);
			}
			user.save();
		})
		.then(result => {
			res.status(201).json({
				message: 'Reacted Successfully(DisLiked/Undisliked)'
			});
		})
		.catch(err => {
			if (!err.statusCode) {
				console.log('Error 500');
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.makeComment = (req, res, next) => {
	const postId = req.params.postId;
	Post.findById(postId).then(post => {
		if (!post) {
			const error = new Error('Could not find post.');
			error.statusCode = 404;
			throw error;
		}
	});
	const reaction = req.body.reaction;
	const reactor = req.userId;
	let currentPost;
	// console.log("HHHH");
	const comment = new Comment({
		reaction: reaction,
		reactor: reactor,
		post: postId
	});
	comment
		.save()
		.then(result => {
			// console.log("postId");
			return Post.findById(req.params.postId);
		})
		.then(post => {
			// console.log(post);
			currentPost = post;
			post.comments.push(comment);
			return post.save();
		})
		.then(result => {
			return User.findById(req.userId);
		})
		.then(user => {
			user.commentedposts.push(currentPost);
			return user.save();
		})
		.then(result => {
			res.status(201).json({
				message: 'Commented succesfully'
			});
		})
		.catch(err => {
			if (!err.statusCode) {
				console.log('Error 500');
				err.statusCode = 500;
			}
			next(err);
		});
};

// const findPost = (list,commentId)=>{
//   for (var id of list.valu)
// }

exports.deleteComment = (req, res, next) => {
	const commentId = req.params.commentId;
	let postOn;
	Comment.findById(commentId)
		.then(comment => {
			if (!comment) {
				const error = new Error('Could not find comment.');
				error.statusCode = 404;
				throw error;
			}
			if (comment.reactor.toString() !== req.userId) {
				const error = new Error('Not Authorized!');
				// console.log(comment.reactor.toString());
				// console.log(req.userId);
				error.statusCode = 403;
				throw error;
			}
			return Comment.findByIdAndRemove(commentId);
		})
		.then(result => {
			return Post.findOne({ comments: { $in: [commentId] } });
		})
		.then(post => {
			postOn = post;
			post.comments.pull(commentId);
			post.save();
		})
		.then(result => {
			return User.findById(req.userId);
		})
		.then(user => {
			user.commentedposts.pull(postOn);
			return user.save();
		})
		.then(result => {
			res.status(201).json({
				message: 'Comment Deleted!'
			});
		})
		.catch(err => {
			if (!err.statusCode) {
				console.log('Error 500');
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.supplyPosts = (req, res, next) => {
	let posts = [];
	User.find()
		.populate('posts')
		.where('subscriptions')
		.in(['Grammar-Check'])
		.then(async users => {
			console.log('USER');
			console.log(users);
			for (var user of users.values()) {
				var user_posts = user.posts;
				for (var user_post of user_posts.values()) {
					if (user_post.checkrequire) {
						user_post = await Post.findById(user_post._id).populate('creator');
						console.log(user_post);
						posts.push(user_post);
					}
				}
			}

			return posts;
		})
		.then(posts => {
			res.status(200).json({
				message: 'Check the posts',
				posts: posts
			});
		})
		.catch(error => {
			console.log(error);
			next(error);
		});
	// res.json({
	//   message: "Successfull!!"
	// });
};

exports.correctPosts = (req, res, next) => {
	const posts = req.body.posts;
	for (var post of posts) {
		console.log(post);
		Post.findById(post._id)
			.then(result => {
				// console.log(result);
				result.content = post.content;
				result.checkrequire = false;
				result.save();
				// console.log(result);
			})
			.catch(error => {
				console.log(error);
			});
	}
	// console.log(posts);
	res.json({
		message: 'Received and Updated Successfully!!'
	});
};

const countArray = list => {
	var c = 0;
	for (var i of list.values()) {
		c = c + 1;
	}
	return c;
};
