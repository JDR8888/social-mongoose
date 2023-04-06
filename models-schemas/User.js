const { Schema, model } = require('mongoose');
const Thought = require('./Thought')

const userSchema = new Schema(
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
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }], // self-reference user model
    }, {
    });
    // virtual to get # of friends based on length of friends array
    userSchema.virtual('numFriends') 
            .get(function() {
                return this.friends.length;
            })
            .set(function(num) {
                // blank set function 
            }) 

    const User = model('user', userSchema);

    module.exports = User;