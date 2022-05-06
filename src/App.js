import React, { Component } from "react";
import "./App.css";

import { Header, Main, Footer } from "./components";
import * as MovieService from "./services/fakeMovieService";
import { getGenres, updateGenre } from "./services/fakeGenreService";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: MovieService.getMovies(),
      genres: getGenres(),
    };
    this.deleteFunc = this.deleteFunc.bind(this);
    this.updateLike = this.updateLike.bind(this);
    this.filterGenre = this.filterGenre.bind(this);
    this.updateGenres = this.updateGenres.bind(this);
  }

  deleteFunc(id) {
    const newState = { ...this.state };
    let movieInDb = newState.movies.find((m) => m._id === id);
    newState.movies.splice(newState.movies.indexOf(movieInDb), 1);
    newState.genres = getGenres();
    this.setState(newState);
    return movieInDb;
  }

  updateLike(id) {
    const newState = this.state.movies.map((movie) => {
      if (movie._id === id) {
        const newMovie = { ...movie, like: !movie.like };
        console.log(movie._id, id);
        return newMovie;
      }
      return { ...movie };
    });
    this.setState({ movies: newState });
  }
  updateGenres() {
    const newState = { ...this.state };
    const genreMonitoringObj = {};
    newState.genres = (() => {
      newState.movies.forEach((movie) => {
        if (!genreMonitoringObj[movie.genre.id]) {
          genreMonitoringObj[movie.genre.id] = movie.genre.name;
          newState.genres.push(movie.genre);
        }
      });
      return Object.entries(genreMonitoringObj);
    })();
    this.setState(newState);
  }
  filterGenre(option) {
    const newState = { movies: MovieService.getMovies() };
    if (option) {
      const filteredState = newState.movies.filter(
        (movie) => movie.genre.name === option
      );
      console.log(filteredState.length);
      this.setState({ movies: filteredState });
      return;
    }
    this.setState({ movies: MovieService.getMovies() });
    return;
  }
  
  render() {
    // console.log(this.state.movies);
    return (
      <div className="App" id="App">
        <Header />
        <Main
          movies={this.state.movies}
          genres={this.state.genres}
          deleteFunc={this.deleteFunc}
          updateLike={this.updateLike}
          updateFilter={this.filterGenre}
          updateGenres={this.updateGenres}
        />
        <Footer />
      </div>
    );
  }
}
