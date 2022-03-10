import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.css";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `https://netflix-api-washington.herokuapp.com/api/lists${
            type ? `?type=${type}` : ""
          }${genre ? `&genre=${genre}` : ""}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data.list);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
    document.title = "Netflix";
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Sidebar />
      <Featured type={type} setGenre={setGenre} />
      {lists.length ? (
        lists.map((list) => <List list={list} key={list._id} />)
      ) : (
        <div className="noItems">
          <p>No {type} to display</p>
        </div>
      )}
    </div>
  );
};

export default Home;
