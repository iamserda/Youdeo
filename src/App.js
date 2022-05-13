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
      lastFilter: "",
      filteredView: [],
      genres: [],
    };
    this.deleteFunc = this.deleteFunc.bind(this);
    this.updateLike = this.updateLike.bind(this);
  }

  // componentDidMount is a lifecycle hook that is executed during the component "Mounting or Mount" Phase.
  componentDidMount() {
    // console.log("App - ComponentDidMount()");
    this.setState((oldState) => {
      const newState = {
        ...oldState,
        movies: MovieService.getMovies(),
        genres: getGenres(),
      };
      return newState;
    });
    this.filterGenres(this.lastFilter);
  }

  // function deletes an item from the state.
  deleteFunc(id) {
    const newState = { ...this.state };
    // returns a movie that matches the id provided.
    const movieInDb = newState.movies.find((m) => m._id === id);
    const movieIndexInState = newState.movies.indexOf(movieInDb);
    const deletedMovieArr = newState.movies.splice(movieIndexInState, 1);
    this.setState(newState);
    // using this built-in method to update this.state.filteredView
    // in order to update the current view on the browser.
    this.filterGenres(this.state.lastFilter);
  }

  // handling Like "click" events.
  updateLike(id) {
    const { movies, lastFilter } = this.state;
    const newMovies = movies.map(function (movie) {
      if (movie._id === id) return { ...movie, like: !movie.like };
      return movie;
    });

    //SOLUTION 1: Updating the view in the browser.
    // const newFilteredView = filteredView.map(function (movie) {
    //   if (movie._id === id) return { ...movie, like: !movie.like };
    //   return movie;
    // });
    this.setState({
      ...this.state,
      movies: newMovies,
    });

    // using this built-in method to update this.state.filteredView
    // in order to update the current view on the browser.
    this.filterGenres(this.state.lastFilter);
  }

  filterGenres = (option) => {
    this.setState((oldState) => {
      if (!option)
        return {
          ...oldState,
          filteredView: [...oldState.movies],
          lastFilter: option,
        };
      const filteredMoviesArr = oldState.movies.filter(
        (movie) => movie.genre.name === option
      );
      return {
        ...oldState,
        filteredView: filteredMoviesArr,
        lastFilter: option,
      };
    });
  };

  render() {
    return (
      <div className="App" id="App">
        <Header />
        <Main
          movies={this.state.filteredView}
          genres={this.state.genres}
          deleteFunc={this.deleteFunc}
          updateLike={this.updateLike}
          filterGenres={this.filterGenres}
        />
        <Footer />
      </div>
    );
  }
}
