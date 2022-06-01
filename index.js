const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    cors = require('cors');
app.use(cors());

const port = process.env.PORT || 8080;

MoviesRoutes = require('./movies/Movies.route.js');
UsersRoutes = require('./users/Users.route.js');
app.use(express.json());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

const { check, validationResult } = require('express-validator');

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/movies', MoviesRoutes);

app.use('/users', UsersRoutes);

app.get('/', (req, res, next) => {
    res.send("Welcome to myFlix Movie App!");
    next();
});
//serving static files
app.use(express.static('public'));

//error-handling middleware library
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});