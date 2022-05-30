const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

const mongoose = require('mongoose');

const MoviesRoutes = require('./routes/Movies');
const UsersRoutes = require('./routes/Users');

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.listen(8080, () => console.log("app is listening on port 8080"));