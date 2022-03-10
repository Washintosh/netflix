import axios from "axios";

export const getLists = async (dispatch) => {
  try {
    const res = await axios.get(
      "https://netflix-api-washington.herokuapp.com/api/lists",
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch({ type: "GET_LISTS_SUCCESS", payload: res.data.list });
  } catch (err) {
    dispatch({ type: "GET_LISTS_FAILURE" });
  }
};

//create
export const createList = async (list, dispatch) => {
  try {
    const res = await axios.post(
      "https://netflix-api-washington.herokuapp.com/api/lists",
      list,
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch({ type: "CREATE_LIST_SUCCESS", payload: res.data.list });
  } catch (err) {
    dispatch({ type: "CREATE_LIST_FAILURE" });
  }
};

//delete
export const deleteList = async (id, dispatch) => {
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
