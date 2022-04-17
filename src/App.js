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
    this.stateUpdator = this.stateUpdator.bind(this);
  }

  stateUpdator(id) {
    const newState = MovieService.deleteMovie(id);
    this.setState(newState);
    
  }

  render() {
    // console.log(this.state.movies);
    return (
      <div className="App" id="App">
        <Header />
        <Main movies={this.state.movies} deleteFunc={this.stateUpdator} />
        <Footer />
      </div>
    );
  }
}
