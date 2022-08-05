import React from "react";
import "./registration.css";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Registration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const enteredEmail = useRef();
  const enteredPassword = useRef();

  // PrevState-i soruw
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const emailInput = enteredEmail.current.value;
    const passwordInput = enteredPassword.current.value;

    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_zzTewZaJJQRysu6nw6MLrGt8jl1p4vo",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailInput,
            password: passwordInput,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          registered();
        } else {
          return res.json().then((data) => {
            console.log(data);
          });
        }
      });
    }
  };

  const registered = () => {
    const popup = document.getElementById("pop-up-div");
    const emailValue = document.getElementById("email");
    const passwordValue = document.getElementById("password");
    const popupOverlay = document.getElementById("pop-up-overlay");
    const closeButton = document.getElementById("close-button");
    closeButton.addEventListener("click", () => {
      popup.style.display = "none";
      popupOverlay.style.display = "none";
    });
    popup.style.display = "flex";
    popupOverlay.style.display = "block";
    emailValue.value = "";
    passwordValue.value = "";
  };

  return (
    <>
      <div id="pop-up-overlay" className="pop-up-overlay">
        <div id="pop-up-div" className="pop-up">
          <h2>User Registered Successfuly</h2>
          <button id="close-button">
            {" "}
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
        </div>
      </div>

      <div className="signup-container">
        <div className="sign-img"></div>
        <form className="register-form" onSubmit={submitHandler}>
          <h1 style={{ marginBottom: "20px" }}>Sign Up</h1>
          <div className="email">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" ref={enteredEmail} />
          </div>
          <div className="password">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={enteredPassword}
            />
          </div>
          <div className="button">
            <button
              onClick={switchAuthModeHandler}
              type="submit"
              className="registr"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
     
    </>
  );
};

export default Registration;
