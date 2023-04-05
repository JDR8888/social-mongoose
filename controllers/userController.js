// include ObjectID from mongoose and include the models
const {ObjectID} = require('mongoose').Types;
const {User, Thought} = require('../models-schemas');

module.exports = {
// GET all users
getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
},
// GET a single user with thought & friend data
getSingleUser(req,res) {
    User.findOne({_id: req.params.userID})
    .select('-__v')
    .then((user) => 
    !user // ternary if no user
      ? res.status(404).json({
        message: 'no user found'})
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
// POST new user
createUser(req, res) {
    User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
},
// PUT to update user by id

// DELETE user by id
deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({error: 'no user with that id'})
    }
    return res.json({message: 'user deleted'})
}
// POST to add friend to user's friend list

// DELETE - remove frind from user's friend list

// **BONUS** DELETE user --> delete thought's associated with that user

}; // ends module.exports