import React from "react";
import Table from "./Table";
import PaginationComponent from "../common/PaginationComponent";
import GenreFilterComponent from "../common/GenreFilterComponent";

export default function Main(props) {
  //properties
  const { showingNow, genres, currentPage, paginationArr, lastFilter } = props;
  // methods()
  const { deleteFunc, updateLike, filterGenres, handlePages } = props;

  return (
    <main className="container main" role="main">
      <h3>
        There are {props.movies.length || "no"} movie(s) available at the
        moment.
        <br />
        {props.movies.length
          ? null
          : "We are always improving, please check back later."}
      </h3>

      <div className="row">
        <GenreFilterComponent {...{ genres, filterGenres, lastFilter }} />
        <Table {...{ showingNow, deleteFunc, updateLike }} />
        <PaginationComponent {...{ currentPage, paginationArr, handlePages }} />
      </div>
    </main>
  );
}
