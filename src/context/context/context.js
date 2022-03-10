import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState("Home");
  const [user, setUser] = useState(null);
  return (
    <Context.Provider value={{ selectedPage, setSelectedPage, user, setUser }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
