import React from "react";
import Row from "./Row";

function Table(props) {
  const { showingNow: movies, deleteFunc, updateLike } = props;

  const movieRows = movies.map((movie, index) => {
    return (
      <Row key={"row-" + index} {...{ movie, deleteFunc, updateLike, index }} />
    );
  });

  return (
    <table
      className="table col-10"
      style={
        !movies.length
          ? { display: "none" }
          : { display: "", minHeight: "400px" }
      }
    >
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col" className="title th">
            Title
          </th>
          <th scope="col" className="genre th">
            Genre
          </th>
          <th scope="col" className="">
            Stock
          </th>
          <th scope="col" className="">
            Rates
          </th>
          <th scope="col" className=""></th>
          <th scope="col" className=""></th>
        </tr>
      </thead>
      <tbody className="container">{movieRows}</tbody>
    </table>
  );
}

export default Table;
