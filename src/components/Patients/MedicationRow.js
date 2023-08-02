import React from "react";
import { Table } from "semantic-ui-react";
import { format } from "date-fns";

const MedicationRow = ({ medication }) => (
  <Table.Row>
    <Table.Cell>{medication.name}</Table.Cell>
    <Table.Cell>{medication.dose}</Table.Cell>
    <Table.Cell>{medication.frequency}</Table.Cell>
    <Table.Cell>{format(new Date(medication.prescribedOn), "EEEE, do MMM yyyy")}</Table.Cell>
  </Table.Row>
);

export default MedicationRow;
