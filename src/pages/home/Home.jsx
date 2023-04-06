import React, { useState, useEffect } from "react";
import Featured from "../../component/feature/Featured";
import ListSlide from "../../component/list/listSlide/ListSlide";
import Navbar from "../../component/navbar/Navbar";
import "./home.scss";

const Home = () => {
  const [genreArr, setGenreArr] = useState([]);
  // get data genre
  useEffect(() => {
    async function fetchGenreList() {
      try {
        const requestUrl =
          "https://api.themoviedb.org/3/genre/movie/list?api_key=67953448bfabbe0612a20f9a29bd901c&language=en-US";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const { genres } = responseJSON;
        setGenreArr(genres);
      } catch (error) {
        console.log("Failed to fetch genre list: ", error.message);
      }
    }

    fetchGenreList();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <Featured genres={genreArr} />
      {/* lay 1 mang -> render */}
      {genreArr.length > 0 &&
        genreArr.map((genre, id) => <ListSlide key={id} genre={genre} />)}
    </div>
  );
};

export default Home;
