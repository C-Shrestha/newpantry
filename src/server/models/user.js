const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favoriteRecipes: {
        type: Array,
        default: []
    },
    pantryIngredients: {
        type: Array,
        default: []
    },
    profilePicture: {
        type: String,
        default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    },
    confirmToken: {
        type: String,
        required: true,
        default: ''
    },
    valid: {
        type: Boolean,
        required: true,
        default: false
    }, 
    test: {
        type: Number,
        required: true,
        default: 0
    }, 
    __v: {
        type: Number,
        required: true,
        default: 0, 
        select: false
    }

}, {collection: 'User'}, {timestamps: true}, {versionKey: false} );

module.exports = mongoose.model('User', userSchema);
