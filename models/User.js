const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	userName: {
		type: String
	},
	createdBy: {
		type: new String
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	size: {
		type: String,
		default: 'Large'
	},
	toppings: []
});

// Create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// Export the model
module.exports = Pizza;