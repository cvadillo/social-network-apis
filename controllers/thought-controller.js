const { Thought, User } = require('../models');

const thoughtController = {
	// add thought to user
	addThought({ params, body }, res) {
		console.log(body);
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
					);
			})
			.then(dbUserData => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user exists with this id, fool!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.json(err));

	},

	// remove thought
	removeThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoughtId })
			.then(deletedThought => {
				if(!deletedThought) {
					return res.status(404).json({ message: `You can't delete what doesn't exist... with this thought, fool!` });
				}
				return User.findOneAndUpdate(
						{ _id: params.userId },
						{ $pull: { thoughts: params.thoughtId } },
						{ new: true }
					);
			})
			.then(dbUserData => {
				if (!dbPizzaData) {
					res.status(404).json({ message: 'No user exists with this id, fool!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.json(err));
	}
};

module.exports = thoughtController;