import React, { useState, useEffect } from "react";
import Table from "./Table";
import PaginationComponent from "./PaginationComponent";
import GenreFilterComponent from "./GenreFilterComponent";

export default function Main(props) {
  const { movies, genres, deleteFunc, updateLike, filterGenres } = props;

  return (
    <main className="container main" role="main">
      <h3>
        There are {props.movies.length || "no"} movie(s) available at the
        moment.
      </h3>

      <div className="row">
        <GenreFilterComponent {...{ genres, filterGenres }} />
        <Table {...{ movies, deleteFunc, updateLike }} />
      </div>
      <PaginationComponent movies={movies} />
    </main>
  );
}
