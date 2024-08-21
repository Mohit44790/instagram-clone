import React, { useEffect, useState } from "react";
import "./Suggestions.css";
import { Link } from "react-router-dom";
import { SERVER } from "./constants/server";

function Suggestions() {
  const [newUsers, setNewUsers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [userFollowState, setUserFollowState] = useState({});

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Load the follow state from local storage
    const storedFollowState = localStorage.getItem("followState");
    if (storedFollowState) {
      setUserFollowState(JSON.parse(storedFollowState));
    }

    // Make an API request to fetch new and saved users
    fetch(`${SERVER}/suggestions`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setNewUsers(result.newUsers);
      })
      .catch((err) => console.log(err));
  }, []);

  const displayMoreUsers = () => {
    setShowMore(!showMore);
  };

  const updateFollowState = (userId, isFollowing) => {
    // Update the follow state in local storage
    const updatedFollowState = { ...userFollowState, [userId]: isFollowing };
    setUserFollowState(updatedFollowState);
    localStorage.setItem("followState", JSON.stringify(updatedFollowState));
  };

  const followUser = (userId) => {
    fetch(`${SERVER}/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updateFollowState(userId, true); // Update follow state and save it
      });
  };

  const unfollowUser = (userId) => {
    fetch(`${SERVER}/unfollow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        updateFollowState(userId, false); // Update follow state and save it
      });
  };

  return (
    <div className="suggestions">
      <div className="suggestions__title">
        Suggestions for you <span>see All</span>
      </div>
      <div className="suggestions__usernames">
        <ul className="usernames-list">
          {newUsers.slice(0, showMore ? newUsers.length : 4).map((user) => (
            <li key={user._id} className="suggestions__username">
              <div className="username__left">
                <span className="avatar">
                  {" "}
                  <img
                    src={
                      user.Photo ||
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
                    } // Use a default profile pic if profilePic is not available
                    alt=""
                  />
                </span>
                <div className="username__info">
                  <Link to={`/profile/${user._id}`}>
                    <span className="username">{user.name}</span>
                  </Link>
                  <span className="relation">Suggested for you</span>
                </div>
              </div>
              <button
                className="follow__button "
                onClick={() => {
                  if (userFollowState[user._id]) {
                    unfollowUser(user._id);
                  } else {
                    followUser(user._id);
                  }
                }}
              >
                {userFollowState[user._id] ? "Unfollow" : "Follow"}
              </button>
            </li>
          ))}
        </ul>
        {newUsers.length > 4 && (
          <button className="more__button" onClick={displayMoreUsers}>
            {showMore ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
      {/* <div className="instagram-meta">
        <p>© 2023 INSTAGRAM FROM META</p>
      </div> */}
      <footer className="footer-suggestion">
        <p>
          About &bull; Help &bull; API &bull; Jobs &bull; Privacy &bull; Terms
          &bull; Location &bull; Language &bull; Meta verified &bull; Hashtags
          &bull; India
        </p>

        <p>&copy; {currentYear} INSTAGRAM FROM META</p>
      </footer>
    </div>
  );
}

export default Suggestions;
