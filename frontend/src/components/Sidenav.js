import React, { useContext, useState } from "react";
import "./Sidenav.css";
import Notifications from "./Notifications";
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
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const closeNotificationPanel = () => {
    setIsNotificationOpen(false);
  };
  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here, e.g., clearing user session, redirecting, etc.
    // Example: clear user session
    localStorage.removeItem("jwt"); // Remove the JWT token or perform the necessary actions for user logout
    // Redirect to the login page or perform other actions as needed
    window.location.href = "/signin";
  };

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
          <button className="sidenav__button glowing-button">
            <SlideshowIcon />
            <span>Reels</span>
          </button>
        </Link>
        <Link to="/message">
          {" "}
          <button className="sidenav__button glowing-button">
            <ChatIcon />
            <span>Messages</span>
          </button>
        </Link>
        <button className="sidenav__button" onClick={handleNotificationClick}>
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

        <button className="sidenav__button" onClick={toggleMoreMenu}>
          <MenuIcon />
          <span>More</span>
        </button>
        {isNotificationOpen && (
          <Notifications
            notifications={notifications}
            onClose={closeNotificationPanel}
          />
        )}
        {isMoreMenuOpen && (
          <div className="more-menu">
            <Link to="/settings">
              <button className="more-menu-item">Settings</button>
            </Link>
            <button className="more-menu-item">Your Activity</button>
            <button className="more-menu-item">Saved</button>
            <button className="more-menu-item">Switch Appearance</button>
            <Link to="/report">
              <button className="more-menu-item">Report a Problem</button>
            </Link>
            <button className="more-menu-item">Switch Account</button>
            <button className="more-menu-item" onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidenav;
