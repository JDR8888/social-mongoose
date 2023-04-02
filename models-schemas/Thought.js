const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction.js')

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
            // use getter method to format the timestamp
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    }
)