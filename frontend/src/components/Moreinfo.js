import React from "react";
import "./Moreinfo.css";
import { Link } from "react-router-dom";

export const Moreinfo = () => {
  return (
    <>
      <h1>mkmkmk</h1>

      <div className="box">
        <p>share</p>
        <p>copy link</p>
        <p>Document</p>
        <p>Profile</p>
        <p>Update</p>
        <p>Remove</p>
        <p>follow</p>
        <Link to="/">
          <p>Cancel</p>
        </Link>
      </div>
    </>
  );
};
