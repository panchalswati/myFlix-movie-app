const mongoose = require('mongoose');

/**
 * creating mongoose movie schema 
 */
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
/**
 * exports the movie schema to Movie component
 */
module.exports = mongoose.model('Movie', movieSchema)