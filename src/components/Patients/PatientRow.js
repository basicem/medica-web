import React from "react";
import { Table, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const PatientRow = ({ patient }) => {
  const navigate = useNavigate();
  return (
    <Table.Row>
      <Table.Cell style={{ cursor: "pointer" }} onClick={() => navigate(`/patients/${patient.slug}`)}>
        <Image src={encodeURI(Buffer.from(patient.image.data))} avatar />
        {`${patient.firstName} ${patient.lastName}`}
      </Table.Cell>
      <Table.Cell>{patient.email}</Table.Cell>
      <Table.Cell>{patient.phoneNumber}</Table.Cell>
      <Table.Cell>{patient.address}</Table.Cell>
      <Table.Cell>{patient.city}</Table.Cell>
    </Table.Row>
  );
};

export default PatientRow;
