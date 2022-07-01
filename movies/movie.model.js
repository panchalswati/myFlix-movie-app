const mongoose = require('mongoose');
let movieSchema = mongoose.Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Director: {
        Name: String,
        Birth: Number,
        Bio: String,
        Death: Number
    },
    Genre: {
        Name: String,
        Description: String,
    },
    ImagePath: String,
    Feature: Boolean
});
module.exports = mongoose.model('Movie', movieSchema)