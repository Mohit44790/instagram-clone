import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profie from "./components/Profie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Createpost from "./components/Createpost";
import { LoginContext } from "./context/LoginContext";
import Modal from "./components/Modal";
import UserProfie from "./components/UserProfile";
import MyFolliwngPost from "./components/MyFollowingPost";
import { Moreinfo } from "./components/Moreinfo";
import { Instareels } from "./components/InstaReels/Instareels";
import { Ytvideo } from "./components/youtube/Ytvideo";
import MessagingPage from "./components/MessagingPage";
import ExplorePage from "./components/ExplorePage";
import SearchBar from "./components/SearchBar";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleSearch = (query) => {
    console.log("Search query:", query);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
          <Navbar login={userLogin} />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route exact path="/profile" element={<Profie />}></Route>
            <Route path="/createPost" element={<Createpost />}></Route>
            <Route path="/profile/:userid" element={<UserProfie />}></Route>
            <Route path="/followingpost" element={<MyFolliwngPost />}></Route>
            <Route path="/moreinfo" element={<Moreinfo />}></Route>
            <Route path="/insta" element={<Instareels />}></Route>
            <Route path="/yt" element={<Ytvideo />}></Route>
            <Route path="/message" element={<MessagingPage />}></Route>
            <Route path="/explore" element={<ExplorePage />}></Route>
            <Route
              path="/search"
              element={<SearchBar onSearch={handleSearch} />}
            ></Route>
          </Routes>
          <ToastContainer theme="dark" />

          {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
