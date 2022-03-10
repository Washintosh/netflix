import "./movieList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { Context } from "../../context/context/context";

export default function MovieList() {
  const { setSelectedPage } = useContext(Context);
  setSelectedPage("Movies");

  const { movies, dispatch, setVideo } = useContext(MovieContext);

  useEffect(() => {
    const getMovies = async () => {
      dispatch({ type: "GET_MOVIES_START" });
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
    getMovies();
  }, [dispatch]);

  useEffect(() => {
    document.title = "Admin - Movies";
  });

  const handleDelete = (id) => {
    const deleteMovie = async (id) => {
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
    deleteMovie(id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: `/movie/${params.row._id}` }}
              onClick={() => setVideo(params.row)}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="productList">
          <DataGrid
            rows={movies}
            columns={columns}
            disableSelectionOnClick
            pageSize={8}
            checkboxSelection
            rowsPerPageOptions={[8]}
            getRowId={(r) => r._id}
          />
        </div>
      </div>
    </>
  );
}
