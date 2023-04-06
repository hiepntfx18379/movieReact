import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./featured.scss";
const Featured = ({ genres }) => {
  // auto display image follow genre via selected
  const [image, setImage] = useState("");
  const [changeGenre, setChangeGenre] = useState(35);
  const opRef = useRef();

  const handleChangeBannerFollowGenre = () => {
    setChangeGenre(opRef.current.value);
    console.log(changeGenre);
  };

  useEffect(() => {
    async function filmGenre() {
      try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=67953448bfabbe0612a20f9a29bd901c&language=en-US&page=1&with_genres=${changeGenre}`;
        const response = await fetch(url);
        const responseJSON = await response.json();
        let filmInfo =
          responseJSON.results[
            Math.floor(Math.random() * responseJSON.results.length - 1)
          ];

        setImage(filmInfo);
      } catch (error) {
        console.log("Failed to fetch genre list: ", error.message);
      }
    }

    filmGenre();
  }, [changeGenre]);

  return (
    <div className="featured">
      {genres && (
        <div className="category">
          <span>Movies </span>
          <select
            name="gender"
            id="gender"
            ref={opRef}
            onClick={handleChangeBannerFollowGenre}
          >
            <option>Gener</option>
            {genres.map((g, i) => (
              <option key={i} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* random banner image */}
      {/* khi chon the loai film => lay anh ngau nhien tuong ung */}
      {/* <img src="https://wallpaperaccess.com/full/1925947.jpg" alt="" /> */}
      <img src={`https://image.tmdb.org/t/p/original/${image.backdrop_path}`} />
      <div className="info">
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
