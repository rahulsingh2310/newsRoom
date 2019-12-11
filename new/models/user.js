const mongoose = require('mongoose');
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
		required: false
	},
	mobile: {
		type: Number,
		default: 0,
		required: false
	},
	city: {
		type: String,
		required: false
	},
	zipcode: {
		type: Number,
		min: 100000,
		max: 999999,
		required: false
	},
	state: {
		type: String,
		required: false
	},
	status: {
		type: String,
		default: 'I am new!'
	},
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post',
			required: false
		}
	],
	totalpost: {
		type: Number,
		default: 0,
		required: false
	},
	likedposts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post',
			required: false
		}
	],
	dislikedposts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post',
			required: false
		}
	],
	commentedposts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment',
			required: false
		}
	],
	followers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: false
		}
	],
	followings: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: false
		}
	],
	subscriptions: [
		{
			type: String,
			required: false
		}
	],
	interests: [
		{
			type: String,
			required: false
		}
	],
	confirmed: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('User', userSchema);
