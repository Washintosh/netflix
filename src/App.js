import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import Profile from "./pages/profile/Profile";
import { createContext, useEffect, useReducer, useState } from "react";
const AuthContext = createContext();

const App = () => {
  const authReducerFunction = (state, action) => {
    if (action.type === "LOGIN_START") {
      return {
        user: null,
        isFetching: true,
      };
    }
    if (action.type === "LOGIN_SUCCESS") {
      return {
        user: action.payload,
        isFetching: false,
      };
    }
    if (action.type === "LOGIN_FAILURE") {
      return {
        user: null,
        isFetching: false,
      };
    }
    if (action.type === "LOGOUT") {
      return {
        user: null,
        isFetching: false,
      };
    }
    if (action.type === "UPDATE_START") {
      return {
        ...state,
        isFetching: true,
      };
    }
    if (action.type === "UPDATE_SUCCESS") {
      return {
        user: action.payload,
        isFetching: false,
      };
    }
    if (action.type === "UPDATE_FAILURE") {
      return {
        ...state,
        isFetching: false,
      };
    }
  };
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")),
  };
  const [state, dispatch] = useReducer(authReducerFunction, initialState);
  const user = state.user;
  const isFetching = state.isFetching;

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const [video, setVideo] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        dispatch,
        user,
        isFetching,
        video,
        setVideo,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      <Router>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/movies"
            element={user ? <Home type="movies" /> : <Navigate to="/login" />}
          />
          <Route
            path="/series"
            element={user ? <Home type="series" /> : <Navigate to="/login" />}
          />
          <Route
            path="/watch"
            element={user ? <Watch /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
export { AuthContext };
