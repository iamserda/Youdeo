import React from "react";
import Row from "./Row";

function Table(props) {
  const { movies, deleteFunc } = props;
  // console.log(props);
  const movieRows = movies.map((movie, index) => {
    return <Row key={"row-" + index} {...{ movie, deleteFunc, index }} />;
  });

  return (
    <table
      className="table"
      style={!movies.length ? { display: "none" } : { display: "" }}
    >
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col" className="title">
            Title
          </th>
          <th scope="col" className="genre">
            Genre
          </th>
          <th scope="col" className="stock">
            Stock
          </th>
          <th scope="col" className="rate">
            Rate
          </th>
          <th scope="col" className="#">
            Action
          </th>
        </tr>
      </thead>
      <tbody>{movieRows}</tbody>
    </table>
  );
}

export default Table;
