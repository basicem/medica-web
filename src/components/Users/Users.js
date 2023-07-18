import React, { useEffect } from "react";
import {
  Button, Container, Pagination, Icon, Divider, Segment,
} from "semantic-ui-react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

import Loader from "components/Loader";
import UserTable from "components/Users/UserTable";
import UserModalEdit from "components/Users/UserModalEdit";
import UserModalCreate from "./UserModalCreate";
import UserFilters from "./UserFilters";
import { useUsers } from "./UsersContext";

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
  const {
    loading, totalPages, handleOpenCreateModal, fetchUsers, handlePageChange, filters,
  } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <UserModalCreate />
      <UserModalEdit />
      <StyledTopContainer>
        <StyledHeader>Users</StyledHeader>
        <Button size="small" onClick={handleOpenCreateModal}>
          <Icon name="plus square outline" />
          Add User
        </Button>
      </StyledTopContainer>
      <StyledContainer>
        <Divider />
        <Segment basic>
          <Loader isActive={loading} inverted />
          <UserFilters />
          <UserTable />
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
