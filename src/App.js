import React, { Component } from "react";
import "./App.css";
import { Header, Main, Footer } from "./components";
import * as MovieService from "./services/fakeMovieService";

export default class App extends Component {
  // For any class, this is a function that's executed to initialize each instance of the class.
  // In React.js, this is also a Lifecylce hook, during the "Mount" phase.
  constructor(props) {
    super(props);
    console.log("Mount Phase: - constructor()");

    // initializing State
    this.state = {
      movies: [],
      filteredView: [],
      showingNow: [],
      genres: [],
      pageSize: 1,
      paginationArr: [],
      lastFilter: null,
      currentPage: 1,
    };
  }

  // componentDidMount is a lifecycle hook that is executed during the component "Mounting or Mount" Phase.
  componentDidMount() {
    console.log("Mount Phase: - componentDidMount()");
    this.setState((oldState) => {
      // create a new state obj.
      const newStateObj = {
        ...oldState,
      };

      const { pageSize, currentPage } = oldState;
      // getting data from backend services
      // and setting new State object
      const moviesArr = MovieService.getMovies();
      newStateObj.movies = moviesArr;
      const genresArr = this.getGenres(moviesArr);
      newStateObj.genres = genresArr;
      const paginationArr = this.generatePaginationArr(moviesArr, pageSize);
      newStateObj.paginationArr = paginationArr;
      const showingNowArr = this.generateShowingNowArr(
        moviesArr,
        pageSize,
        currentPage
      );
      newStateObj.showingNow = showingNowArr;

      // overwriting previous state with newState object.
      return newStateObj;
    });

    // updating UI [temporary]
    this.filterGenres(this.state.lastFilter);
    return;
  }

  //generate genres from the current list.
  getGenres = (moviesArr) => {
    if (moviesArr.length === 0) return [];
    const genresObj = {};
    moviesArr.forEach((item) => {
      genresObj[item.genre.name] = null;
    });
    const genresArr = Object.keys(genresObj); // creating an array from the genresObj
    return genresArr;
  };

  // function deletes an item from the state.
  deleteFunc = (id) => {
    this.setState((oldState) => {
      const { movies: oldStateMovies } = oldState;
      // returns a movie(to be deleted) that matches the id provided.
      const movie = oldStateMovies.find((m) => m._id === id);
      const indexOfMovie = oldStateMovies.indexOf(movie); // locate the index of the movie to be deleted.
      oldStateMovies.splice(indexOfMovie, 1); // deleted the movie from the copied Movie Arr.

      // creating a new copy of the movies {may need to revisit this, seems wasteful.}
      const movies = oldStateMovies.map((item) => {
        return { ...item };
      });

      // overwriting State with new movies array.
      return {
        ...oldState,
        movies,
      };
    });

    // forcing updates to reflect item deleted on the View
    this.filterGenres(this.state.lastFilter);
    // this.updatePaginationState();
    // Deciding which page the app should display.
    // What happens when the last item, in the last page is deleted?
    // App should move the user to the previous page.
    const paginationArrLength = this.state.paginationArr.length;
    const theCurrentPageNumber = this.state.currentPage;
    console.log("this.state.paginationArr.length:", paginationArrLength);
    console.log("this.state.currentPage:", this.state.currentPage);
    console.log(this.state.showingNow);
    if (theCurrentPageNumber > paginationArrLength) {
      console.log("option 1");
      this.updatePages(paginationArrLength);
    } else {
      console.log("option 2");
      this.updatePages(theCurrentPageNumber);
    }
  };

  // handling Like "click" events.
  updateLike = (id) => {
    // updating state to reflect new "likes", does NOT update the view...yet!
    this.setState((oldState) => {
      const { movies, pageSize, pageNum } = oldState;
      const newMovies = movies.map(function (movie) {
        if (movie._id === id) return { ...movie, like: !movie.like };
        return movie;
      });
      return { ...oldState, movies: newMovies };
    });

    // updates the view, and keeping the user in the same filter page, and the same page
    this.filterGenres(this.state.lastFilter);
    this.updatePages(this.state.currentPage);
  };

  // filtering based on genres.
  handleFilter = (moviesArr, option) => {
    if (!moviesArr.length) return [];

    const filteredMoviesArr = moviesArr.filter(
      (movie) => movie.genre.name === option
    );

    return filteredMoviesArr;
  };

  filterGenres = (option) => {
    this.setState((oldState) => {
      if (!option)
        return {
          ...oldState,
          filteredView: [...oldState.movies],
          lastFilter: option,
        };

      return {
        ...oldState,
        filteredView: this.handleFilter(oldState.movies, option),
        lastFilter: option,
      };
    });
    this.updatePages(1);
    this.updatePaginationState();
  };

  // updates the array of movies to be displayed for the current page.
  generateShowingNowArr = (moviesArr, pageSize, pageNum) => {
    const first = (pageNum - 1) * pageSize;
    const last = first + pageSize;
    const moviesToShow = moviesArr.slice(first, last);

    return moviesToShow;
  };

  // this method overwrites the state, reflecting current-page, and updates the array of what content to display.
  updatePages = (pageNum) => {
    this.setState((oldState) => {
      const { pageSize, filteredView } = oldState;
      const showingNow = this.generateShowingNowArr(
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
      newState.paginationArr = this.generatePaginationArr(
        filteredView,
        pageSize
      );
      return newState;
    });
  };

  generatePaginationArr = (movieArr, pageSize) => {
    const PaginationArr = [];
    const numOfPages = Math.ceil(movieArr.length / pageSize);
    for (let pageNum = 1; pageNum <= numOfPages; pageNum++) {
      PaginationArr.push(pageNum);
    }
    return PaginationArr;
  };

  render() {
    // const { movies, filteredView, showingNow } = this.state;
    console.log("Mount Phase - render()");
    return (
      <div className="App" id="App">
        <Header />
        <Main
          {...this.state}
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
