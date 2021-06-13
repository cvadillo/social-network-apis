// Need to update the model so that we can get the user showing properly

const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: /.+\@.+\..+/ 

		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Thought'
			}
		],
		friends: []
	},
	{
		toJSON: {
			virtuals: true
		},
		id: false
	}
);

UserSchema.virtual('friendCount').get(function() {
  	return this.friends.length;
});

// Create the User model using the UserSchema
const User = model('User', UserSchema);

// Export the model
module.exports = User;