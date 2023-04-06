import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./moviedetail.scss";

const MovieDetail = ({ film }) => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const getKeyVideo = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3//movie/${film.id}/videos?api_key=67953448bfabbe0612a20f9a29bd901c`
      );
      const resJSON = await response.json();
      const trailerVideo = resJSON.results.filter((v) => v.type === "Trailer");
      setVideo(trailerVideo);
    };

    getKeyVideo();
  }, []);

  return (
    <div className="infoMovie">
      <div className="detailMovie">
        <h2>{film.title}</h2>
        <hr />
        <div className="dubut">
          <div className="date">Release Date: {film.release_date}</div>
          <div className="vote">Vote: {film.vote_average}</div>
        </div>
        <div className="desc">{film.overview}</div>
      </div>
      <div className="video">
        {video.length > 0 ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${video[0].key}`}
          ></iframe>
        ) : (
          <img src={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`} />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
