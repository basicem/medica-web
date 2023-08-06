import React from "react";
import {
  Icon, Table, Container, Segment,
} from "semantic-ui-react";
import styled from "styled-components";

import MedicationRow from "./MedicationRow";

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
  min-width: 0;
`;

const MedicationTable = ({
  rows, error, patient, handleDelete, handleEdit,
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
          Medications not found!
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
            <Table.HeaderCell>Dose</Table.HeaderCell>
            <Table.HeaderCell>Frequency</Table.HeaderCell>
            <Table.HeaderCell>Prescribed On</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows?.map((m) => (
            <MedicationRow
              key={m.id}
              medication={m}
              patient={patient}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </Table.Body>
      </Table>
    </StyledContainer>
  );
};

export default MedicationTable;
