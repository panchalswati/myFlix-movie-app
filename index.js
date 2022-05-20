const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    fs = require('fs'),
    path = require('path');

let app = express();

app.use(bodyParser.json());

let users = [
    {
        "id": "1",
        "name": "swati",
        "favouriteMovies": []
    },
    {
        "id": "2",
        "name": "John",
        "favouriteMovies": ['The Dark Knight']
    }
]

let movies = [
    {
        "Title": "The Shawshank Redemtion",
        "Description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        "Director": {
            "name": "Frank Darabont",
            "Birth Year": "1959",
            "Bio": "Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution. Brought to America as an infant, he settled with his family in Los Angeles and attended Hollywood High School. His first job in movies was as a production assistant on the 1981 low-budget film, Hell Night (1981), starring Linda Blair."
        },
        "Genre": {
            "Name": "Drama",
            "Description": "The film portrays the man's unique way of dealing with his new, torturous life"
        }
    },
    {
        "Title": "The Godfather",
        "Description": "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
        "Director": {
            "name": "Francis Ford Coppola",
            "Birth Year": "1939",
            "Bio": "Francis Ford Coppola was born in 1939 in Detroit, Michigan, but grew up in a New York suburb in a creative, supportive Italian-American family. "
        },
        "Genre": {
            "Name": "Crime",
            "Description": "Michael to do the thing he was most reluctant in doing and wage a mob war against all the other mafia families which could tear the Corleone family apart"
        }
    },
    {
        "Title": "The Dark Knight",
        "Description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        "Director": {
            "name": "Christopher Nolan",
            "Birth Year": "1970",
            "Bio": "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made. At 7 years old, Nolan began making short movies"
        },
        "Genre": {
            "Name": "Action",
            "Description": "Batman's struggle against The Joker becomes deeply personal, forcing him to confront everything he believes and improve his technology to stop him. "
        },
    },
    {
        "Title": "12 Angry Men",
        "Description": "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
        "Director": {
            "name": "Sidney Lumet",
            "Birth Year": "1970",
            "Bio": "Sidney Lumet was a master of cinema, best known for his technical knowledge and his skill at getting first-rate performances from his actors -- and for shooting most of his films in his beloved New York. He made over 40 movies, often complex and emotional, but seldom overly sentimental. Although his politics were somewhat left-leaning"
        },
        "Genre": {
            "Name": "Crime",
            "Description": "The defense and the prosecution have rested, and the jury is filing into the jury room to decide if a young man is guilty or innocent of murdering his father."
        }
    },
    {
        "Title": "Pulp Fiction",
        "Description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        "Director": {
            "name": "Quentin Tarantino",
            "Birth Year": "1963",
            "Bio": "Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old."
        },
        "Genre": {
            "Name": "Crime",
            "Description": " The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents"
        }
    },
    {
        "Title": "Inception",
        "Decription": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
        "Director": {
            "name": "Christopher Nolan ",
            "Birth Year": "1970",
            "Bio": "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made. At 7 years old, Nolan began making short movies"
        },
        "Genre": {
            "Name": "Sci-Fi",
            "Description": "capture the spirit of Christopher Nolan's mind-bending masterpiece in their own way."
        }
    },
    {
        "Title": "Fight Club",
        "Decription": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
        "Director": {
            "name": "David Fincher",
            "Birth Year": "1962",
            "Bio": "David Fincher was born in 1962 in Denver, Colorado, and was raised in Marin County, California. When he was 18 years old he went to work for John Korty at Korty Films in Mill Valley. He subsequently worked at ILM (Industrial Light and Magic) from 1981-1983"
        },
        "Genre": {
            "Name": "Drama",
            "Description": "Together the two men spiral out of control and engage in competitive rivalry for love and power."
        }
    },
    {
        "Title": "The Matrix",
        "Decription": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
        "Director": {
            "name": "Lana Wachowski",
            "Birth Year": "1965",
            "Bio": "Lana Wachowski and her sister Lilly Wachowski, also known as the Wachowskis, are the duo behind such ground-breaking movies as The Matrix (1999) and Cloud Atlas (2012). Born to mother Lynne, a nurse, and father Ron, a businessman of Polish descent, Wachowski grew up in Chicago and formed a tight creative relationship with her sister Lilly."
        },
        "Genre": {
            "Name": "Sci-Fi",
            "Description": "As a rebel against the machines, Neo must confront the agents: super-powerful computer programs devoted to stopping Neo and the entire human rebellion."
        },
    },
    {
        "Title": "Goodfellas",
        "Decription": "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
        "Director": {
            "name": "Martin Scorsese ",
            "Birth Year": "1942",
            "Bio": "Martin Charles Scorsese was born on November 17, 1942 in Queens, New York City, to Catherine Scorsese (née Cappa) and Charles Scorsese, who both worked in Manhattan's garment district, and whose families both came from Palermo, Sicily."
        },
        "Genre": {
            "Name": "Biography",
            "Description": "Henry Hill might be a small time gangster, who may have taken part in a robbery with Jimmy Conway and Tommy De Vito, two other gangsters who might have set their sights a bit higher"
        }
    },
    {
        "Title": "Interstellar",
        "Description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        "Director": {
            "name": "Christopher Nolan",
            "Birth Year": "1970",
            "Bio": "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made. At 7 years old, Nolan began making short movies"
        },
        "Genre": {
            "Name": "Sci-Fi",
            "Description": " A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life"
        }
    },
    {
        "Title": "City of God",
        "Description": "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin.",
        "Director": {
            "name": "Fernando Meirelles",
            "Birth Year": "1955",
            "Bio": "ernando Meirelles was born in a middle class family in São Paulo City, Brazil. He studied architecture at the university of São Paulo. At the same time he developed an interest in filmmaking. With a group of friends he started producing experimental videos and video art. They won a huge number of awards in Brazilian video festivals"
        },
        "Genre": {
            "Name": "Drama",
            "Description": "Brazil, 1960s, City of God. The Tender Trio robs motels and gas trucks. Younger kids watch and learn well...too well"
        }
    },
];

//Read all movies
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

//Read movie 
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title)

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send("No such movie");
    }

});

//Read genre
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send("No such genre movie");
    }

});

//Read director details
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const directors = movies.find(movie => movie.Director.name === directorName).Director;

    if (directors) {
        res.status(200).json(directors);
    } else {
        res.status(400).send("No such directors");
    }

});

//create new user
app.post('/users', (req, res) => {
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
app.put('/users/:id', (req, res) => {
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

//post - add movie to favoriteMovies list
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);
    if (user) {
        user.favouriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send("No such user");
    }
})

//Delete movie from user's favoriteMovies list
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);
    if (user) {
        user.favouriteMovies = user.favouriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send("No such user");
    }
});

//Delete user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);
    if (user) {
        users = users.filter(user => user.id !== id);
        res.status(200).send(`user email with ${id} is removed`);
    } else {
        res.status(400).send("No such user");
    }
});

//Read
app.get('/', (req, res) => {
    res.send("Welcome to myFlix Movie App!");
});

//serving static files
app.use(express.static('public'));

//Morgan middleware library to log all requests
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }));

//error-handling middleware library
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => console.log("app is listening on port 8080"));