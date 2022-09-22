import React from 'react'
import { Message, Table, Container, Segment } from 'semantic-ui-react'
import styled from "styled-components";

import PatientRow from "components/Patients/PatientRow";

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
`;

const PatientTable = ({ rows, error }) => {
  if (error) {
    return (
      <StyledContainer>
        <Segment inverted color="red" secondary>
          {error}
        </Segment>
      </StyledContainer>
    );
  }

  if(rows === null) {
    return <Message>Patients not found!</Message>
  }

  return (
    <StyledContainer>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>Avatar</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>E-mail address</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Adress</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows?.map((p) => (
            <PatientRow key={p.id} patient={p}/>
          ))}
        </Table.Body>
      </Table>
    </StyledContainer>
  );
};

export default PatientTable;
