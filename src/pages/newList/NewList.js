import { useContext, useEffect, useState } from "react";
import "./newList.css";
import { getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/context/context";

export default function NewList() {
  const { setSelectedPage } = useContext(Context);
  setSelectedPage("Add list");

  const [list, setList] = useState(null);
  const [message, setMessage] = useState("");

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createList = async (list) => {
      try {
        const res = await axios.post(
          "https://netflix-api-washington.herokuapp.com/api/lists",
          list,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        dispatch({ type: "CREATE_LIST_SUCCESS", payload: res.data.list });
      } catch (err) {
        dispatch({ type: "CREATE_LIST_FAILURE" });
      }
    };
    createList(list);
    setMessage("List successfully created");
    setTimeout(() => setMessage(""), 3000);
    // navigate("/lists");
  };

  useEffect(() => {
    document.title = "Admin - Add list";
  });

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newProduct">
          {message && <div className="message">{message}</div>}
          <h1 className="addProductTitle">New List</h1>
          <form className="addProductForm">
            <div className="formLeft">
              <div className="addProductItem">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="addProductItem">
                <label>Genre</label>
                <input
                  type="text"
                  placeholder="Genre"
                  name="genre"
                  onChange={handleChange}
                />
              </div>
              <div className="addProductItem">
                <label>Type</label>
                <select name="type" onChange={handleChange}>
                  <option>Type</option>
                  <option value="movies">Movie</option>
                  <option value="series">Series</option>
                </select>
              </div>
            </div>
            <div className="formRight">
              <div className="addProductItem">
                <label>Content</label>
                <select
                  multiple
                  name="content"
                  onChange={handleSelect}
                  style={{ height: "280px" }}
                >
                  {movies.map((movie) => (
                    <option key={movie._id} value={movie._id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="addProductButton" onClick={handleSubmit}>
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
