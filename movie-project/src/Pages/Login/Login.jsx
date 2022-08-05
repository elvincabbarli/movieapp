import React from "react";
import "./login.css";
import { useState, useRef , useContext } from "react";
import AuthContext from "../../store/auth-context";
import {useNavigate} from 'react-router-dom'


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  let authCtx = useContext(AuthContext)
  const navigate = useNavigate()

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
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_zzTewZaJJQRysu6nw6MLrGt8jl1p4vo",
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
          return res.json()
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication Error'
            throw new Error(errorMessage)
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken)
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  };



  return (
    <div className="login-container">
    <div className="login-img"></div>
      <form className="login-form" onSubmit={submitHandler}>
        <h1 style={{ marginBottom: "20px" }}>Sign In</h1>
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
            className="login"
          >
            Sign In
          </button>
        </div>
      </form>
      <img src="./1.png" alt="" />
    </div>
  );
};

export default Login;
