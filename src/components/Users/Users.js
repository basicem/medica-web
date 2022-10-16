import React, { useCallback, useEffect, useState } from "react";
import {
  Button, Container, Pagination, Icon, Divider, Segment,
} from "semantic-ui-react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { postUser, getUsers, editUser } from "api/users";
import Loader from "components/Loader";
import UserTable from "components/Users/UserTable";
import { PAGINATION } from "utils/constants";
import UserModalEdit from "components/Users/UserModalEdit";
import UserModalCreate from "./UserModalCreate";
import UserFilters from "./UserFilters";

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 1rem;
`;

const StyledTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem 6rem 1rem 6rem;
`;

const StyledHeader = styled.h1`
  margin:0
`;

const Users = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [rows, setRows] = useState();
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

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUsers(filters);
      setTotalPages(response.totalPages);
      setRows(response.rows);
    } catch (e) {
      setError("Unable to fetch users");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

  const handleEdit = (user) => {
    setVisibleModalEdit(true);
    setSelectedUser(user);
  };

  const handleCloseEditModal = () => {
    setVisibleModalEdit(false);
  };

  const handleCloseCreateModal = () => {
    setVisibleModalCreate(false);
  };

  const handleEditUser = async (values, setSubmitting) => {
    try {
      const data = {
        role: values.role,
        isActive: values.isActive,
      };
      await editUser(selectedUser.id, data);
      const updatedRows = rows.map((u) => {
        if (u.id === selectedUser.id) {
          u.role = values.role;
          u.isActive = values.isActive;
        }
        return u;
      });
      setRows(updatedRows);
      toast.success("User updated!");
      handleCloseEditModal();
    } catch (err) {
      toast.error("Unable to update user!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateUser = async (values, setSubmitting) => {
    try {
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
      setSubmitting(false);
    }

    fetchUsers();
  };

  return (
    <div>
      <UserModalCreate
        handleCreateUser={handleCreateUser}
        handleCancel={handleCloseCreateModal}
        show={visibleModalCreate}
      />
      <UserModalEdit
        handleEditUser={handleEditUser}
        handleCancel={handleCloseEditModal}
        show={visibleModalEdit}
        user={selectedUser}
      />
      <StyledTopContainer>
        <StyledHeader>Users</StyledHeader>
        <Button size="small" onClick={() => { setVisibleModalCreate(true); }}>
          <Icon name="plus square outline" />
          Add User
        </Button>
      </StyledTopContainer>
      <StyledContainer>
        <Divider />
        <Segment basic>
          <Loader isActive={loading} inverted />
          <UserFilters filters={filters} onApply={handleApplyFilters} />
          <UserTable handleEdit={handleEdit} rows={rows} error={error} />
          {totalPages > 1 && (
          <Pagination
            onPageChange={handlePageChange}
            activePage={filters.page}
            totalPages={totalPages}
          />
          )}
        </Segment>
      </StyledContainer>
    </div>
  );
};

export default Users;
