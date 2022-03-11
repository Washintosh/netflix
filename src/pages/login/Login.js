import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import "./login.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, isFetching } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://netflix-api-washington.herokuapp.com/api/auth/login",
        {
          email,
          password,
        }
      );
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.user,
      });
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: JSON.parse(err.request.response).message,
      });
      setMessage(JSON.parse(err.request.response).message); //IMPORTANT
    }
  };
  useEffect(() => {
    document.title = "Netflix Login";
  }, []);

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          {message && <div className="messageDiv">{message}</div>}
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="loginButton"
            onClick={handleLogin}
            disabled={isFetching}
          >
            {isFetching ? <CircularProgress size="20px" /> : "Sign In"}
          </button>
          <span>
            New to Netflix?{" "}
            <Link to="/register" className="registerBtn">
              Sign up now.
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
