import React, { useState, useEffect } from "react";
import "./ExplorePage.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidenav from "./Sidenav";

const ExplorePage = () => {
  const [posts, setPosts] = useState([]);
  // const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      // Handle unauthorized access here, e.g., redirect to signup page
      return;
    }

    fetch("http://localhost:5000/allposts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result);
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to like a post
  // const likePost = (id) => {
  //   // Implement your like logic here
  // };

  // Function to unlike a post
  // const unlikePost = (id) => {
  //   // Implement your unlike logic here
  // };
  const navigateToUserProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <>
      <Sidenav />
      <div className="explore-page1 ">
        {posts.map((post, index) => (
          <div
            key={index}
            className="card1"
            onClick={() => navigateToUserProfile(post.postedBy._id)}
          >
            <div className="card-header1">
              <div className="card-pic1">
                {/* <img
                src={post.postedBy.Photo ? post.postedBy.Photo : picLink}
                alt=""
              /> */}
                <div className="like-comment-buttons1 ">
                  <button>
                    <span className="material-symbols-outlined">favorite</span>
                    <span>{post.likes.length} Likes</span>
                  </button>
                  <div className="count">
                    <span className="material-symbols-outlined">
                      remove_red_eye
                    </span>
                    <span>{post.views} Views</span>
                  </div>
                  <button>
                    <span className="material-symbols-outlined">
                      chat_bubble_outline
                    </span>
                    <span>{post.comments.length} Comments</span>
                  </button>
                </div>
              </div>
              <h5>
                <Link to={`/profile/${post.postedBy._id}`} className="nameone1">
                  {/* {post.postedBy.name} */}
                </Link>
              </h5>
            </div>

            {/* Display post content and actions (like, comment, etc.) here */}
            <div className="card-image1">
              <img src={post.photo} alt="" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExplorePage;
