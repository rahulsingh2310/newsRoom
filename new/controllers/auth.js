const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'newsroom248@gmail.com',
		pass: 'projectnode@5'
	}
});

const EMAIL_SECRET = 'sunrisesintheeast';

const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed');
		error.statusCode = 422;
		error.data = errors.array();
		throw error;
	}
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;
	var subscriptions = req.body.subscriptions;
	var description = req.body.description;
	var trustfactor = '0.0';
	// const dob = req.body.dob;
	// const mobile = req.body.mobile;
	// const city = req.body.city;
	// const zipcode = req.body.zipcode;
	// const state = req.body.state;
	bcrypt
		.hash(password, 12)
		.then(hashedPw => {
			const user = new User({
				email: email,
				password: hashedPw,
				name: name,
				trustfactor: trustfactor

				// dob: dob,
				// mobile: mobile,
				// city: city,
				// zipcode: zipcode,
				// state: state
			});
			return user.save();
		})
		.then(user => {
			if (subscriptions) {
				subscriptions = 'Grammar-Check';
				user.subscriptions.push(subscriptions);
				user.save();
			}
			if (description) {
				user.description = description;
				user.save();
			}
			jwt.sign(
				{
					email: req.body.email
				},
				EMAIL_SECRET,
				{
					expiresIn: '1h'
				},
				(err, emailToken) => {
					const url = `http://localhost:8080/auth/confirmation/${emailToken}`;
					console.log(req.body.email);
					transporter
						.sendMail({
							from: 'newsroom248@gmail.com',
							to: req.body.email,
							subject: 'Confirm Email',
							html: `Please click this link to confirm your email : <a href="${url}">${url}</a>`
						})
						.then(() => {
							console.log('success');
						})
						.catch(error => {
							console.log(error);
						});
					console.log('Email Sent');
				}
			);
		})
		.then(result => {
			res.status(201).json({ message: 'User created!' });
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser;
	User.findOne({ email: email })
		.then(user => {
			if (!user) {
				const error = new Error('A user with this email could not be found!');
				error.statusCode = 401;
				throw error;
			}
			loadedUser = user;
			return bcrypt.compare(password, user.password);
		})
		.then(isEqual => {
			if (!isEqual) {
				const error = new Error('Wrong password!');
				error.statusCode = 401;
				throw error;
			}
			const token = jwt.sign(
				{
					email: loadedUser.email,
					userId: loadedUser._id.toString()
				},
				'somesupersecretsecret',
				{ expiresIn: '2h' }
			);
			res.status(200).json({ token: token, userId: loadedUser._id.toString() });
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.confirmation = async (req, res, next) => {
	let verificationToken;
	try {
		verificationToken = jwt.verify(req.params.token, EMAIL_SECRET);
	} catch (err) {
		err.statusCode = 500;
		throw err;
	}
	if (!verificationToken) {
		const error = new Error('Link Not Valid!!');
		error.statusCode = 401;
		throw error;
	}
	req.email = verificationToken.email;
	const mail = verificationToken.email;
	User.findOne({ email: mail })
		.then(user => {
			if (!user) {
				const error = new Error('A user with this email could not be found!');
				error.statusCode = 401;
				throw error;
			}
			user.confirmed = true;
			return user.save();
		})
		.then(result => {
			res.status(201).redirect('http://localhost:3000');
		})
		.catch(err => {
			console.log(err);
		});
	next(err);
};
