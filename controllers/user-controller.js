const { User } = require('../models');

const userController = {
	// getall pizzas
	getAllUsers(req, res) {
		User.find({})
			.then(dbUserData => res.json(dbUserData))
			.catch(err => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// get one pizza by id
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.then(dbPizzaData => {
				// If no pizza is found, send 404
				if(!dbUserData) {
					res.status(404).json({ message: 'No user found, fool!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// create a user
	createUser({ body }, res) {
		User.create(body)
			.then(dbUserData => res.json(dbUserData))
			.catch(err => res.status(400).json(err));
	},

	// update user by id
	updateUser({ params, body}, res) {
		User.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then(dbUserData => {
				if(!dbUserData) {
					res.status(404).json({ message: 'No user found with this ID, fool!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.status(400).json(err));
	},

	// delete user by id
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then(dbUserData => {
				if(!dbUserData) {
					res.status(404).json({ message: `You can't delete what doesn't exist with this id, fool!` });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.status(400).json(err));
	}
};

module.exports = userController;