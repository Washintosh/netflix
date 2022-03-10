import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import "./featured.css";
import { useNavigate } from "react-router-dom";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const { setVideo, isSidebarOpen } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(
          `https://netflix-api-washington.herokuapp.com/api/movies/random?type=${type}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setContent(res.data.movie[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);
  return (
    <div className={`${isSidebarOpen ? "blur" : ""} featured`}>
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.titleImg} alt="" />
        <span className="desc">{content.description}</span>
        <div className="buttons">
          <button
            className="play"
            onClick={() => {
              setVideo(content);
              navigate("/watch");
            }}
          >
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
