import React from "react";

function GenreFilterComponent(props) {
  const { filterGenres } = props;
  const genresArray = props.genres.map((genre, index) => {
    return (
      <a
        key={genre + index}
        className={"list-group-item list-group-item-action  overflow-hidden"}
        id="list-profile-list"
        data-toggle="list"
        href="#list-profile"
        role="tab"
        aria-controls="profile"
        onClick={(e) => {
          filterGenres(genre);
        }}
      >
        {genre}
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
          onClick={() => filterGenres("")}
        >
          All
        </a>
        {genresArray}
      </div>
    </div>
  );
}

export default GenreFilterComponent;
