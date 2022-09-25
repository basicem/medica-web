import React from "react";
import {
  Icon, Table, Container, Segment,
} from "semantic-ui-react";
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
          Patients not found!
        </Segment>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>E-mail address</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Adress</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows?.map((p) => (
            <PatientRow key={p.id} patient={p} />
          ))}
        </Table.Body>
      </Table>
    </StyledContainer>
  );
};

export default PatientTable;
