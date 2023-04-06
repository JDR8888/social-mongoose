const { Schema, model } = require('mongoose');
const Thought = require('./Thought')

const userSchema = new Schema(
    {
        username: {
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
            ref: 'thought',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }], // self-reference user model
    }, {
        toJSON: {getters: true},
        id: false,
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