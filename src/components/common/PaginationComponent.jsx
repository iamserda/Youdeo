import React from "react";

export default function PaginationComponent(props) {
  const { currentPage, paginationArr, handlePages } = props;

  const pagesArr =
    paginationArr.length < 2
      ? null
      : paginationArr.map((item, index) => {
          item = index + 1;
          return (
            <li
              key={"page-item" + item + index}
              className={
                item === currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                className="page-link"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handlePages(item);
                }}
              >
                {item}
              </a>
            </li>
          );
        });
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">{pagesArr}</ul>
    </nav>
  );
}
