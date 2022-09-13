import React from "react";
import { Table } from "semantic-ui-react";


const PatientRow = ({ patient }) => (
    <Table.Row>
        <Table.Cell>{patient.firstName}</Table.Cell>
        <Table.Cell>{patient.lastName}</Table.Cell>
        <Table.Cell>{patient.email}</Table.Cell>
        <Table.Cell>{patient.phoneNumber}</Table.Cell>
        <Table.Cell>{patient.address}</Table.Cell>
    </Table.Row>
);

export default PatientRow;
