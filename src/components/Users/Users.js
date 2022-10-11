import React, { useEffect, useState } from "react";
import {
  Button, Container, Pagination, Icon, Divider, Segment,
} from "semantic-ui-react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

import Loader from "components/Loader";
import { getUsers } from "api/users";
import UserTable from "components/Users/UserTable";
import { PAGINATION } from "utils/constants";
import UserModalCreate from "./UserModalCreate";

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
    page: PAGINATION.PAGE,
    pageSize: PAGINATION.PAGE_SIZE,
  });
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetch = async () => {
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
    };

    fetch();
  }, [filters, modal]);

  const handlePageChange = (e, data) => {
    setFilters({ ...filters, page: data.activePage });
  };

  const handleClick = () => {
    setModal(!modal);
  };

  return (
    <div>
      <UserModalCreate show={modal} handleClick={handleClick} />
      <StyledTopContainer>
        <StyledHeader>Users</StyledHeader>
        <Button size="small" onClick={handleClick}>
          <Icon name="plus square outline" />
          Add User
        </Button>
      </StyledTopContainer>
      <StyledContainer>
        <Divider />
        <Segment basic>
          <Loader isActive={loading} inverted />
          <UserTable rows={rows} error={error} />
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
