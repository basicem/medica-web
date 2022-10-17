import React, { useState } from "react";
import { Input, Select, Button } from "semantic-ui-react";

import { useUsers } from "./UsersContext";

const optionsRole = [
  { key: "all", text: "All", value: "all" },
  { key: "doctor", text: "Doctor", value: "doctor" },
  { key: "admin", text: "Admin", value: "admin" },
];

const optionsActive = [
  { key: "all", text: "All", value: "all" },
  { key: "active", text: "Active", value: "true" },
  { key: "deactivated", text: "Deactivated", value: "false" },
];

const optionsVerified = [
  { key: "all", text: "All", value: "all" },
  { key: "verified", text: "Verified", value: "true" },
  { key: "unverified", text: "Unverified", value: "false" },
];

const UserFilters = () => {
  const { filters, handleApplyFilters: onApply } = useUsers();
  const [search, setSearch] = useState(filters.search);
  const [role, setRole] = useState(filters.role);
  const [active, setActive] = useState(filters.active);
  const [verified, setVerified] = useState(filters.verified);

  const handleChangeSearch = (e, data) => {
    setSearch(data.value);
  };

  const handleSubmit = () => {
    onApply({
      search, role, active, verified,
    });
  };

  const handleChangeRole = (e, data) => {
    if (data.value !== "all") { setRole(data.value); } else setRole("");
  };

  const handleChangeActive = (e, data) => {
    if (data.value !== "all") { setActive(data.value); } else setActive("");
  };

  const handleChangeVerified = (e, data) => {
    if (data.value !== "all") { setVerified(data.value); } else setVerified("");
  };

  return (
    <>
      <Input onChange={handleChangeSearch} fluid type="text" placeholder="Search users by name or email" action>
        <input />
        <Select onChange={handleChangeRole} options={optionsRole} defaultValue="all" />
        <Select onChange={handleChangeActive} options={optionsActive} defaultValue="all" />
        <Select onChange={handleChangeVerified} options={optionsVerified} defaultValue="all" />
        <Button type="submit" onClick={handleSubmit}>Search</Button>
      </Input>
    </>
  );
};
export default UserFilters;
