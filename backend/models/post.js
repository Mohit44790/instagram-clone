const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    photo: String, // Store the URL of the image
    video: String, // Store the URL of the video
    likes: [{ type: ObjectId, ref: "USER" }],
    comments: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: "USER" },
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: "USER",
    },
  },
  { timestamps: true }
);

mongoose.model("POST", postSchema);
