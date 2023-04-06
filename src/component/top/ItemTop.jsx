import React from "react";
import { Fragment } from "react";
import "./itemtop.scss";

const ItemTop = ({ top }) => {
  return (
    <div className="imageTop">
      <img
        style={{ margin: "10px 10px 0px", width: "200px" }}
        src={"https://image.tmdb.org/t/p/w200/" + top.backdrop_path}
      />
    </div>
  );
};

export default ItemTop;
