// import the router
const {User, Thought, Reaction} = require('../models-schemas')

// GET all thoughts
module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

// GET single thought by id
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thought) =>
        !thought
            ? res.status(404).json({message: "we couldn't find a thought with that id"})
            : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

// POST a new thought --> push thought-IDs to associated user's thoughts array
    createThought(req, res) {    
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true },
                    (err, user) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err);
                        }
                        if (!user) {
                            return res
                                .status(404)
                                .send({ message: "User not found, but thought created" });
                        }

                        res.status(202).json({ message: 'thought created successfully' });
                    }
                );
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

// PUT -- update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
          ? res.status(404).json({message: 'no thought has that id' })
          : res.json(thought))
          .catch((err) => res.status(500).json(err));
    },

// DELETE thought by id
deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that id' });
        }
        return Reaction.deleteMany({ _id: { $in: thought.reactions } });
      })
      .then(() => res.json({ message: 'Thought and reactions deleted' }))
      .catch((err) => res.status(500).json({ error: 'Internal server error' }));
  },

// /:thoughtId/reactions
// POST --> create a reaction, store in a thought's reaction array
addReaction(req, res) {
    const thoughtId = req.params.thoughtId;
    const reaction = req.body;
    Thought.findById(thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that id' });
        }
        thought.reactions.push(reaction);
        return thought.save();
      })
      .then(() => res.json({ message: 'Huzzah. You got a reaction' }))
      .catch((err) => res.status(500).json({ error: 'Internal server error' }));
  },
  

// DELETE --> pull/remove a reaction by reactionID
deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that id' });
        }
        res.status(200).json({ message: 'Reaction deleted successfully' });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
      });
  },
  

};