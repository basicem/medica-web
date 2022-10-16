import React from "react";
import {
  Icon, Table, Container, Segment,
} from "semantic-ui-react";
import styled from "styled-components";

import UserRow from "components/Users/UserRow";

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
  min-width: 0;
`;

const UserTable = ({
  handleEdit, rows, error,
}) => {
  if (error) {
    return (
      <StyledContainer>
        <Segment inverted color="red" secondary>
          <Icon name="times circle outline" />
          { error }
        </Segment>
      </StyledContainer>
    );
  }

  if (rows === null || rows?.length === 0) {
    return (
      <StyledContainer>
        <Segment inverted color="blue" tertiary>
          <Icon name="users" />
          Users not found!
        </Segment>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Table singleLine color="teal">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>E-mail address</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Active</Table.HeaderCell>
            <Table.HeaderCell>Verified</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows?.map((u) => (
            <UserRow key={u.id} user={u} handleEdit={handleEdit} />
          ))}
        </Table.Body>
      </Table>
    </StyledContainer>
  );
};

export default UserTable;
