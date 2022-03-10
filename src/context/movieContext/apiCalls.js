import axios from "axios";

export const getMovies = async (dispatch) => {
  try {
    const res = await axios.get(
      "https://netflix-api-washington.herokuapp.com/api/movies",
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    dispatch({ type: "GET_MOVIES_SUCCESS", payload: res.data.movies });
  } catch (err) {
    console.log(err);
    dispatch({ type: "GET_MOVIES_FAILURE" });
  }
};

//create
export const createMovie = async (movie, dispatch) => {
  try {
    const res = await axios.post(
      "https://netflix-api-washington.herokuapp.com/api/movies",
      movie,
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    dispatch({ type: "CREATE_MOVIE_SUCCESS", payload: res.data.movie });
  } catch (err) {
    dispatch({ type: "CREATE_MOVIE_FAILURE" });
  }
};

//delete
export const deleteMovie = async (id, dispatch) => {
  try {
    await axios.delete(
      `https://netflix-api-washington.herokuapp.com/api/movies/${id}`,
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    dispatch({ type: "DELETE_MOVIE_SUCCESS", payload: id });
  } catch (err) {
    dispatch({ type: "DELETE_MOVIE_FAILURE" });
  }
};
