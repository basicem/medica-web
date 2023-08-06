import React, { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { format } from "date-fns";

import MedicationModalDelete from "./MedicationModalDelete";
import MedicationModalEdit from "./MedicationModalEdit";

const MedicationRow = ({
  medication, patient, handleDelete, handleEdit,
}) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  // delete
  const handleClickDelete = () => {
    setModalDelete(!modalDelete);
  };

  const onDelete = async () => {
    handleDelete(patient, medication.id, setModalDelete);
  };

  // edit
  const handleClickEdit = () => {
    setModalEdit(!modalEdit);
  };

  const onEdit = async (values) => {
    const { id, patientId, ...data } = values;
    handleEdit(patient, medication.id, data, setModalEdit);
  };

  return (

    <Table.Row>
      <MedicationModalDelete
        show={modalDelete}
        handleClick={handleClickDelete}
        handleDelete={onDelete}
      />
      <MedicationModalEdit
        show={modalEdit}
        handleClick={handleClickEdit}
        handleEdit={onEdit}
        selectedMedication={medication}
      />
      <Table.Cell>{medication.name}</Table.Cell>
      <Table.Cell>{`${medication.doseValue}${medication.doseMeasurement}`}</Table.Cell>
      <Table.Cell>{medication.frequency}</Table.Cell>
      <Table.Cell>{format(new Date(medication.prescribedOn), "EEEE, do MMM yyyy")}</Table.Cell>
      <Table.Cell style={{ textAlign: "right" }}>
        <Button size="tiny" icon="trash alternate" onClick={handleClickDelete} />
        <Button size="tiny" icon="edit" onClick={handleClickEdit} />
      </Table.Cell>
    </Table.Row>
  );
};

export default MedicationRow;
