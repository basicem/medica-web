import React, { useContext, useState } from "react";

const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState();

  const value = {
    user,
    setUser,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);

  if (!ctx) {
    throw new Error("useStore must be used within the StoreProvider");
  }

  return ctx;
};
