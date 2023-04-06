import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";

const Navbar = ({ genre }) => {
  // scroll navbar bg
  const [onScroll, setOnScroll] = useState(false);
  const [keyPass, setKeyPass] = useState("");
  const inputRef = useRef("");
  const navigate = useNavigate();

  //srcoll background of navbar
  window.onscroll = () => {
    setOnScroll(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  //get keyword search
  const handlePasskey = () => {
    navigate("/search", { state: { keyPass } });
  };

  return (
    <div className={onScroll ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <a href="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" />
          </a>
          <div className="menu">
            <span>
              <a href="/top_rate">Top Movies</a>
            </span>
            <span>
              <a href="/trendy"> Top Trendy Movies</a>
            </span>
            <span>My List</span>
          </div>
        </div>
        <div className="right">
          <input
            onChange={(e) => setKeyPass(e.target.value)}
            type="text"
            ref={inputRef}
            className="inputSearch"
            placeholder="Search"
          />
          <Search className="icon btnSearch" onClick={handlePasskey} />
          <span>KID</span>
          <Notifications className="icon" />
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.7PsWAogh67GuINH1j_YjXwHaHa%26pid%3DApi&f=1&ipt=41f2f96034e97d3a6e08d1c414a634ef4a544857c9d9f7924924c5cf9946dd0f&ipo=images" />

          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Setting</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
