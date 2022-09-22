import React from "react";
import { Table, Image } from "semantic-ui-react";


const PatientRow = ({ patient }) => {

    return(
    <Table.Row>
        <Table.Cell>
            <Image src={encodeURI(Buffer.from(patient.image.data))}  avatar />
        </Table.Cell>
        <Table.Cell>{patient.firstName}</Table.Cell>
        <Table.Cell>{patient.lastName}</Table.Cell>
        <Table.Cell>{patient.email}</Table.Cell>
        <Table.Cell>{patient.phoneNumber}</Table.Cell>
        <Table.Cell>{patient.address}</Table.Cell>
    </Table.Row>
    );
};

export default PatientRow;
