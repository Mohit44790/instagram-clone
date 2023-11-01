import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import ProfilePic from "../ProfilePic";
import { toast } from "react-toastify";
const EditProfile = () => {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [pic, setPic] = useState([]);

  const [user, setUser] = useState("");
  const [changePic, setChangePic] = useState(false);
  const notifyB = (msg) => toast.success(msg);

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect(() => {
    fetch(
      `http://localhost:5000/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setPic(result.post);
        setUser(result.user);
        // console.log(pic);
      });
  }, [pic]);
  const [profileInfo, setProfileInfo] = useState({
    userName: "",
    name: "",
    website: "",
    bio: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      profileInfo.userName &&
      (profileInfo.name ||
        profileInfo.website ||
        profileInfo.bio ||
        profileInfo.email ||
        profileInfo.phone)
    ) {
      // Send the `profileInfo` data to the backend for saving.
      // You can use an API request (e.g., fetch or Axios) to send the data to the server.
      // Make sure to update the URL and request method as needed.
      fetch("http://localhost:5000/updateuser", {
        method: "PUT", // Adjust the method as per your API requirements.
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify(profileInfo),
      })
        .then((response) => response.json())
        .then((data) => {
          notifyB("Profile edit Successfully");

          // Handle the response from the server as needed.
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Notify the user that they need to fill in some details before saving.
      notifyB("Please fill in some details before saving.");
    }
  };

  return (
    <div className="edit-profile">
      <div className="edit-profile-header">
        <h2>Edit Profile</h2>
      </div>
      <div className="edit-profile-form">
        <div className="edit-profile-avatar">
          <img src={user.Photo ? user.Photo : picLink} alt="" />
          <button onClick={changeprofile} className="change-avatar-button">
            Change Profile Photo
          </button>
        </div>
        <div className="edit-profile-details">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Your username"
            value={profileInfo.userName}
            onChange={handleChange}
            required
          />
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your full name"
            value={profileInfo.name}
            onChange={handleChange}
          />
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            placeholder="Your website"
            value={profileInfo.website}
            onChange={handleChange}
          />
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Your bio"
            value={profileInfo.bio}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            value={profileInfo.email}
            onChange={handleChange}
          />
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Your phone number"
            value={profileInfo.phone}
            onChange={handleChange}
          />
        </div>
        <button className="save-button" onClick={handleSubmit}>
          Save
        </button>
        {changePic && <ProfilePic changeprofile={changeprofile} />}
      </div>
    </div>
  );
};

export default EditProfile;
