import React from "react";

function Row(props) {
  const { movie, deleteFunc, index } = props;
  const { title, genre, numberInStock: stock, dailyRentalRate: rate } = movie;
  const { name } = genre;
  return (
    <tr>
      <th scope="row" className="">
        {index + 1}
      </th>
      <td className="text-left">{title}</td>
      <td className="text-left">{name}</td>
      <td
        className="badge badge-primary text-nowrap font-weight-bold"
        style={{ fontSize: "1.125rem" }}
      >
        {stock}
      </td>
      <td className=" font-weight-bold" style={{ fontSize: "1.125rem" }}>
        {rate}
      </td>
      <td>
        <button
          className="btn btn-md btn-danger font-weight-bold"
          onClick={() => {
            deleteFunc(movie._id);
          }}
        >
          remove
        </button>
      </td>
    </tr>
  );
}

export default Row;
