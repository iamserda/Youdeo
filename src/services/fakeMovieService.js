import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 16,
    dailyRentalRate: 12.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Die Hard",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    like: false,
    numberInStock: 15,
    dailyRentalRate: 12.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Get Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    like: false,
    numberInStock: 28,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Trip to Italy",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    like: false,
    numberInStock: 17,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Airplane",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    like: false,
    numberInStock: 27,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Wedding Crashers",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    like: false,
    numberInStock: 27,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Gone Girl",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    like: true,
    numberInStock: 47,
    dailyRentalRate: 14.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "The Sixth Sense",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 4,
    like: false,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Avengers",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    like: false,
    numberInStock: 17,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471830",
    title: "Dominate Thor",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 46,
    dailyRentalRate: 12.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471840",
    title: "Last In, First, Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    like: false,
    numberInStock: 45,
    dailyRentalRate: 12.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471850",
    title: "First In, First Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    like: false,
    numberInStock: 28,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471860",
    title: "Strip 2 Eat Ali",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    like: false,
    numberInStock: 17,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471870",
    title: "No Plane, No game!",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    like: false,
    numberInStock: 17,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471880",
    title: "Wedding Braggers",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    like: false,
    numberInStock: 17,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471890",
    title: "Gun Gurl",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    like: true,
    numberInStock: 17,
    dailyRentalRate: 14.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471891",
    title: "The Sixth Cents",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 14,
    like: false,
    dailyRentalRate: 13.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471892",
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
