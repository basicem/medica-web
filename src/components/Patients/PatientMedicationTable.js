import React from "react";
import {
  Icon, Table, Container, Segment,
} from "semantic-ui-react";
import styled from "styled-components";

import PatientMedicationRow from "./PatientMedicationRow";

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
  min-width: 0;
`;

const PatientMedicationTable = ({
  rows, error, patient, handleDelete, handleEdit,
}) => {
  if (error) {
    return (
      <Segment inverted color="red" secondary>
        <Icon name="times circle outline" />
        { error }
      </Segment>
    );
  }

  if (rows === null || rows?.length === 0) {
    return (
      <Segment secondary>
        Medications not found!
      </Segment>
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
            <PatientMedicationRow
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

export default PatientMedicationTable;
