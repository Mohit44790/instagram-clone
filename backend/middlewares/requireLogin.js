const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys");
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Check if the authorization header is present
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in." });
  }

  // Extract the token from the authorization header
  const token = authorization.replace("Bearer ", "");

  // Verify the token
  jwt.verify(token, Jwt_secret, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in." });
    }

    const { _id } = payload;

    // Find the user by ID and attach user data to the request object
    USER.findById(_id)
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ error: "User not found." });
        }
        req.user = userData;
        next();
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error." });
      });
  });
};
