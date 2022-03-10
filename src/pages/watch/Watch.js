import { ArrowBackOutlined } from "@material-ui/icons";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import "./watch.css";

export default function Watch() {
  const { video } = useContext(AuthContext);
  useEffect(() => {
    document.title = video.title;
  }, []);
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay controls src={video.video} />
    </div>
  );
}
