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

    const User = model('user', UserSchema);

    module.exports = User;