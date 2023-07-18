import React from "react";

import Users from "./Users";
import { UsersProvider } from "./UsersContext";

const UsersRoot = () => (
  <UsersProvider>
    <Users />
  </UsersProvider>
);

export default UsersRoot;
