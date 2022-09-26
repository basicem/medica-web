import React from "react";
import { Table, Image } from "semantic-ui-react";

const PatientRow = ({ patient }) => (
  <Table.Row>
    <Table.Cell>
      <Image src={encodeURI(Buffer.from(patient.image.data))} avatar />
      {`${patient.firstName} ${patient.lastName}`}
    </Table.Cell>
    <Table.Cell>{patient.email}</Table.Cell>
    <Table.Cell>{patient.phoneNumber}</Table.Cell>
    <Table.Cell>{patient.address}</Table.Cell>
    <Table.Cell>{patient.city}</Table.Cell>
  </Table.Row>
);

export default PatientRow;
