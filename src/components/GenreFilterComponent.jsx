import React, { Component, useState } from "react";

function GenreFilterComponent(props) {
  const { updateFilter, updateGenre } = props;
  const genres = props.genres.map((genre, index) => {
    return (
      <a
        key={genre.name + index}
        className="list-group-item list-group-item-action  overflow-hidden"
        id="list-profile-list"
        data-toggle="list"
        href="#list-profile"
        role="tab"
        aria-controls="profile"
        onClick={() => {
          updateFilter(genre.name);
          updateGenre();
        }}
      >
        {genre.name}
      </a>
    );
  });

  return (
    <div className="col-2">
      <div className="list-group" id="list-tab" role="tablist">
        <a
          className="list-group-item list-group-item-action overflow-hidden active"
          id="list-home-list"
          data-toggle="list"
          href="#list-home"
          role="tab"
          aria-controls="home"
          onClick={() => updateFilter("")}
        >
          All
        </a>
        {genres}
      </div>
    </div>
  );
}

export default GenreFilterComponent;
