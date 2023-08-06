import React, { useEffect, useState } from "react";
import {
  Container, Icon, Button, Segment, Loader, Pagination,
} from "semantic-ui-react";
import styled from "styled-components";
import { toast } from "react-toastify";

import { PAGINATION } from "utils/constants";

import {
  getMedications, postMedication, deleteMedication, editMedication,
} from "api/patients";
import PatientMedicationTable from "./PatientMedicationTable";
import PatientMedicationModalCreate from "./PatientMedicationModalCreate";

const StyledContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 2rem;}
`;

const StyledMedicationTopContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 5rem;
  margin-top: 1rem;
`;

const StyledSubHeader = styled.h2`
  margin-top: 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: row;
`;

const PatientMedication = ({ patientId }) => {
  const [modalMedication, setModalMedication] = useState(false);
  const [filters, setFilters] = useState({
    page: PAGINATION.PAGE,
    pageSize: 3,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [rows, setRows] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const handlePageChange = (e, data) => {
    setFilters({ ...filters, patientId, page: data.activePage });
  };

  const handleClickMedication = () => {
    setModalMedication(!modalMedication);
  };

  const handleCreate = async (values) => {
    try {
      const data = { ...values, patientId };
      await postMedication(patientId, data);
      toast.success("Medication added!");
      setFilters({ ...filters, page: PAGINATION.PAGE });
    } catch (err) {
      toast.error("Unable to add medication!");
    } finally {
      setModalMedication(!modalMedication);
    }
  };

  const handleDelete = async (patient, medicationId, setModal) => {
    try {
      await deleteMedication(patient, medicationId);
      toast.success("Medication deleted!");
      setFilters({ ...filters, page: PAGINATION.PAGE });
    } catch (err) {
      toast.error("Unable to delete medication!");
    } finally {
      setModal(false);
    }
  };

  const handleEdit = async (patient, medicationId, values, setModalEdit) => {
    try {
      await editMedication(patient, medicationId, values);
      toast.success("Medication updated!");
      setFilters({ ...filters, page: PAGINATION.PAGE });
    } catch (err) {
      toast.error("Unable to update medication!");
    } finally {
      setModalEdit(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const responseMedications = await getMedications(patientId, { ...filters });
        setTotalPages(responseMedications.totalPages);
        setRows(responseMedications.rows);
      } catch (e) {
        setError("Unable to fetch medications");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [filters]);

  if (error) {
    return (
      <StyledContainer>
        <Segment inverted color="red" secondary>
          <Icon name="pills" />
          { error }
        </Segment>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <PatientMedicationModalCreate
        show={modalMedication}
        handleClick={handleClickMedication}
        handleCreate={handleCreate}
      />
      <StyledMedicationTopContainer>
        <StyledSubHeader>Medications</StyledSubHeader>
        <ButtonsContainer>
          <Button size="small" onClick={handleClickMedication}>
            <Icon name="plus square outline" />
            Add Medication
          </Button>
        </ButtonsContainer>
      </StyledMedicationTopContainer>
      <StyledContainer>
        <Segment basic>
          <Loader isActive={loading} inverted />
          <PatientMedicationTable
            rows={rows}
            error={error}
            patient={patientId}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          {totalPages > 1 && (
          <Pagination
            onPageChange={handlePageChange}
            activePage={filters.page}
            totalPages={totalPages}
          />
          )}
        </Segment>
      </StyledContainer>
    </StyledContainer>
  );
};

export default PatientMedication;
