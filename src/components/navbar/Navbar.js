import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const { isSidebarOpen, setIsSidebarOpen } = useContext(AuthContext);
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src={`${JSON.parse(localStorage.getItem("user")).profilePic}`}
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span
                onClick={() =>
                  dispatch({
                    type: "LOGOUT",
                  })
                }
              >
                Logout
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className={`${
            isSidebarOpen ? "hamburger is-active" : "hamburger"
          } hamburger--squeeze`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
