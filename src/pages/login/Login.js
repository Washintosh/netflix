import "./login.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://netflix-api-washington.herokuapp.com/api/auth/login",
        {
          email,
          password,
        }
      );
      res.data.user.isAdmin
        ? dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user })
        : setMessage("Permission denied. You are not an admin");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setMessage(JSON.parse(err.request.response).message);
    }
  };

  useEffect(() => {
    document.title = "Admin - Login";
  });

  return (
    <div className="login">
      <h1>Log In</h1>
      <form className="loginForm">
        <input
          type="text"
          placeholder="email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        {message && <span>{message}</span>}
        <button className="loginButton" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
