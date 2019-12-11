const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		imageUrl: {
			type: String,
			requied: true
		},
		content: {
			type: String,
			required: true
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		tag: {
			type: String,
			required: false
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment',
				required: false
			}
		],
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: false
			}
		],
		likenumber: {
			type: Number,
			default: 0,
			required: false
		},
		dislikes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: false
			}
		],
		dislikenumber: {
			type: Number,
			default: 0,
			required: false
		},
		checkrequire: {
			type: Boolean,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
