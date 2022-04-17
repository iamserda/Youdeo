import React from "react";

export default function Header(props) {
  const styleObj = {
    nav: {
      className: "navbar navbar-expand-md navbar-dark bg-dark fixed-top",
    },
    navBrand: {
      className: "navbar-brand App-logo .App-link",
    },
  };
  return (
    <nav className={styleObj.nav.className} id="Footer">
      <a className={styleObj.navBrand.className} href="/">
        Y
      </a>
      <div className="collapse navbar-collapse">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
