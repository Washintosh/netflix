import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../App";
import HomeIcon from "@mui/icons-material/Home";
import "./profile.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, dispatch, isFetching } = useContext(AuthContext);
  const { accessToken } = user;
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    success: true,
  });

  useEffect(() => {
    if (alert.show) {
      const timeout = setTimeout(
        () => setAlert((prev) => ({ ...prev, show: false })),
        4500
      );
      return () => clearTimeout(timeout);
    }
  }, [alert.show]);

  const submitHandler = (e) => {
    e.preventDefault();
    const uploadUser = {};
    dispatch({ type: "UPDATE_START" });
    if (username !== user.username) uploadUser.username = username;
    if (email !== user.email) uploadUser.email = email;
    if (profilePic !== user.profilePic) {
      const filename = new Date().getTime() + profilePic.name;
      const uploadTask = uploadBytesResumable(
        ref(storage, `/profile/${filename}`),
        profilePic
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
            uploadUser.profilePic = url;
            const updateUser = async () => {
              try {
                const res = await axios.put(
                  `https://netflix-api-washington.herokuapp.com/api/users/${id}`,
                  uploadUser,
                  {
                    headers: {
                      token:
                        "Bearer " +
                        JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                  }
                );
                const {
                  password: {},
                  ...updatedUser
                } = res.data.user;
                dispatch({
                  type: "UPDATE_SUCCESS",
                  payload: { ...updatedUser, accessToken },
                });
                setAlert({
                  show: true,
                  message: "The user was successfully updated",
                  success: true,
                });
              } catch (error) {
                setAlert({
                  show: true,
                  message: JSON.parse(error.request.response).message,
                  success: false,
                });
                dispatch({
                  type: "UPDATE_FAILURE",
                });
              }
            };
            updateUser();
          });
        }
      );
    }
  };
  return (
    <section className="profile">
      <div
        className={`${
          alert.show
            ? alert.success
              ? "alert show success"
              : "alert show error"
            : alert.success
            ? "alert success"
            : "alert error"
        }`}
      >
        {alert.message}
      </div>
      <form onSubmit={submitHandler}>
        <div className="home" onClick={() => navigate("/")}>
          <HomeIcon fontSize="large" />
        </div>
        <label htmlFor="image" className="image">
          <div className="imgContainer">
            <img
              src={
                profilePic === user.profilePic
                  ? profilePic
                  : URL.createObjectURL(profilePic)
              }
              alt="profile"
            />
          </div>
          <input
            type="file"
            id="image"
            onChange={(e) => setProfilePic(e.target.files[0])}
            accept="image/*"
          />
        </label>
        <input
          value={username}
          type="text"
          className="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          value={email}
          type="email"
          className="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button disabled={isFetching}>
          {isFetching ? <CircularProgress size="15px" /> : "UPDATE"}
        </button>
      </form>
    </section>
  );
};

export default Profile;
