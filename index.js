const express=require('express'),
morgan=require('morgan');
fs=require('fs'),
path=require('path');

let app=express();

let Movies=[
    {
        "Title":"The Shawshank Redemtion",
        "Director":"Frank Darabont",
        "Genre":"Drama"
    },
    {
        "Title":"The Godfather",
        "Director":"Francis Ford Coppola",
        "Genre":["Crime","Drama"]
    },
    {   "Title":"The Dark Knight",
        "Director":"Christopher Nolan",
        "Genre":["Action","Crime","Drama"]
    },
    {
        "Title":"12 Angry Men",
        "Director":"Sidney Lumet",
        "Genre":["Crime","Drama"]
    },
    {
        "Title":"Pulp Fiction",
        "Director":"Quentin Tarantino",
        "Genre":["Crime","Drama"]
    },
    {
        "Title":"Inception",
        "Director":"Christopher Nolan ",
        "Genre":["Action","Adventure","Sci-Fi"]
    },
    {
        "Title":"Fight Club",
        "Director":"David Fincher",
        "Genre":["Drama"]
    },
    {
        "Title":"The Matrix",
        "Director":[" Lana Wachowski", "Lilly Wachowski "],
        "Genre":["Action","Sci-Fi"]
    },
    {
        "Title":"Goodfellas",
        "Director":"Martin Scorsese ",
        "Genre":["Drama","Biography","Crime"]
    },
    {
        "Title":"Interstellar",
        "Director":"Christopher Nolanr",
        "Genre":["Drama","Adventure","Sci-Fi"]
    },
    {
        "Title":"City of God",
        "Director":["Fernando Meirelles","Kátia Lund"],
        "Genre":["Drama","Crime"]
    },
];

app.get('/movies',(req,res)=>{
    res.json(Movies);
});
app.get('/',(req,res)=>{
    res.send("Welcome to myFlix Movie App!");
});

//serving static files
app.use(express.static('public'));

//Morgan middleware library to log all requests
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
app.use(morgan('combined',{stream: accessLogStream}));

//error-handling middleware library
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(8080,()=>console.log("app is listening on port 8080"));