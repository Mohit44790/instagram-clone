import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
import ProfilePic from "./ProfilePic";
import Sidenav from "./Sidenav";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SERVER } from "./constants/server";

export default function Profie() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect(() => {
    fetch(`${SERVER}/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setPic(result.post);
        setUser(result.user);
        // console.log(pic);
      });
  }, [pic]);

  return (
    <>
      <Sidenav />
      <div className="profile">
        {/* Profile frame */}
        <div className="profile-frame">
          {/* profile-pic */}
          <div className="profile-pic">
            <img
              onClick={changeprofile}
              src={user.Photo ? user.Photo : picLink}
              alt=""
            />
          </div>
          {/* profile-data */}
          <div className="pofile-data">
            <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
            <p className="verify">
              <span className="material-symbols-outlined">new_releases</span>
            </p>
            <div className="edite2">
              <Link to="/profile-edit">
                {" "}
                <button className="edit-button" onClick={changeprofile}>
                  Edit Profile
                </button>
              </Link>
              <button className="View-button" o>
                View Archive
              </button>
              <button className="tools-button">Ad tools</button>
              <FiSettings />
            </div>

            <div className="profile-info" style={{ display: "flex" }}>
              <p>{pic ? pic.length : "0"} posts</p>
              <p>{user.followers ? user.followers.length : "0"} followers</p>
              <p>{user.following ? user.following.length : "0"} following</p>
            </div>
          </div>
        </div>
        <p className="plusicon">
          <span className="material-symbols-outlined circle">add_circle</span>
        </p>
        <div className="postTags">
          <hr
            style={{
              width: "100%",

              opacity: "0.8",
              margin: "8px auto",
            }}
          />
          <li className="posts">
            <ul className="ul1">POSTS</ul>
            <ul className="ul1">REELS</ul>
            <ul className="ul1">SAVED</ul>
            <ul className="ul1">TAGGED</ul>
          </li>
        </div>

        {/* Gallery */}
        <div className="gallery">
          {pic.map((pics) => {
            return (
              <img
                key={pics._id}
                src={pics.photo}
                alt=""
                onClick={() => {
                  toggleDetails(pics);
                }}
                className="item"
              ></img>
            );
          })}
        </div>
        {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
        {changePic && <ProfilePic changeprofile={changeprofile} />}
      </div>
    </>
  );
}
