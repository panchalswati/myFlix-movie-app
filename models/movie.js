const mongoose = require('mongoose');
let movieSchema = mongoose.Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Director: {
        name: String,
        Birth: Number,
        Bio: String
    },
    Genre: {
        Name: String,
        Description: String,
    },
    ImagePath: String,
    Feature: Boolean
});
module.exports = mongoose.model('Movie', movieSchema)