const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction.js')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            // set default to current timestamp
            default: Date.now,
            get: function(date) {
                // getter method, format the timestamp as a string
                return date.toLocaleString();
              },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction]
    }
)

const Thought = model('thought', thoughtSchema);

module.exports = Thought;