import { useContext, useState, useEffect } from "react";
import "./newMovie.css";
import storage from "../../firebase";
import axios from "axios";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/context/context";

export default function NewMovie() {
  const { setSelectedPage } = useContext(Context);
  setSelectedPage("Add movie");

  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [titleImg, setTitleImg] = useState(null);
  const [thumbImg, setThumbImg] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [message, setMessage] = useState("");

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const files = [
      { file: img, label: "img" },
      { file: titleImg, label: "titleImg" },
      { file: thumbImg, label: "thumbImg" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ];
    files.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = uploadBytesResumable(
        ref(storage, `/items/${fileName}`),
        item.file
      );
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleSubmit = (e) => {
    const createMovie = async (movie) => {
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
    e.preventDefault();
    createMovie(movie);
    setMessage("Movie successfully created");
    setTimeout(() => setMessage(""), 3000);
  };
  useEffect(() => {
    document.title = "Admin - Add movie";
  });

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newProduct">
          {message && <div className="message">{message}</div>}
          <h1 className="addProductTitle">New Movie</h1>
          <form className="addProductForm">
            <div className="addProductItem">
              <label>Image</label>
              <input
                type="file"
                id="img"
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            <div className="addProductItem">
              <label>Title image</label>
              <input
                type="file"
                id="titleImg"
                name="titleImg"
                onChange={(e) => setTitleImg(e.target.files[0])}
              />
            </div>
            <div className="addProductItem">
              <label>Thumbnail image</label>
              <input
                type="file"
                id="thumbImg"
                name="thumbImg"
                onChange={(e) => setThumbImg(e.target.files[0])}
              />
            </div>
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
              <label>Description</label>
              <input
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Year</label>
              <input
                type="text"
                placeholder="Year"
                name="year"
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
            {/* <div className="addProductItem">
              <label>Duration</label>
              <input
                type="text"
                placeholder="Duration"
                name="duration"
                onChange={handleChange}
              />
            </div> */}
            <div className="addProductItem">
              <label>Limit</label>
              <input
                type="text"
                placeholder="Limit"
                name="limit"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Is Series?</label>
              <select name="isSeries" id="isSeries" onChange={handleChange}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Trailer</label>
              <input
                type="file"
                name="trailer"
                onChange={(e) => setTrailer(e.target.files[0])}
              />
            </div>
            <div className="addProductItem">
              <label>Video</label>
              <input
                type="file"
                name="video"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </div>
            {uploaded === 5 ? (
              <button className="addProductButton" onClick={handleSubmit}>
                Create
              </button>
            ) : (
              <button className="addProductButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
