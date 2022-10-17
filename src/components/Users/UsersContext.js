import React, { useContext, useState, useCallback } from "react";
import { toast } from "react-toastify";

import { postUser, getUsers, editUser } from "api/users";
import { PAGINATION } from "utils/constants";

const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    active: "",
    verified: "",
    role: "",
    page: PAGINATION.PAGE,
    pageSize: PAGINATION.PAGE_SIZE,
  });
  const [visibleModalCreate, setVisibleModalCreate] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUsers(filters);
      setTotalPages(response.totalPages);
      setUsers(response.rows);
    } catch (e) {
      setError("Unable to fetch users");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleApplyFilters = ({
    search, active, verified, role,
  }) => {
    setFilters({
      ...filters, search, active, verified, role, page: PAGINATION.PAGE,
    });
  };

  const handlePageChange = (e, data) => {
    setFilters({ ...filters, page: data.activePage });
  };

  const handleSetUser = (user) => {
    setVisibleModalEdit(true);
    setSelectedUser(user);
  };

  const handleCloseEditModal = () => {
    setVisibleModalEdit(false);
  };

  const handleOpenCreateModal = () => {
    setVisibleModalCreate(true);
  };

  const handleCloseCreateModal = () => {
    setVisibleModalCreate(false);
  };

  const handleEditUser = async (values) => {
    try {
      setUpdateLoading(true);
      const data = {
        role: values.role,
        isActive: values.isActive,
      };
      await editUser(selectedUser.id, data);

      setUsers((draft) => draft.map((user) => {
        if (user.id === selectedUser.id) {
          return { ...user, role: values.role, isActive: values.isActive };
        }

        return user;
      }));
      toast.success("User updated!");
      handleCloseEditModal();
    } catch (err) {
      toast.error("Unable to update user!");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCreateUser = async (values) => {
    try {
      setCreateLoading(true);
      await postUser({
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        role: values.role,
        isActive: values.isActive,
        isVerified: values.isVerified,
        email: values.email,
      });
      toast.success("New user added!");
      handleCloseCreateModal();
    } catch (err) {
      toast.error("Unable to create user!");
    } finally {
      setCreateLoading(false);
    }

    fetchUsers();
  };

  const value = {
    totalPages,
    users,
    error,
    loading,
    filters,
    visibleModalCreate,
    visibleModalEdit,
    selectedUser,
    updateLoading,
    createLoading,
    fetchUsers,
    handleApplyFilters,
    handlePageChange,
    handleCreateUser,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleSetUser,
    handleEditUser,
    handleCloseEditModal,
  };

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

export const useUsers = () => {
  const ctx = useContext(UsersContext);

  if (!ctx) {
    throw new Error("useUsers must be used within the UsersProvider");
  }

  return ctx;
};
