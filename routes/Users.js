const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

//read all users
router.get('/', (req, res) => {
    User.find()
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(500).send('Error' + error);
        })
})

//insert new user
router.post('/', (req, res) => {
    User.findOne({ name: req.body.name })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.name + ' already exists');
            } else {
                User
                    .create({
                        name: req.body.name,
                        password: req.body.password,
                        email: req.body.email,
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

//read user by name
router.get('/:name', (req, res) => {
    User.findOne({ name: req.params.name })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//update user by name
router.put('/:name', (req, res) => {
    User.findOneAndUpdate({ name: req.params.name }, {
        $set:
        {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            Birthdate: req.body.Birthdate,
            favoriteMovies: req.body.favoriteMovies
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

//insert movie to user's favorite Movies list
router.post('/:name/movies/:MovieID', (req, res) => {
    User.findOneAndUpdate({ name: req.params.name }, {
        $push: { favoriteMovies: req.params.MovieID }
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

router.delete('/:name/movies/:MovieID', (req, res) => {
    User.findOneAndUpdate({ name: req.params.name }, {
        $pull: { favoriteMovies: req.params.MovieID }
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

//delete - deregister user by name
router.delete('/:name', (req, res) => {
    User.findOneAndRemove({ name: req.params.name })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.name + ' was not found');
            } else {
                res.status(200).send(req.params.name + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

module.exports = router;
