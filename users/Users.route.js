const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const User = require('./user.model');
const passport = require('passport');

/**
 * api to get all users 
 */
router.get('/', (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            res.status(500).send('Error' + error);
        })
})

/**
 * @returns insert new user details in database
 */
router.post('/', [
    check('Username', 'Username must be greater than 4 letters').isLength({ min: 5 }),
    check('Password', 'Username is required').not().isEmpty(),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
],
    (req, res) => {
        let errors = validationResult(req);  //check validation object for error

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let hashedPassword = User.hashPassword(req.body.Password);    //hashed password
        User.findOne({ Username: req.body.Username })
            .then((user) => {
                if (user) {
                    return res.status(400).send(req.body.Username + ' already exists');
                } else {
                    User
                        .create({
                            Username: req.body.Username,
                            Password: hashedPassword,
                            Email: req.body.Email,
                            Birthdate: req.body.Birthdate,
                        })
                        .then(user => { res.status(201).json(user) })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).send('Error' + error);
                        })
                }
            }).catch((error) => {
                console.error(error);
                res.status(500).send('Error' + error);
            })
    })

/**
 * api to get user details by username
 */
router.get('/:Username', (req, res) => {
    User.findOne({ Username: req.params.Username })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/**
 * api to update user details by name
 */
router.put('/:Username', [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
],
    (req, res) => {
        let errors = validationResult(req);  //check validation object for error

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let hashedPassword = User.hashPassword(req.body.Password);
        User.findOneAndUpdate({ Username: req.params.Username }, {
            $set:
            {
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.body.Email,
                Birthdate: req.body.Birthdate,
            }
        },
            { new: true },
            (err, updatedUser) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error: ' + err);
                } else {
                    res.json(updatedUser);
                }
            });
    });

/**
 * api to insert movie to user's favorite Movies list
 */

router.post('/:Username/movies/:MovieID', (req, res) => {
    User.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavouriteMovies: req.params.MovieID }
    },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

/**
 * api to delete movie from user favourite movies list
 */
router.delete('/:Username/movies/:MovieID', (req, res) => {
    User.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavouriteMovies: req.params.MovieID }
    },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

/**
 * api to delete user 
 */
router.delete('/:Username', (req, res) => {
    User.findOneAndRemove({ Username: req.params.Username })
        .then((users) => {
            if (!users) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

module.exports = router;
