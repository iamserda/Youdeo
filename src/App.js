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
    const newState = { ...this.state };
    let movieInDb = newState.movies.find((m) => m._id === id);
    newState.movies.splice(newState.movies.indexOf(movieInDb), 1);
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
