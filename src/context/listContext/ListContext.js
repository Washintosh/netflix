import ListReducer from "./ListReducer";
import { createContext, useReducer, useState } from "react";

const INITIAL_STATE = {
  lists: [],
  isFetching: false,
  error: false,
};

export const ListContext = createContext(INITIAL_STATE);

export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListReducer, INITIAL_STATE);
  const [list, setList] = useState([]);
  return (
    <ListContext.Provider
      value={{
        lists: state.lists,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        list,
        setList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
