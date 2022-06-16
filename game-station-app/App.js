import React, { useState } from "react";
import MainContainer from "./navigation/MainContainer";
import { ContextProvider } from "./AppStateContext";

function App() {
  return (
    <ContextProvider>
      <MainContainer />
    </ContextProvider>
  );
}

export default App;
