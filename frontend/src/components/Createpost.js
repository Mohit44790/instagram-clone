import React, { useState, useEffect } from "react";
import "./Createpost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SERVER } from "./constants/server";

export default function Createpost() {
  const [body, setBody] = useState("");
  const [media, setMedia] = useState(null); // To store image or video file
  const [mediaType, setMediaType] = useState(""); // To distinguish between image and video
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    // Saving post to MongoDB
    if (url) {
      fetch(`${SERVER}/createPost`, {
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: body, // Make sure 'body' has a value
          photo: url, // Make sure 'url' has a value
          mediaType, // Include media type in the request
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB("Successfully Posted");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line
  }, [url]);

  // Posting image or video to Cloudinary
  const postDetails = () => {
    console.log(body, media);
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "insta-cloneMK");

    // Check if media is an image or a video and set the upload URL accordingly
    const cloudinaryURL =
      mediaType === "image"
        ? "https://api.cloudinary.com/v1_1/codermk1/image/upload"
        : "https://api.cloudinary.com/v1_1/codermk1/video/upload";

    fetch(cloudinaryURL, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.secure_url); // Use 'secure_url' for Cloudinary video uploads
      })
      .catch((err) => console.log(err));
  };

  // Handle file input change and set media type
  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    setMedia(file);
    if (file) {
      if (file.type.startsWith("image")) {
        setMediaType("image");
      } else if (file.type.startsWith("video")) {
        setMediaType("video");
      }
    }
  };

  return (
    <div className="createPost">
      {/* Header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button
          id="post-btn"
          onClick={() => {
            postDetails();
          }}
        >
          Share
        </button>
      </div>
      {/* Image or Video Preview */}
      <div className="main-div">
        {mediaType === "image" ? (
          <img
            id="output"
            src={media ? URL.createObjectURL(media) : ""}
            alt="img"
          />
        ) : mediaType === "video" ? ( // Use 'video' element for video
          <video id="output" controls>
            <source src={media ? URL.createObjectURL(media) : ""} />
          </video>
        ) : null}
        <input
          type="file"
          accept="image/*, video/*"
          onChange={handleMediaChange}
        />
      </div>
      {/* Details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://w0.peakpx.com/wallpaper/17/411/HD-wallpaper-goku-dragon-ball-8k-anime-anime-anime-dragon-ball-dragon-ball-z-goku-goku-goku.jpg"
              alt=""
            />
          </div>
          <h5>Mohit</h5>
        </div>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
          placeholder="Write a caption...."
        ></textarea>
      </div>
    </div>
  );
}
