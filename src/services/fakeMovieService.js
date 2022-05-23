import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "5b21ca3eeb7f6fbccd471801",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    like: false,
    numberInStock: 16,
    dailyRentalRate: 12.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471802",
    title: "Die Hard",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    like: false,
    numberInStock: 15,
    dailyRentalRate: 12.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471803",
    title: "Get Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    like: false,
    numberInStock: 28,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471804",
    title: "Trip to Italy",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    like: false,
    numberInStock: 17,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471805",
    title: "Airplane",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    like: false,
    numberInStock: 27,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471806",
    title: "Wedding Crashers",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    like: false,
    numberInStock: 27,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471807",
    title: "Gone Girl",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    like: false,
    numberInStock: 47,
    dailyRentalRate: 14.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471808",
    title: "The Sixth Sense",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 4,
    like: false,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471809",
    title: "The Avengers",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    like: false,
    numberInStock: 17,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471810",
    title: "Dominate Thor",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    like: false,
    numberInStock: 46,
    dailyRentalRate: 12.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471811",
    title: "Last In, First, Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    like: false,
    numberInStock: 45,
    dailyRentalRate: 12.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471812",
    title: "First In, First Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    like: false,
    numberInStock: 28,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471813",
    title: "Strip 2 Eat Ali",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    like: false,
    numberInStock: 17,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471814",
    title: "No Plane, No game!",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    like: false,
    numberInStock: 17,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Wedding Braggers",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    like: false,
    numberInStock: 17,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Gun Gurl",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    like: false,
    numberInStock: 17,
    dailyRentalRate: 14.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "The Sixth Cents",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 14,
    like: false,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    title: "The Revengers",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    like: false,
    numberInStock: 27,
    dailyRentalRate: 13.5,
  },
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find((m) => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find((m) => m._id === movie._id) || {};
  movieInDb.name = movie.name;
  movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
  movieInDb.like = movie.like;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find((m) => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
