import React, { useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { useStore } from "./LogIn/StoreContext";

const AdminNav = () => {
  const [state, setState] = useState({ activeItem: "" });
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  const handleItemClick = (e, { name }) => {
    setState({ activeItem: name });
    navigate(name);
  };

  const handleLogOut = async (e, { name }) => {
    setState({ activeItem: name });
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const { activeItem } = state;

  return (

    <Menu pointing secondary>
      <Menu.Item
        name="users"
        active={activeItem === "users"}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="vitals"
        active={activeItem === "vitals"}
        onClick={handleItemClick}
      />
      <Menu.Menu position="right">

        <Dropdown item text={user.email}>
          <Dropdown.Menu>
            <Dropdown.Item
              name="account"
              active={activeItem === "acount"}
              onClick={handleItemClick}
            >
              Account

            </Dropdown.Item>

            <Dropdown.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={handleLogOut}
            >
              Logout

            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};

export default AdminNav;
