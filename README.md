# myFlix-movie-app
To build the server-side component of a movies web application. 
The web application will provide users with access to information about different movies, directors, and genres. 
Users will be able to sign up, update their personal information, and create a list of their favorite movies

Design Criteria

User Stories
● User will be able to receive information on movies, directors, and genres.
● User will be able to create a profile, can save data about favorite movies.

Feature Requirements

● Returns a list of ALL movies to the user
● Returns data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
● Returns data about a genre (description) by name/title (e.g., “Thriller”)
● Returns data about a director (bio, birth year, death year) by name
● Allow new users to register
● Allow users to update their user info (username, password, email, date of birth)
● Allow users to add a movie to their list of favorites
● Allow users to remove a movie from their list of favorites
● Allow existing users to deregister

Technical Requirements
● The API must be a Node.js and Express application.
● The API must use REST architecture, with URL endpoints corresponding to the data operations listed above
● The API must use at least three middleware modules, such as the body-parser package for reading data from requests and morgan for logging.

Hosted the App in Heroku
The Heroku Link : https://myflix-movies-heroku.herokuapp.com/
