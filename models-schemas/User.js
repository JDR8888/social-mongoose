const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/
        },
        thoughts: [thoughtSchema],
        friends: [UserSchema], // self-reference user model
    }, {
        virtuals: { // virtual to get # of friends based on length of friends array
            friendCount : {
                get() {
                    return this.friends.length;
                }
            }
        }
    });

    const User = model('user', UserSchema);

    module.exports = User;