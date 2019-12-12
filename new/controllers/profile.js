const User = require('../models/user');
const Post = require('../models/post');
// const path = require("path");

exports.publicProfile = (req, res, next) => {
	const userId = req.params.userId;
	User.findById(userId)
		.populate({ path: 'followers', select: 'name' })
		.populate({ path: 'followings', select: 'name' })
		.then(user => {
			const name = user.name;
			const followers = user.followers;
			const followings = user.followings;
			const description = user.description;
			const trustfactor = user.trustfactor;
			const email = user.email;
			const data = {
				name: name,
				followers: followers,
				followings: followings,
				description: description,
				trustfactor: trustfactor,
				email: email
			};
			console.log(data);
			res.status(200).json({
				message: 'Got User',
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
		.populate({ path: 'followers', select: 'name' })
		.populate({ path: 'following', select: 'name' })
		.then(user => {
			console.log(user);
			res.status(200).json({
				message: 'Got Profile',
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

const countArray = list => {
	var c = 0;
	for (var i of list.values()) {
		c = c + 1;
	}
	return c;
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
				const error = new Error('User not found');
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
				message: 'Followers updated'
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

exports.updateProfile = (req, res, next) => {
	const userId = req.userId;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect.');
		error.statusCode = 422;
		throw error;
	}
	const name = req.body.name;
	const dob = req.body.dob;
	const mobile = req.body.mobile;
	const city = req.body.city;
	const zipcode = req.body.zipcode;
	const state = req.body.state;
	const description = req.body.description;

	User.findById(userId)
		.then(user => {
			if (!user) {
				const error = new Error('Could not find any User');
				error.statusCode = 404;
				throw error;
			}
			if (user._id.toString() !== req.userId) {
				const error = new Error('Not Authorized');
				error.statusCode = 403;
				throw error;
			}
			user.name = name;
			user.dob = dob;
			user.mobile = mobile;
			user.city = city;
			user.zipcode = zipcode;
			user.state = state;
			user.description = description;
			return user.save();
		})
		.then(result => {
			res.status(200).json({ message: 'Profile Updated!!', user: result });
		})
		.catch(error => {
			if (!error.statusCode) {
				error.statusCode = 503;
			}
			next(error);
		});
};

exports.interested = (req, res, next) => {
	const userId = req.userId;
	User.findById(userId)
		.then(user => {
			if (user) {
				const subscribed = findArray(user.subscriptions, 'Grammar-Check');
				const interest = findArray(user.interests, 'Grammar-Check');
				if (!subscribed) {
					if (!interest) {
						user.interests.push('Grammar-Check');
						user.save();
						res.json({
							message:
								'Grammar-Check will contact you soon!! Happy Grammar-Checking'
						});
					} else {
						res.json({
							message: 'Added in Interests'
						});
					}
				} else {
					res.json({
						message: 'You are already subscribed'
					});
				}
			}
		})
		.catch(error => {
			if (!error.statusCode) {
				error.statusCode = 503;
			}
			next(error);
		});
};

exports.followlist = (req, res, next) => {
	const userId = req.userId;
	var new_list = [];
	var new_list2 = [];
	User.findById(req.userId)
		.then(user => {
			if (!user) {
				const error = new Error('User not found');
				error.statusCode = 400;
				throw error;
			}
		})
		.then(result => {
			return User.findById(userId);
		})
		.then(user => {
			const followingList = user.followings;
			var count = 5;
			for (var followings of followingList.values()) {
				new_list.push(followings);
				count = count - 1;
				if (count < 1) {
					break;
				}
			}
			for (var val of new_list.values()) {
				User.findById(val)
					.populate({ path: 'followings', select: 'name' })
					.then(user => {
						const followings = user.followings;
						new_list2.push(...followings);
					});
			}
			res.status(200).json({
				message: 'Got User',
				user: new_list2
			});
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

const sortPost = async userIdlist => {
	var maxpostarray = [];
	for (var id of userIdlist.values()) {
		await Post.find({ creator: id })
			.sort([['likenumber', 'desc']])
			.limit(1)
			.then(post => {
				maxpostarray.push(...post);
			});
	}
	return maxpostarray;
};

const sortArray = userIdlist => {
	var trustfactor = [];
	for (var id of userIdlist.values()) {
		User.findById(id).then(user => {
			trustfactor.push(Number(user.trustfactor));
		});
	}
	for (var i = 0; i < trustfactor.length - 1; i++) {
		for (var j = i; j < trustfactor.length - i - 1; j++) {
			if (trustfactor[j] < trustfactor[j + 1]) {
				var temp = trustfactor[j];
				trustfactor[j] = trustfactor[j + 1];
				trustfactor[j + 1] = temp;
				temp = userIdlist[j];
				userIdlist[j] = userIdlist[j + 1];
				userIdlist[j + 1] = temp;
			}
		}
	}
	return userIdlist.slice(0, 10);
};

exports.newsRecommend = (req, res, next) => {
	const userId = req.userId;
	User.findById(userId)
		.then(async user => {
			const following = user.followings;
			const sortedfollowinglist = await sortArray(following);
			const sortedpost = await sortPost(sortedfollowinglist);
			return sortedpost;
		})
		.then(result => {
			res.status(200).json({
				posts: result
			});
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.newsTorecommend = (req, res, next) => {
	const userId = req.userId;
	var postArray = [];
	User.findById(userId)
		.then(async user => {
			const following = user.followings;
			for (var val of following.values()) {
				await Post.find({ creator: val })
					.sort([['timestamp', 'desc']])
					.limit(5)
					.then(post => {
						postArray.push(...post);
					});
			}
			return postArray;
		})
		.then(result => {
			res.status(200).json({
				posts: result
			});
		});
};
