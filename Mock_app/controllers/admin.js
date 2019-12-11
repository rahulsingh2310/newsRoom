const axios = require('axios');
const correctPost = require('../models/correctPost');
const history = require('../models/history');
const interestedUser = require('../models/interestedUsers');
const mongoose = require('mongoose');

const nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'grammarcheck05@gmail.com',
		pass: 'Grammar05!'
	}
});

var storeHistory = function(user, title, original, updated) {
	const History = new history({
		user: user,
		title: title,
		originalpost: original,
		updatedpost: updated
	});
	History.save();
	console.log('History updated');
};

var storeUser = function(name, email) {
	const User = new interestedUser({
		name: name,
		email: email
	});
	User.save();
	console.log('User Created');
};

var sendMail = function(email) {
	url = 'http://localhost:4001/auth/';
	transporter
		.sendMail({
			from: 'grammarcheck05@gmail.com',
			to: email,
			subject: 'Subscribe for Grammar-Check!!',
			html: `Subscribe for Grammar-Check : <a href="${url}">Click here!!</a>`
		})
		.then(() => {
			console.log('success');
		})
		.catch(error => {
			console.log(error);
		});
};

exports.getNews = async (req, res, next) => {
	let posts = [];
	let correct_posts = [];
	axios
		.get('http://localhost:8080/feed/postss/grammarcheck')
		.then(async response => {
			posts = response.data.posts;
			console.log(posts);
			old_posts = posts;
			for (var post of posts) {
				const correct_post = await correctPost.findOne({ title: post.title });
				console.log(post.content);

				{
					storeHistory(
						post.creator.name,
						post.title,
						post.content,
						correct_post.content
					);
					post.content = correct_post.content;
				}

				correct_posts.push(correct_post);
				// console.log(post);
				// console.log(correct_post);
				// console.log(correct_posts);
			}
			axios
				.post('http://localhost:8080/feed/correctPosts', { posts: posts })
				.then(resp => {
					console.log('Sent corrected posts successfully!');
					console.log(resp.data.message);
				})
				.catch(error => console.log(error));
			const lengt = posts.length;
			res.render('news', {
				message: 'Posts retrieved successfully!!',
				posts: old_posts,
				correct_posts: correct_posts,
				lengt: lengt
			});
		})
		// .then((correct_posts) => {
		//     // console.log(posts);
		//     // console.log(correct_posts);
		//     res.json({
		//         message: "Posts retrieved successfully!",
		//         correct_posts: correct_posts,
		//         posts:posts
		//     })
		// })
		.catch(error => {
			console.log(error);
		});

	// .then(response => {
	//     var posts = response.data.posts;
	//     for (var post of posts){
	//         // console.log(post);
	//         // console.log(post.title);
	//          correctPost.findOne({title:post.title})
	//          .then(resp => {
	//              console.log(resp);
	//              console.log(post);
	//              post.content = resp.content;
	//              console.log(post);
	//          })
	//          .catch(error => {
	//              console.log(error);
	//          });
	//             //   console.log(correct_post);
	//             // post.content = correct_post.content;
	//     };
	//     // console.log(posts);
	//     return posts;
	// })
	// .then(posts => {
	//     axios.post("http://localhost:8080/feed/correctPosts", {
	//         posts: posts
	//     }).then(response => {
	//         console.log("Sent corrected Posts");
	//         console.log(response.data.message);
	//         res.json({message: "Successfully corrected the posts"});
	//     })
	// })
	// .catch(error =>{
	//     console.log(error);
	// });
};

exports.createPost = (req, res, next) => {
	title = req.body.title;
	content = req.body.content;
	const post = new correctPost({ title: title, content: content });
	post.save();
	res.status(201).json({
		message: 'Post created Successfully!',
		post: post
	});
};

exports.getHistory = (req, res, next) => {
	history
		.find()
		.then(result => {
			result = result.reverse();
			res.render('history', { posts: result });
		})
		.catch(error => console.log(error));
};

exports.getInterestedUsers = (req, res, next) => {
	axios
		.get('http://localhost:8080/feed/getInterestedUsers')
		.then(resp => {
			console.log(resp.data.users);
			users = resp.data.users;
			for (var user of users) {
				sendMail(user.email);
				storeUser(user.name, user.email);
			}
			res.json({
				users: users
			});
		})
		.catch(error => {
			console.log(error);
		});
};
