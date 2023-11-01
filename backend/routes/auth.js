const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys");
const requireLogin = require("../middlewares/requireLogin");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signup", (req, res) => {
  const { name, userName, email, password } = req.body;
  if (!name || !email || !userName || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then(
    (savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exist with that email or userName" });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new USER({
          name,
          email,
          userName,
          password: hashedPassword,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "Registered successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password" });
  }
  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          // return res.status(200).json({ message: "Signed in Successfully" })
          const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
          const { _id, name, email, userName } = savedUser;

          res.json({ token, user: { _id, name, email, userName } });

          console.log({ token, user: { _id, name, email, userName } });
        } else {
          return res.status(422).json({ error: "Invalid password" });
        }
      })
      .catch((err) => console.log(err));
  });
});
router.put("/updateuser", requireLogin, (req, res) => {
  const { name, email, userName, password, phone, bio, website } = req.body;

  // Optional: You can add validation to ensure at least one field is being updated.
  // if (!name && !email && !userName && !password) {
  //   return res.status(422).json({ error: "Please provide at least one field to update" });
  // }

  // Create an object to store the updated user data
  const updatedUser = {};

  // Update the fields in the updatedUser object as needed
  if (name) updatedUser.name = name;
  if (email) updatedUser.email = email;
  if (userName) updatedUser.userName = userName;
  if (phone) updatedUser.phone = phone;
  if (bio) updatedUser.bio = bio;
  if (website) updatedUser.website = website;

  // If a new password is provided, hash and update the password
  if (password) {
    bcrypt.hash(password, 12).then((hashedPassword) => {
      updatedUser.password = hashedPassword;

      // Update the user data in the database
      USER.findByIdAndUpdate(
        req.user._id, // Get the authenticated user's ID from the token
        { $set: updatedUser },
        { new: true },
        (err, result) => {
          if (err) {
            return res
              .status(422)
              .json({ error: "Failed to update user data" });
          }
          // You can generate a new JWT token and return updated user data as needed
          const token = jwt.sign({ _id: result._id }, Jwt_secret);
          const { _id, name, email, userName, phone, bio, website } = result;
          res.json({
            token,
            user: { _id, name, email, userName, phone, bio, website },
          });
        }
      );
    });
  } else {
    // Update the user data without changing the password
    USER.findByIdAndUpdate(
      req.user._id,
      { $set: updatedUser },
      { new: true },
      (err, result) => {
        if (err) {
          return res.status(422).json({ error: "Failed to update user data" });
        }
        // You can generate a new JWT token and return updated user data as needed
        const token = jwt.sign({ _id: result._id }, Jwt_secret);
        const { _id, name, email, userName, phone, bio, website } = result;
        res.json({
          token,
          user: { _id, name, email, userName, phone, bio, website },
        });
      }
    );
  }
});

// Fetch new and saved users
router.get("/suggestions", requireLogin, (req, res) => {
  USER.find({ isNewUser: true }).exec((err, newUsers) => {
    if (err) {
      return res.status(422).json({ error: "Failed to fetch new users" });
    }

    USER.find({ isNewUser: false }).exec((err, savedUsers) => {
      if (err) {
        return res.status(422).json({ error: "Failed to fetch saved users" });
      }

      res.json({ newUsers, savedUsers });
    });
  });
});

module.exports = router;
