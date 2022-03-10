import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import "./register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const emailRef = useRef();
  // const passwordRef = useRef();
  // const usernameRef = useRef();

  const { dispatch } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    // setPassword(passwordRef.current.value);
    // setUsername(usernameRef.current.value);
    try {
      await axios.post(
        "https://netflix-api-washington.herokuapp.com/api/auth/register",
        {
          email,
          username,
          password,
        }
      );
      const res = await axios.post(
        "https://netflix-api-washington.herokuapp.com/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log("res", res.data);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.user,
      });
    } catch (err) {
      setMessage(JSON.parse(err.request.response).message);
      if (
        JSON.parse(err.request.response).message.endsWith(
          "is already being used as email, please choose another."
        )
      )
        setEmail("");
    }
  };

  useEffect(() => {
    document.title = "Netflix Register";
  }, []);

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link className="loginButton" to="/login">
            Sign In
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input
              type="email"
              placeholder="email address"
              ref={emailRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleStart();
              }}
            />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
        {message && <div className="messageDiv">{message}</div>}
      </div>
    </div>
  );
}
