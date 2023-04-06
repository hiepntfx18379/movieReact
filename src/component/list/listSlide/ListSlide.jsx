import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import React, { Fragment, useRef, useState } from "react";
import { useEffect } from "react";
import MovieDetail from "../../detail/MovieDetail";
import Slide from "../slide/Slide";
import "./listSlide.scss";

const ListSlide = ({ genre }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [filmFollowGenre, setFilmFollowGenre] = useState([]);

  // get data film
  useEffect(() => {
    async function filmGenre() {
      try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=67953448bfabbe0612a20f9a29bd901c&language=en-US&page=1&with_genres=${genre.id}`;
        const response = await fetch(url);
        const responseJSON = await response.json();
        setFilmFollowGenre(responseJSON.results);
      } catch (error) {
        console.log("Failed to fetch genre list: ", error.message);
      }
    }

    filmGenre();
  }, []);

  // slide list film
  const listRef = useRef();
  const handleClick = (derection) => {
    // lay kc tu diem 0 cua slide
    // la ptu chuyen slide rong 50px
    // listSlide nam giua 2btn => -50 left, +50right
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (derection === "left" && slideNumber > 0) {
      // 225 = width + margin = 220 + 5
      listRef.current.style.transform = `translateX(${225 + distance}px`;
      setSlideNumber(slideNumber - 1);
    }
    if (derection === "right" && slideNumber < 5) {
      // 230 = width + margin = 225 + 5
      listRef.current.style.transform = `translateX(${-225 + distance}px`;
      setSlideNumber(slideNumber + 1);
    }
  };

  // lay id film click xem chi tiet
  const [idFilmClick, setIdFilmClick] = useState("");
  const [displayToggle, setDisplayToggle] = useState(false);
  const [check, setCheck] = useState(true);
  const getIdFilm = (idFilm) => {
    setIdFilmClick(idFilm);
    setDisplayToggle(true);
    if (idFilmClick === idFilm) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  return (
    <Fragment>
      <div className="list">
        <span className="listTitle" id={genre.name}>
          {genre.name}
        </span>
        <div className="wrapper">
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            style={{ display: !isMoved && "none" }}
          />
          <div className="containerListFilm" ref={listRef}>
            {/* list boxfilm */}
            {filmFollowGenre.map((film, id) => {
              return <Slide onClickDetail={getIdFilm} key={id} film={film} />;
            })}
          </div>
          <ArrowForwardIosOutlined
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
      {
        <div id="listDetail">
          {filmFollowGenre.map((f, id) => {
            if (f.id === idFilmClick) {
              return (
                check && displayToggle && <MovieDetail key={id} film={f} />
              );
            }
          })}
        </div>
      }
    </Fragment>
  );
};

export default ListSlide;
