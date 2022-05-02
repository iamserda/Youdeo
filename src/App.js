import React, { Component } from "react";
import "./App.css";

import { Header, Main, Footer } from "./components";
import * as MovieService from "./services/fakeMovieService";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: MovieService.getMovies(),
    };
    this.deleteFunc = this.deleteFunc.bind(this);
    this.updateLike = this.updateLike.bind(this);
  }

  deleteFunc(id) {
    const newState = MovieService.deleteMovie(id);
    this.setState(newState);
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

  render() {
    // console.log(this.state.movies);
    return (
      <div className="App" id="App">
        <Header />
        <Main
          movies={this.state.movies}
          deleteFunc={this.deleteFunc}
          updateLike={this.updateLike}
        />
        <Footer />
      </div>
    );
  }
}
