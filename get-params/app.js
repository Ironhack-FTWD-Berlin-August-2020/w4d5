const express = require('express');
const app = express();
const handlebars = require('hbs');

const movies = require('./movies.json');

// console.log(movies);

app.use(express.static('public'));

handlebars.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    // to skip layout for a route: pass layout: false into object
    res.render('moviesView', { moviesArray: movies })
});

// app.get('/godfather', (req, res) => {
//     const godfather = movies.find(movie => movie.title === 'The Godfather');
//     console.log(godfather);
//     res.render('movieDetails', { clickedMovie: godfather });
// });

app.get('/movies', (req, res) => {
    // console.log(req.query.title);
    const searchedMovies = movies.filter(movie => movie
        .title
        .toLowerCase()
        .includes(req.query.title.toLowerCase())
    );
    // console.log(searchedMovies);
    res.render('moviesView', { moviesArray: searchedMovies })
});

app.get('/movies/:title', (req, res) => {
    console.log(req.params.title);
    const movie = movies.find(movie => movie.title === req.params.title);
    console.log(movie);
    res.render('movieDetails', { clickedMovie: movie });
});


// example for a query string -> req.query
// http://localhost:3000/search?name=hans&course=webdev
// app.get('/search', (req, res) => {
//     // {name: 'hans'}
//     console.log(req.query.name, req.query.course);
// });


// example for route parameters -> req.params
// app.get('/:course/:student', (req, res) => {
//     // const { course, student } = req.params;
//     // console.log(course, student);
//     console.log(req.params);
// });

app.listen(3000, () => {
    console.log('Listening on port 3000');
});