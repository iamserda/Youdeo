import React from "react";

export default function PaginationComponent(props) {
  
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="/">
            Prev
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="/">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
