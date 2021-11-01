const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required'],
    },
    posts: [PostSchema],
    likes: Number
});
UserSchema.virtual('postCount').get(function () {
    //we only use the 'function()' not ES6
    //so that we can retunr current object
    //if we say 'return this' return the current object
    return this.posts.length;

})
const User = mongoose.model('user', UserSchema);
module.exports = User;