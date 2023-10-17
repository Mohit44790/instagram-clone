// sampleData.js

const sampleData = [
  {
    _id: "1",
    postedBy: {
      _id: "user1",
      name: "User 1",
      Photo:
        "https://cdn.pixabay.com/photo/2015/05/31/13/10/girl-791686_640.jpg",
    },
    photo: "https://cdn.pixabay.com/photo/2015/05/31/13/10/girl-791686_640.jpg",
    likes: [],
    body: "This is the first post.",
    comments: [
      {
        _id: "comment1",
        postedBy: {
          _id: "user2",
          name: "User 2",
        },
        comment: "Comment 1 for the first post.",
      },
      {
        _id: "comment2",
        postedBy: {
          _id: "user3",
          name: "User 3",
        },
        comment: "Comment 2 for the first post.",
      },
    ],
  },
  {
    _id: "2",
    postedBy: {
      _id: "user2",
      name: "User 2",
      Photo:
        "https://cdn.pixabay.com/photo/2015/05/31/13/10/girl-791686_640.jpg",
    },
    photo: "https://cdn.pixabay.com/photo/2015/05/31/13/10/girl-791686_640.jpg",
    likes: ["user1"],
    body: "This is the second post.",
    comments: [
      {
        _id: "comment3",
        postedBy: {
          _id: "user1",
          name: "User 1",
        },
        comment: "Comment for the second post.",
      },
    ],
  },
  // Add more posts here as needed
];

export default sampleData;
