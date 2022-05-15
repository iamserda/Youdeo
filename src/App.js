import React, { Component } from "react";
import "./App.css";
import { Header, Main, Footer } from "./components";
import * as MovieService from "./services/fakeMovieService";

export default class App extends Component {
  // For any class, this is a function that's executed to initialize each instance of the class.
  // In React.js, this is also a Lifecylce hook, during the "Mount" phase.
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      filteredView: [],
      paginationArr: [],
      lastFilter: null,
    };
    // console.log("Mount Phase: - constructor()");
  }

  // componentDidMount is a lifecycle hook that is executed during the component "Mounting or Mount" Phase.
  componentDidMount() {
    // console.log("Mount Phase: - ComponentDidMount()");

    this.setState((oldState) => {
      const moviesApiData = MovieService.getMovies();
      const genresFromMovies = this.getGenres(moviesApiData);
      return { ...oldState, movies: moviesApiData, genres: genresFromMovies };
    });
    this.filterGenres(this.lastFilter);
  }

  //generate genres from the current list.
  getGenres = (moviesArr) => {
    if (moviesArr.length === 0) return [];
    const genresObj = {};
    moviesArr.forEach((item) => {
      // console.log(item.genre.name);
      genresObj[item.genre.name] = null;
    });
    const genresArr = Object.keys(genresObj);
    return genresArr;
  };

  // function deletes an item from the state.
  deleteFunc = (id) => {
    const newState = { ...this.state };
    // returns a movie that matches the id provided.
    const movieInDb = newState.movies.find((m) => m._id === id);
    const movieIndexInState = newState.movies.indexOf(movieInDb);
    const deletedMovieArr = newState.movies.splice(movieIndexInState, 1);
    this.setState(newState);
    // using this built-in method to update this.state.filteredView
    // in order to update the current view on the browser.
    this.filterGenres(this.state.lastFilter);

    return deletedMovieArr[0];
  };

  // handling Like "click" events.
  updateLike = (id) => {
    const { movies, lastFilter } = this.state;
    const newMovies = movies.map(function (movie) {
      if (movie._id === id) return { ...movie, like: !movie.like };
      return movie;
    });

    // updated state
    this.setState({
      ...this.state,
      movies: newMovies,
    });

    // update state
    this.filterGenres(lastFilter);
  };

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
    // this.handlePages(this.state.startPage, this.state.pageSize);
  };
  handlePages = (pageNum, pageSize) => {};

  updatePaginationArr = () => {};

  render() {
    // console.log("Mount Phase - render()");
    return (
      <div className="App" id="App">
        <Header />
        <Main
          movies={this.state.filteredView}
          genres={this.state.genres}
          paginationArr={this.state.paginationArr}
          deleteFunc={this.deleteFunc}
          updateLike={this.updateLike}
          filterGenres={this.filterGenres}
          handlePages={this.handlePages}
        />
        <Footer />
      </div>
    );
  }
}
