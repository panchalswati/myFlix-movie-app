const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: String,
    password: Number,
    email: String,
    Birthdate: Date,
    favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('User', userSchema);