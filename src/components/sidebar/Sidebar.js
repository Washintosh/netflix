import { useContext } from "react";
import { AuthContext } from "../../App";
import { Notifications, Search } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import "./sidebar.css";
const Sidebar = () => {
  const { isSidebarOpen, dispatch, setIsSidebarOpen, user } =
    useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div
      className={`${
        isSidebarOpen ? "sidebarContainer show" : "sidebarContainer"
      }`}
    >
      <div className={`sidebar`}>
        <span> </span>
        <Link
          to="/series"
          className="navbarmainLinks"
          onClick={() => setIsSidebarOpen(false)}
        >
          Series
        </Link>
        <Link
          to="/movies"
          className="navbarmainLinks"
          onClick={() => setIsSidebarOpen(false)}
        >
          Movies
        </Link>
        <Search className="icon" />
        <span>KID</span>
        <img
          src={`${JSON.parse(localStorage.getItem("user")).profilePic}`}
          alt=""
          className="img"
          onClick={() => {
            navigate(`/profile/${user._id}`);
            setIsSidebarOpen(false);
          }}
        />
        <Notifications className="icon" />
        <span>Settings</span>
        <span
          className="btn"
          onClick={() => {
            dispatch({
              type: "LOGOUT",
            });
            setIsSidebarOpen(false);
          }}
        >
          <LogoutIcon fontSize="large" />
        </span>
      </div>
      <div className="closeSpace" onClick={() => setIsSidebarOpen(false)}></div>
    </div>
  );
};

export default Sidebar;
