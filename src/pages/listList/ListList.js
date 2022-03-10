import "./listList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { Context } from "../../context/context/context";

export default function ListList() {
  const { setSelectedPage } = useContext(Context);
  setSelectedPage("Lists");
  const { lists, dispatch, setList } = useContext(ListContext);

  useEffect(() => {
    const getLists = async () => {
      try {
        const res = await axios.get(
          "https://netflix-api-washington.herokuapp.com/api/lists",
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        dispatch({ type: "GET_LISTS_SUCCESS", payload: res.data.list });
      } catch (err) {
        dispatch({ type: "GET_LISTS_FAILURE" });
      }
    };
    getLists();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        "https://netflix-api-washington.herokuapp.com/api/lists/" + id,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      dispatch({ type: "DELETE_LIST_SUCCESS", payload: id });
    } catch (err) {
      dispatch({ type: "DELETE_LIST_FAILURE" });
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/list/" + params.row._id }}
              onClick={() => setList(params.row)}
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

  useEffect(() => {
    document.title = "Admin - Lists";
  });

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="productList">
          <DataGrid
            rows={lists}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(r) => r._id}
          />
        </div>
      </div>
    </>
  );
}
