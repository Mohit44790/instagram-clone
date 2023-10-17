//frontend code
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (query.trim() === "") {
      setShowSuggestions(false);
      return;
    }

    // Simulate suggestions based on the input value (you can replace this with actual suggestions)
    const suggestedItems = getSuggestions(query);
    setSuggestions(suggestedItems);
    setShowSuggestions(true);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      fetch("http://localhost:5000/search-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ query }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok (HTTP ${response.status})`
            );
          }
          return response.json();
        })
        .then((data) => {
          setSearchResults(data.users);
        })
        .catch((error) => {
          console.error("Error searching users:", error.message);
        });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch();
    setShowSuggestions(false); // Hide suggestions after clicking
    navigate(`/profile/${suggestion}`);
  };

  // Helper function to simulate suggestions (replace with your actual suggestion logic)
  const getSuggestions = (inputValue) => {
    // You can replace this with actual user data from your backend
    const users = ["", "", " "];
    return users.filter((user) =>
      user.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {showSuggestions && (
        <div className="suggestionsearch">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      <div className="search-results">
        {searchResults.map((user) => (
          <Link key={user._id} to={`/profile/${user._id}`}>
            {user.email}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
