import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import MovieList from "./pages/movieList/MovieList";
import NewMovie from "./pages/newMovie/NewMovie";
import Movie from "./pages/movie/Movie";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/users"
          element={user ? <UserList /> : <Navigate to="/login" />}
        />
        <Route
          path="/user/:userId"
          element={user ? <User /> : <Navigate to="/login" />}
        />
        <Route
          path="/newUser"
          element={user ? <NewUser /> : <Navigate to="/login" />}
        />
        <Route
          path="/movies"
          element={user ? <MovieList /> : <Navigate to="/login" />}
        />
        <Route
          path="/movie/:movieId"
          element={user ? <Movie /> : <Navigate to="/login" />}
        />
        <Route
          path="/newMovie"
          element={user ? <NewMovie /> : <Navigate to="/login" />}
        />
        <Route
          path="/lists"
          element={user ? <ListList /> : <Navigate to="/login" />}
        />
        <Route
          path="/list/:listId"
          element={user ? <List /> : <Navigate to="/login" />}
        />
        <Route
          path="/newlist"
          element={user ? <NewList /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<h1>NOT FOUND</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
