import React, { createContext, useState } from "react";
import { allGames } from "./Constants";

const AppStateContext = createContext();

const ContextProvider = ({ children }) => {
  const [games, setGames] = useState(allGames);

  return (
    <AppStateContext.Provider value={{ games, setGames }}>
      {children}
    </AppStateContext.Provider>
  );
};

export { ContextProvider, AppStateContext };
