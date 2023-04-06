import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ItemTop from "./ItemTop";
import "./top_rate.scss";

function Top() {
  const [topRate, setTopRate] = useState([]);
  useEffect(() => {
    async function getTopRate() {
      try {
        let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=67953448bfabbe0612a20f9a29bd901c&language=en-US&page=1`;
        const response = await fetch(url);
        const responseJSON = await response.json();
        setTopRate(responseJSON.results);
      } catch (error) {
        console.log("Failed to fetch top rate list: ", error.message);
      }
    }

    getTopRate();
  }, []);
  return (
    <Fragment>
      <div className="container ">
        <div className="topTitle">Top Rate</div>
        <div className="top_rate">
          {topRate.map((t, i) => (
            <ItemTop key={i} top={t} />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Top;
