import React, { useState, useContext } from "react";
import "./SignIn.css";
import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";
import useInterval from "../components/hooks/useInterval";

import {
  Component,
  Container,
  AccountBox,
  InputTextField,
  StyledButton,
  ExtraBox,
  StyledText,
} from "./AccountStyles";

import { Box, Typography, InputAdornment, IconButton } from "@mui/material";
import {
  loginImages,
  // instagramLogo,
  displayPhone,
  applestore,
  googlestore,
} from "../components/constants/data";

export default function SignIn() {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useInterval(() => {
    if (activeIndex === loginImages.length - 1) {
      setActiveIndex(-1);
    }

    setActiveIndex((prevState) => prevState + 1);
  }, 2000);

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  // eslint-disable-next-line
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    //checking email
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    }
    // Sending data to server
    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          setUserLogin(true);
          navigate("/");
        }
        console.log(data);
      });
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Component>
      <Container style={{ marginRight: 50, flexDirection: "row" }}>
        <Box style={{ position: "relative" }}>
          <img src={displayPhone} alt="phone" />
          <img
            src={loginImages[activeIndex]}
            alt="insta"
            style={{
              position: "absolute",
              right: 59,
              height: 546,
              top: 24,
            }}
          />
        </Box>
        <Box>
          <AccountBox>
            <img
              src={logo}
              alt="logo"
              style={{ width: 175, margin: "40px 0 40px 0" }}
            />

            <InputTextField
              placeholder="Phone number, username or email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="username"
            />
            <InputTextField
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => handleShowPassword()}>
                    <Typography style={{ fontSize: 14, fontWeight: 600 }}>
                      {showPassword ? "Hide" : "Show"}
                    </Typography>
                  </IconButton>
                </InputAdornment>
              }
            />

            {/* {error && <Error>{error}</Error>} */}

            <StyledButton
              variant="contained"
              onClick={() => {
                postData();
              }}
              value="Sign In"
            >
              Log In
            </StyledButton>

            <Typography style={{ fontSize: 13, color: "#8e8e8e" }}>
              OR
            </Typography>
            <Typography
              style={{
                color: "#385185",
                fontSize: 14,
                margin: 20,
                fontWeight: 600,
              }}
            >
              Log in with Facebook
            </Typography>
            <Typography
              style={{ color: "#00376b", fontSize: 12, marginBottom: 20 }}
            >
              Forgot Password?
            </Typography>
          </AccountBox>
          <AccountBox>
            <Box style={{ padding: "20px 40px" }}>
              <StyledText>
                Don't have an account?{" "}
                <Box
                  component="span"
                  style={{ color: "#0095f6", cursor: "pointer" }}
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </Box>
              </StyledText>
            </Box>
          </AccountBox>
          <ExtraBox>
            <Typography>Get the app.</Typography>
            <Box>
              <img src={applestore} alt="applestore" />
              <img src={googlestore} alt="googlestore" />
            </Box>
          </ExtraBox>
        </Box>
      </Container>
    </Component>
  );
}
