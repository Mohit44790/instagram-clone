import React, { useContext } from "react";
import "./Sidenav.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { LoginContext } from "../context/LoginContext";
import { Link } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import logo from "../img/logo.png";

function Sidenav() {
  const { setModalOpen } = useContext(LoginContext);

  return (
    <div className="sidenav">
      <img className="sidenav__logo" src={logo} alt="Instagram Logo" />

      <div className="sidenav__buttons">
        <Link to="/">
          <button className="sidenav__button">
            <HomeIcon />
            <span>Home</span>
          </button>
        </Link>
        <Link to="/search">
          <button className="sidenav__button">
            <SearchIcon />
            <span>Search</span>
          </button>
        </Link>
        <Link to="/explore">
          <button className="sidenav__button">
            <ExploreIcon />
            <span>Explore</span>
          </button>
        </Link>
        <Link to="/yt">
          <button className="sidenav__button">
            <YouTubeIcon style={{ color: "red" }} />
            <span>Youtube</span>
          </button>
        </Link>
        <Link to="/insta">
          <button className="sidenav__button">
            <SlideshowIcon />
            <span>Reels</span>
          </button>
        </Link>
        <Link to="/message">
          {" "}
          <button className="sidenav__button">
            <ChatIcon />
            <span>Messages</span>
          </button>
        </Link>
        <button className="sidenav__button">
          <FavoriteBorderIcon />
          <span>Notifications</span>
        </button>
        <Link to="/createPost">
          {" "}
          <button className="sidenav__button">
            <AddCircleOutlineIcon />
            <span>Create</span>
          </button>{" "}
        </Link>

        <button className="sidenav__button">
          <MenuIcon />
          <span
            className="sidenav__buttonText"
            onClick={() => setModalOpen(true)}
          >
            More
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidenav;
