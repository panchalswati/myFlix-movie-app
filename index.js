/**
 * @file The index file creates the Express application, sets up the server and implements routes to Api
 * endpoints used to access myFlix data. Requests made to these endpoints use mongoose models created in the
 * models file and are authenticated using strategies implemented in the passport file. The connect method
 * establishes a connection between mongoose and the database, which is hosted on MongoDB Atlas. The
 * server and endpoints are hosted on Heroku.
 * @requires mongoose Connects the app to the database and implements data schemas using models.
 * @requires './users' The file where data schemas and models are defined.
 * * @requires './movies' The file where data schemas and models are defined.
 * @requires express Used to create an express application.
 * @requires morgan Used to log requests made to the database.
 * @requires passport Used to create strategies for authenticating and authorising requests to the Api endpoints.
 * @requires './auth.js' The file that implements the user login route.
 * @requires cors Used to control origins from which requests to the server can be made.
 * @requires express-validator Used to perform validation on data provided when creating or updating a user.
 */
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
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234', 'https://my-awesome-site123.netlify.app', 'http://localhost:4200', 'https://panchalswati.github.io/'];
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

/**
 * connect to mongoose database
 */
//mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/movies', MoviesRoutes);
app.use('/users', UsersRoutes);
app.get('/', (req, res, next) => {
  res.send("Welcome to myFlix Movie App!");
  next();
});

/**
 *serving static files
  app.use(express.static('public')); 
 */
app.get('/docs', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/documentation.html'));
})

/**
 * error-handling middleware library
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
const port = process.env.PORT || 8080;

/**
 * listening on port 8080
 */
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});