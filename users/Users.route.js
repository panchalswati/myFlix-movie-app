const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('./user.model');

//read all users
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find()
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(500).send('Error' + error);
        })
})

//insert new user
router.post('/', [
    check('name', 'Username is required').isLength({ min: 5 }),
    check('name', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email does not appear to be valid').isEmail()
],
    (req, res) => {
        let errors = validationResult(req);  //check validation object for error

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let hashedPassword = User.hashPassword(req.body.password);    //hashed password
        User.findOne({ name: req.body.name })
            .then((user) => {
                if (user) {
                    return res.status(400).send(req.body.name + ' already exists');
                } else {
                    User
                        .create({
                            name: req.body.name,
                            password: hashedPassword,
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
router.get('/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
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
router.put('/:name', [
    check('name', 'Username is required').isLength({ min: 5 }),
    check('name', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email does not appear to be valid').isEmail()
],
    (req, res) => {
        let errors = validationResult(req);  //check validation object for error

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let hashedPassword = User.hashPassword(req.body.password);
        User.findOneAndUpdate({ name: req.params.name }, {
            $set:
            {
                name: req.body.name,
                password: hashedPassword,
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
router.post('/:name/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
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

router.delete('/:name/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
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
router.delete('/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
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
