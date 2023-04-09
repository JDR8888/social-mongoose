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
getSingleUser(req, res) {
    User.findOne({_id: req.params.userId})
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
updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true
    })
    .then((user) =>
    !user 
      ? res.status(404).json({message: 'no user with that id'})
      : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},

// DELETE user by id
deleteUser(req, res) {
    const userId = req.params.userId;
    User.findById(userId)
    .then((user) => {
    if (!user) {
        return res.status(404).json({message: 'no user found'});
    }
    const userName = user.username;
    // *BONUS* --> delete thought's of user
    return Thought.deleteMany({ username })
    .then(() => {
        return User.findByIdAndDelete(userId);
    })
    .then(() => {
        res.json({ message: 'the user (along with all associated thoughts) has been annihilated'})
    });
    })    
    .catch((err) => res.status(500).json(err));
},
// POST to add friend to user's friend list
addFriend(req, res) {
    try {
    const userId = req.params.userId;
    const friend = req.params.friendId;
    
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    user.friends.push(friend);
    user.save()
    .then(() => {
        res.status(200).json({message: 'your user has a new friend'})
        // .catch((err) => res.status(500).json(err));
    });
}) // closes .then statement
} catch (err) { res.status(500).json(err);}
}, 

// DELETE - remove frind from user's friend list
removeFriend(req, res) {
    try {
        const userId = req.params.userId;
        const friend = req.params.friendId;

        User.findById(userId)
          .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'user note found'});
            }
            user.friends.pull({_id: friend });
            user.save()
            .then(() => {
                res.status(200).json({ message: 'someone lost a friend'})
                .catch((err) => res.status(500).json(err));
            });
          })
    } catch (err) { res.status(500).json(err); }
}


}; // ends module.exports