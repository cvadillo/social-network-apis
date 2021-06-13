const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
            default: () => Types.ObjectId()
		},
		reactionBody: {
			type: String,
			required: true,
			maxlength: 280
		},
		username: {
			type: String,
			required: true
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	},
	{
		toJSON: {
			getters: true
		}
	}
);

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			min: 1,
			max: 128
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		username: {
			type: String,
			required: true
		},
		reactions: [ReactionSchema]
	},
	{
		toJSON: {
			virtuals: true,
			getters: true
		},
		id: false
	}
);

ThoughtSchema.virtual('reactionCount').get(function(){this.reactions.length});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;