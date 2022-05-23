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
      filteredView: [],
      showingNow: [],
      genres: [],
      pageSize: 4,
      paginationArr: [],
      lastFilter: null,
      currentPage: 1,
    };
    console.log("Mount Phase: - constructor()");
  }

  // componentDidMount is a lifecycle hook that is executed during the component "Mounting or Mount" Phase.
  componentDidMount() {
    console.log("Mount Phase: - ComponentDidMount()");
    this.setState((oldState) => {
      const moviesApiData = MovieService.getMovies();
      const genresFromMovies = this.getGenres(moviesApiData);
      const newPaginationArr = [];
      const numOfPages = Math.ceil(moviesApiData.length / oldState.pageSize);
      for (let pageNum = 1; pageNum <= numOfPages; pageNum++) {
        newPaginationArr.push(pageNum);
      }
      return {
        ...oldState,
        movies: moviesApiData,
        genres: genresFromMovies,
        showingNow: this.handlePages(
          moviesApiData,
          oldState.pageSize,
          oldState.currentPage
        ),
        paginationArr: newPaginationArr,
      };
    });
  }

  //generate genres from the current list.
  getGenres = (moviesArr) => {
    if (moviesArr.length === 0) return [];
    const genresObj = {};
    moviesArr.forEach((item) => {
      genresObj[item.genre.name] = null;
    });
    const genresArr = Object.keys(genresObj);
    return genresArr;
  };

  // function deletes an item from the state.
  deleteFunc = (id) => {
    let deletedMovieArr;

    this.setState((oldState) => {
      // returns a movie that matches the id provided.
      const movieInDb = oldState.movies.find((m) => m._id === id);
      const movieIndexInState = oldState.movies.indexOf(movieInDb);
      deletedMovieArr = oldState.movies.splice(movieIndexInState, 1);
      return { ...oldState };
    });
    // using this built-in method to update this.state.filteredView
    // in order to update the current view on the browser.
    // this.filterGenres(this.state.lastFilter);
    // this.updatePaginationArr();
    // this.handlePages(this.state.currentPage || 1);
    return deletedMovieArr[0];
  };

  // handling Like "click" events.
  updateLike = (id) => {
    console.log(id);
    let lastFilter = null;
    this.setState((oldState) => {
      const { movies } = oldState;
      lastFilter = oldState.lastFilter;
      const newMovies = movies.map(function (movie) {
        if (movie._id === id) return { ...movie, like: !movie.like };
        return movie;
      });
      return { ...oldState, movies: newMovies };
    });

    // update state
    this.filterGenres(lastFilter);
  };

  filterGenres = (option) => {
    this.setState((oldState) => {
      // when option is falsy.
      const { movies, pageSize } = oldState;
      if (!option)
        return {
          ...oldState,
          filteredView: [...movies],
          showingNow: this.handlePages(movies, pageSize, 1),
          lastFilter: option,
          currentPage: 1,
        };

      //when option is truthy.
      const filteredMoviesArr = oldState.movies.filter(
        (movie) => movie.genre.name === option
      );
      return {
        ...oldState,
        filteredView: filteredMoviesArr,
        showingNow: this.handlePages(movies, pageSize, 1),
        lastFilter: option,
        currentPage: 1,
      };
    });
    this.updatePaginationState();
    this.updatePages(1);
  };

  handlePages = (moviesArr, pageSize, pageNum) => {
    const first = (pageNum - 1) * pageSize;
    const last = first + pageSize;
    const moviesToShow = moviesArr.slice(first, last);

    return moviesToShow;
  };

  updatePages = (pageNum) => {
    this.setState((oldState) => {
      const { pageSize, filteredView } = oldState;
      const showingNow = this.handlePages(
        filteredView.length ? filteredView : oldState.movies,
        pageSize,
        pageNum
      );
      return { ...oldState, showingNow, currentPage: pageNum };
    });
  };
  // method updates the pagination array, which is used to calculate the number of nav-options to show at the bottom of each page once rendered.
  updatePaginationState = () => {
    this.setState((oldState) => {
      const newState = { ...oldState };
      const { filteredView, pageSize } = newState;
      const numOfPages = Math.ceil(filteredView.length / pageSize);
      const localPaginationArr = [];
      for (let pageNum = 1; pageNum <= numOfPages; pageNum++) {
        localPaginationArr.push(pageNum);
      }
      newState.paginationArr = [...localPaginationArr];
      return newState;
    });
  };

  render() {
    // const { movies, filteredView, showingNow } = this.state;
    console.log("Mount Phase - render()");
    // console.log("Movies: ", movies.length);
    // console.log("FilteredView: ", filteredView.length);
    // console.log("ShowingNow: ", showingNow.length);
    // this.filterGenres(this.lastFilter);

    return (
      <div className="App" id="App">
        <Header />
        <Main
          movies={this.state.showingNow}
          genres={this.state.genres}
          currentPage={this.state.currentPage}
          paginationArr={this.state.paginationArr}
          deleteFunc={this.deleteFunc}
          updateLike={this.updateLike}
          filterGenres={this.filterGenres}
          handlePages={this.updatePages}
        />
        <Footer />
      </div>
    );
  }
}
