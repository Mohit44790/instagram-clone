import React, { useState, useEffect } from "react";
import "./ExplorePage.css"; // Import your CSS file for styling

const ExplorePage = () => {
  const [posts, setPosts] = useState([]);

  // Simulated API request to fetch explore page content
  useEffect(() => {
    // Simulated data (replace with actual API fetch)
    const dummyData = [
      {
        id: 1,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Beautiful scenery",
        likes: 1200,
        comments: 35,
      },
      {
        id: 2,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Delicious food",
        likes: 890,
        comments: 25,
      },
      {
        id: 3,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Adorable pets",
        likes: 2100,
        comments: 42,
      },
      {
        id: 3,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Adorable pets",
        likes: 2100,
        comments: 42,
      },
      {
        id: 3,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Adorable pets",
        likes: 2100,
        comments: 42,
      },
      {
        id: 3,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Adorable pets",
        likes: 2100,
        comments: 42,
      },
      {
        id: 3,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Adorable pets",
        likes: 2100,
        comments: 42,
      },
      {
        id: 3,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Adorable pets",
        likes: 2100,
        comments: 42,
      },
      {
        id: 3,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Adorable pets",
        likes: 2100,
        comments: 42,
      },
      {
        id: 3,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Adorable pets",
        likes: 2100,
        comments: 42,
      },
      {
        id: 3,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Adorable pets",
        likes: 2100,
        comments: 42,
      },
      {
        id: 3,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Adorable pets",
        likes: 2100,
        comments: 42,
      },
      {
        id: 3,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Adorable pets",
        likes: 2100,
        comments: 42,
      },
      {
        id: 1,
        imageUrl:
          "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_640.jpg",
        caption: "Adorable pets",
        likes: 2100,
        comments: 42,
      },
      // Add more posts
    ];

    // Set the posts data
    setPosts(dummyData);
  }, []);

  return (
    <div className="explore-page">
      <div className="post-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <img src={post.imageUrl} alt={post.caption} />
            <div className="post-details">
              {/* <p className="caption">{post.caption}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
