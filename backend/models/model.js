const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Photo: {
    type: String,
    // This field can store the URL of the user's profile picture.
  },
  followers: [{ type: ObjectId, ref: "USER" }],
  following: [{ type: ObjectId, ref: "USER" }],
  // Additional fields for user profile

  website: {
    type: String,
    // You can add validation or default values as needed.
  },
  bio: {
    type: String,
    // You can add validation or default values as needed.
  },
  phone: {
    type: String,
  },
});

mongoose.model("USER", userSchema);
