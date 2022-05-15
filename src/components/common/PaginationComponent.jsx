import React from "react";

export default function PaginationComponent(props) {
  const paginationArr =
    props.paginationArr.length === 0
      ? []
      : props.paginationArr.map((item, index) => {
          item = index + 1;
          return (
            <li key={"page-item" + item + index} className="page-item">
              <a
                className="page-link"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {item}
              </a>
            </li>
          );
        });
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {paginationArr.length === 0 ? null : paginationArr}
      </ul>
    </nav>
  );
}
