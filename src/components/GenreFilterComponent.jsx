import React from "react";

function GenreFilterComponent() {
  return (
    <div className="col-2">
      <div className="list-group" id="list-tab" role="tablist">
        <a
          className="list-group-item list-group-item-action active"
          id="list-home-list"
          data-toggle="list"
          href="#list-home"
          role="tab"
          aria-controls="home"
        >
          All
        </a>
        <a
          className="list-group-item list-group-item-action"
          id="list-profile-list"
          data-toggle="list"
          href="#list-profile"
          role="tab"
          aria-controls="profile"
        >
          Action
        </a>
        <a
          className="list-group-item list-group-item-action"
          id="list-messages-list"
          data-toggle="list"
          href="#list-messages"
          role="tab"
          aria-controls="messages"
        >
          Comedy
        </a>
        <a
          className="list-group-item list-group-item-action"
          id="list-settings-list"
          data-toggle="list"
          href="#list-settings"
          role="tab"
          aria-controls="settings"
        >
          Thriller
        </a>
      </div>
    </div>
  );
}

export default GenreFilterComponent;
