import React, { useContext } from "react";
import logo from "../img/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function Navbar({ login }) {
  const { setModalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return (
        <>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/createPost">Create Post</Link>
          <Link style={{ marginLeft: "20px" }} to="/followingpost">
            My Following
          </Link>
          <Link to={""}>
            <button className="primaryBtn" onClick={() => setModalOpen(true)}>
              Log Out
            </button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
        </>
      );
    }
  };

  return (
    <Link to="/">
      <div className="navbar">
        {" "}
        <img
          src={logo}
          alt=""
          style={{ width: "10%", margin: "20px 0 10px  0" }}
        />
        <ul className="nav-menu">{loginStatus()}</ul>
      </div>
    </Link>
  );
}
