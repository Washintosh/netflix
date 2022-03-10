import { useContext } from "react";
import { AuthContext } from "../../App";
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./sidebar.css";
const Sidebar = () => {
  const { isSidebarOpen, dispatch, setIsSidebarOpen } = useContext(AuthContext);
  return (
    <div className={`${isSidebarOpen ? "sidebar show" : "sidebar"}`}>
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
        Logout
      </span>
    </div>
  );
};

export default Sidebar;
