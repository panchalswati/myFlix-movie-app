const express = require('express'),
  app = express(),
  path = require('path'),
  fs = require('fs'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  MoviesRoutes = require('./movies/Movies.route.js'),
  UsersRoutes = require('./users/Users.route.js');
app.use(express.json());
app.use(morgan('dev'));
const { check, validationResult } = require('express-validator');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
//app.use(cors());
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234', 'https://myflix-site.netlify.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

let auth = require('./auth')(app);
const passport = require('passport');
require('./localPassport');
//mongoose.connect('mongodb+srv://myMovies:swati1dec@dbmyflix.53kbu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/movies', MoviesRoutes);
app.use('/users', UsersRoutes);

app.get('/', (req, res, next) => {
  res.send("Welcome to myFlix Movie App!");
  next();
});
//serving static file
//app.use(express.static('public'));
app.get('docs', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/documentation.html'));
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});