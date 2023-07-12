import React from "react";

import Root from "components/Root";
import { StoreProvider } from "./LogIn/StoreContext";

function App() {
  return <StoreProvider><Root /></StoreProvider>;
}

export default App;
