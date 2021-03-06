import React from "react";

function Row(props) {
  // console.log(props);
  const { movie, deleteFunc, index } = props;
  const { title, genre, numberInStock: stock, dailyRentalRate: rate } = movie;
  const { name } = genre;
  return (
    <tr>
      <th scope="row" className="">
        {index + 1}
      </th>
      <td
        className="text-left font-weight-bold"
        style={{ fontSize: "1.125rem" }}
      >
        {title}
      </td>
      <td className="text-left">{name}</td>
      <td
        className="badge badge-primary text-nowrap font-weight-bold"
        style={{ fontSize: "1.125rem", fontWeight: "bold" }}
      >
        {stock}
      </td>
      <td className=" font-weight-bold" style={{ fontSize: "1.125rem" }}>
        ${rate + 0.49}
      </td>
      <td>
        <span
          style={{ fontSize: "1.5rem" }}
          onClick={() => {
            props.updateLike(movie._id);
          }}
        >
          {props.movie.like ? "❤️" : "🤍"}
        </span>
      </td>
      <td>
        <button
          className="btn btn-md btn-danger font-weight-bold"
          onClick={() => deleteFunc(movie._id)}
        >
          remove
        </button>
      </td>
    </tr>
  );
}

export default Row;
