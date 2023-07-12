import React, { useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const AdminNav = () => {
  const [state, setState] = useState({ activeItem: "users" });
  const navigate = useNavigate();
  const handleItemClick = (e, { name }) => {
    setState({ activeItem: name });
    navigate(name);
  };

  const handleLogOut = async (e, { name }) => {
    setState({ activeItem: name });
    localStorage.setItem("Bearer", null);
    localStorage.setItem("UserId", 0);
    navigate("/login");
  };

  const { activeItem } = state;

  return (
    <Menu pointing secondary>
      <Menu.Item
        name="users"
        active={activeItem === "users"}
        to="/users"
        onClick={handleItemClick}
      />
      <Menu.Menu position="right">

        <Dropdown item text="example@gmail.com">
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
