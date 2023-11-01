import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Suggestions from "./Suggestions";
import Sidenav from "./Sidenav";
import Stories from "./stories/Stories";

export default function Home() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(false); // State for share options

  // Toast functions
  // const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup");
    }

    // Fetching all posts
    fetch("http://localhost:5000/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setData(result);
      })

      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);
  // to show and hide comments
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
    }
  };

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          // if (posts._id == result._id) {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };
  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          // if (posts._id == result._id) {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  // function to make comment
  const makeComment = (text, id) => {
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          // if (posts._id == result._id) {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("");
        notifyB("Comment posted");
        console.log(result);
      });
  };

  // Function to toggle the share options
  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };
  // Function to handle sharing
  const handleShare = (option) => {
    // Implement logic for each share option here
    if (option === "status") {
      // Share as a status
      // Add your code here
    } else if (option === "users") {
      // Share with specific users
      // Add your code here
    } else if (option === "whatsapp") {
      const postLink = "https://web.whatsapp.com/"; // Replace with the actual post link
      const message = `Check out this post: ${postLink}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      notifyB("Shared via WhatsApp");
    } else if (option === "mail") {
      const email = prompt("Enter an email address:");
      if (email) {
        // Send an email to the specified address
        const emailContent = "https://www.google.com/gmail/about/"; // Replace with the actual post link
        window.location.href = `mailto:${email}?subject=Check out this post&body=${emailContent}`;
        notifyB("Email sent successfully");
      }
    }
    // You can add more share options and their respective logic.
    // After sharing, you can close the share options:
    setShowShareOptions(false);
  };

  return (
    <>
      <div className="homepage__navWraper">
        <Sidenav />
      </div>
      <div className="timeline__right">
        <Suggestions />
      </div>

      <div className="home">
        {/* card */}
        <Stories />
        {data.map((posts, index) => {
          return (
            <div key={index} className="card">
              {/* card header */}
              <div className="card-header">
                <div className="card-pic">
                  <img
                    src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink}
                    alt=""
                  />
                </div>
                <h5>
                  <Link
                    to={`/profile/${posts.postedBy._id}`}
                    className="nameone"
                  >
                    {posts.postedBy.name}
                  </Link>
                </h5>
              </div>
              <p className="sharebutton">
                <Link to="/moreinfo">
                  <span className="material-symbols-outlined">more_horiz</span>
                </Link>
              </p>
              {/* card image */}
              <div className="card-image">
                <img src={posts.photo} alt="" />
              </div>

              {/* card content */}
              <div className="card-content">
                <ul className="ul">
                  {posts.likes.includes(
                    JSON.parse(localStorage.getItem("user"))._id
                  ) ? (
                    <span
                      className="material-symbols-outlined material-symbols-outlined-red"
                      onClick={() => {
                        unlikePost(posts._id);
                      }}
                    >
                      favorite
                    </span>
                  ) : (
                    <span
                      className="material-symbols-outlined"
                      onClick={() => {
                        likePost(posts._id);
                      }}
                    >
                      favorite
                    </span>
                  )}

                  <li>
                    <p
                      style={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => {
                        toggleComment(posts);
                      }}
                    >
                      <span className="material-symbols-outlined">chat</span>
                    </p>
                  </li>
                  <li>
                    <p className="share-button">
                      <span
                        style={{ fontWeight: "bold", cursor: "pointer" }}
                        onClick={() => {
                          toggleShareOptions(); // Add this line to toggle the share options
                        }}
                      >
                        <span className="material-symbols-outlined">send</span>
                      </span>
                    </p>
                  </li>
                </ul>
                <p className="bookmark">
                  <span className="material-symbols-outlined">bookmark</span>
                </p>
                <div className="postscomment">
                  <p>{posts.likes.length} Likes</p>
                  <p>
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {posts.postedBy.name}:
                    </span>{" "}
                    {posts.body}{" "}
                  </p>
                  <p
                    style={{
                      cursor: "pointer",
                      color: "gray",
                      fontSize: "13px",
                    }}
                    onClick={() => {
                      toggleComment(posts);
                    }}
                  >
                    View all comments
                  </p>
                </div>
              </div>

              {/* add Comment */}
              <div className="add-comment">
                <input
                  style={{ fontSize: "14px" }}
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, posts._id);
                  }}
                >
                  <span className="material-symbols-outlined">mood</span>
                </button>
              </div>
            </div>
          );
        })}
        {/* Share options */}
        {showShareOptions && (
          <div className="share-options">
            <div onClick={() => handleShare("status")}>Share as Status</div>
            <div onClick={() => handleShare("users")}>Share with Users</div>
            <div onClick={() => handleShare("whatsapp")}>
              Share via WhatsApp
            </div>
            <div onClick={() => handleShare("mail")}>Share via Email</div>
          </div>
        )}
        {/* show Comment */}
        {show && (
          <div className="showComment">
            <div className="container">
              <div className="postPic">
                <img src={item.photo} alt="" />
              </div>
              <div className="details">
                {/* card header */}
                <div
                  className="card-header"
                  style={{ borderBottom: "1px solid #00000029" }}
                >
                  <div className="card-pic">
                    <img src={item.photo} alt="" />
                  </div>
                  <h5>{item.postedBy.name}</h5>
                </div>

                {/* commentSection */}
                <div
                  className="comment-section"
                  style={{ borderBottom: "1px solid #00000029" }}
                >
                  {item.comments.map((comment) => {
                    return (
                      <>
                        <div className="comm">
                          <img src={item.photo} alt="" />
                        </div>
                        <p className="commp">
                          <span
                            className="commenter"
                            style={{ fontWeight: "bolder" }}
                          >
                            {comment.postedBy.name}{" "}
                          </span>
                          <span className="commentText">{comment.comment}</span>
                        </p>
                      </>
                    );
                  })}
                </div>

                {/* card content */}
                <div className="card-content">
                  <p>{item.likes.length} Likes</p>
                  <p>{item.body}</p>
                </div>

                {/* add Comment */}
                <div className="add-comment">
                  <span className="material-symbols-outlined">mood</span>
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <button
                    className="comment"
                    onClick={() => {
                      makeComment(comment, item._id);
                      toggleComment();
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
            <div
              className="close-comment"
              onClick={() => {
                toggleComment();
              }}
            >
              <span className="material-symbols-outlined material-symbols-outlined-comment">
                close
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
