import React, { Component } from "react";
import "./App.css";

import { Header, Main, Footer } from "./components";
import * as MovieService from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";

export default class App extends Component {
  // For any class, this is a function that's executed to initialize each instance of the class.
  // In React.js, this is also a Lifecylce hook, during the "Mount" phase.
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      currentView: [],
      genres: getGenres(),
    };
    this.deleteFunc = this.deleteFunc.bind(this);
    this.updateLike = this.updateLike.bind(this);
    this.filterGenre = this.filterGenre.bind(this);
    console.log("App - Constructor()");
  }

  // componentDidMount is a lifecycle hook that is executed during the component "Mounting or Mount" Phase.
  componentDidMount() {
    console.log("App - ComponentDidMount()");
    this.setState((oldState) => {
      const newState = { ...oldState, movies: MovieService.getMovies() };
      return newState;
    });
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

  filterGenre(option) {
    const newState = { movies: MovieService.getMovies() };
    if (option) {
      const filteredState = newState.movies.filter(
        (movie) => movie.genre.name === option
      );
      // console.log(filteredState.length);
      this.setState({ movies: filteredState });
      return;
    }
    this.setState({ movies: MovieService.getMovies() });
    return;
  }

  render() {
    // console.log(this.state.movies);
    console.log("App - Render()");
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
