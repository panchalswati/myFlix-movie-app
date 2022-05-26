const express = require('express');
const router = express.Router();

let users = [
    {
        "id": "1",
        "name": "swati",
        "favouriteMovies": []
    },
    {
        "id": "2",
        "name": "John",
        "favouriteMovies": [
            "The Dark Knight"
        ]
    }
]
router.get('/', (req, res) => {
    res.status(200).json(users);
});

router    //create new user
    .post('/', (req, res) => {
        const newUser = req.body;
        if (newUser.name) {
            newUser.id = uuid.v4();
            users.push(newUser);
            res.status(201).json(newUser)
        } else {
            res.status(400).send("users need name");
        }
    });

//update user
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);
    if (user) {
        user.name = updatedUser;
        res.status(200).json(user);
    } else {
        res.status(400).send("No such user")
    }
});

router.post('/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);
    if (user) {
        user.favouriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send("No such user");
    }
})

router.delete('/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);
    if (user) {
        user.favouriteMovies = user.favouriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send("No such user");
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);
    if (user) {
        users = users.filter(user => user.id !== id);
        res.status(200).send(`user email with ${id} is removed`);
    } else {
        res.status(400).send("No such user");
    }
});
module.exports = router;