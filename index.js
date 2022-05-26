const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    Movies = require('./routes/Movies'),
    Users = require('./routes/Users');

let app = express();
app.use(bodyParser.json());

app.use(express.json());
app.use(morgan('dev'));

app.use('/movies', Movies);

app.use('/users', Users);
app.get('/', (req, res) => {
    res.send("Welcome to myFlix Movie App!");
});
//Morgan middleware library to log all requests
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })
//app.use(morgan('combined', { stream: accessLogStream }));

//serving static files
app.use(express.static('public'));

//error-handling middleware library
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => console.log("app is listening on port 8080"));