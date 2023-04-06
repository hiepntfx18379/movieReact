import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieDetail from "../../component/detail/MovieDetail";
import ItemTop from "./ItemTop";
import "./top_rate.scss";

const Search = () => {
  // pass keyword from home -> search
  const location = useLocation();
  const [result, setResult] = useState([]);
  const [keyPass, setKeyPass] = useState(location.state.keyPass || "superman");
  const inputRef = useRef();

  const handleClckSearch = () => {
    setKeyPass(inputRef.current.value);
  };

  const reset = () => {
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  useEffect(() => {
    console.log(keyPass);
    async function getTopRate() {
      try {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=67953448bfabbe0612a20f9a29bd901c&query=${keyPass}`;
        const response = await fetch(url);
        const responseJSON = await response.json();
        setResult(responseJSON.results);
      } catch (error) {
        console.log("Failed to fetch search list: ", error.message);
      }
    }

    getTopRate();
  }, [keyPass]);

  // toggle display
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

  // move to view
  const detailRef = useRef();
  const handleMoveToView = () => {
    detailRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="containerSearch">
      <div className="topSearch">
        <a href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" />
        </a>
        <input
          type="text"
          ref={inputRef}
          className="inputSearch"
          placeholder="Search"
        />
        <button className="btnS btnSearchPage" onClick={handleClckSearch}>
          Search
        </button>
        <button className="btnS btnSearchReset" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="topTitle">Result Search</div>
      <div className="top_rateSearch">
        {result.length > 0 ? (
          result.map((t, i) => (
            <ItemTop
              key={i}
              top={t}
              onClickDetail={getIdFilm}
              scrollToView={handleMoveToView}
            />
          ))
        ) : (
          <div className="msgError">
            <h1>Key Word Not Found</h1>
          </div>
        )}
      </div>

      <div id="listDetail" ref={detailRef}>
        {result.map((f, id) => {
          if (f.id === idFilmClick) {
            return check && displayToggle && <MovieDetail key={id} film={f} />;
          }
        })}
      </div>
    </div>
  );
};

export default Search;
