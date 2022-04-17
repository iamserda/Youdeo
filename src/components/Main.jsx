import React from "react";
import Table from "./Table";

export default function Main(props) {
  // console.log(props);
  return (
    <main className="container main" role="main">
      <h2>
        There are {props.movies.length || "no"} movie(s) available at the
        moment.
      </h2>
      <Table {...props} />
    </main>
  );
}
