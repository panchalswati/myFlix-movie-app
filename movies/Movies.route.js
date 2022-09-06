const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('./movie.model');
const passport = require('passport');

/**
 * reads all movies of logged-in user
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movie.find()
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((error) => {
            res.status(500).send('Error' + error);
        })
});

/**
 * api to get movie by title
 */
router.get('/:Title', (req, res) => {
    Movie.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((error) => {
            res.status(500).send('Error' + error);
        })
});

/**
 * api to get genre information of a movie
 */
router.get('/genre/:genreName', (req, res) => {
    Movie.findOne({ 'Genre.Name': req.params.genreName })
        .then((movie) => {
            res.status(200).json(movie.Genre);
        })
        .catch((err) => {
            res.status(500).send('Error' + error);
        });
});

/**
 * api to get director information of a movie
 */
router.get('/directors/:directorName', (req, res) => {
    Movie.findOne({ 'Director.Name': req.params.directorName })
        .then((movie) => {
            res.status(200).json(movie.Director);
        })
        .catch((err) => {
            res.status(500).send('Error' + error);
        });
});

module.exports = router;