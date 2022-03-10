import React, { useContext } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Logout } from "@mui/icons-material";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Topbar() {
  const { dispatch } = useContext(AuthContext);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">lamaadmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src={`${JSON.parse(localStorage.getItem("user")).profilePic}`}
            alt=""
            className="topAvatar"
          />
          <button
            className="logout"
            onClick={() => dispatch({ type: "LOGOUT" })}
          >
            <Logout />
          </button>
        </div>
      </div>
    </div>
  );
}
