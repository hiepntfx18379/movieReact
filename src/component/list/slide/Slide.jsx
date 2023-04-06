import "./slide.scss";
import React from "react";

const Slide = ({ film, onClickDetail }) => {
  return (
    <div className="boxFilm">
      <div className="listItem">
        <img
          onClick={() => onClickDetail(film.id)}
          className="image"
          src={
            "https://image.tmdb.org/t/p/w220_and_h330_face/" + film.poster_path
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default Slide;
