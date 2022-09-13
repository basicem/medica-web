import React, { useEffect, useState } from "react";
import { Button, Container, Pagination, Icon, Divider } from "semantic-ui-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Loader from "components/Loader";
import {getPatients} from "api/patients";
import PatientTable from "components/Patients/PatientTable";
import { PAGINATION } from "utils/constants";
import PatientFilters from "components/Patients/PatientFilters";

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 1rem;
`;

const StyledTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem 6rem 1rem 6rem;
`;

const StyledHeader = styled.h1`
  margin:0
`;


const Patients = () => {
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rows, setRows] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    page: PAGINATION.PAGE,
    pageSize: PAGINATION.PAGE_SIZE,
  });

  let navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getPatients(filters);
        setCount(response.count);
        setNextPage(response.nextPage);
        setTotalPages(response.totalPages);
        setRows(response.rows);
      } catch (e) {
        setError("Unable to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [filters]);

  const handleApplyFilters = ({ search }) => {
    setFilters({ ...filters, search, page: PAGINATION.PAGE });
  };

  const handlePageChange = (e, data) => {
    setFilters({ ...filters, page: data.activePage });
  };

  return (
    <div>
      <StyledTopContainer>
        <StyledHeader>Patients</StyledHeader>
        <Button size="small" onClick={() => navigate('/AddPatient')}>
          <Icon name='plus square outline' />
          Add Patient
        </Button>
      </StyledTopContainer>
      <StyledContainer>
        <Divider/>
        <Loader isActive={loading} />
        <PatientFilters filters={filters} onApply={handleApplyFilters} />
        <PatientTable rows={rows} error={error} />
        <Pagination onPageChange={handlePageChange} activePage={filters.page} totalPages={totalPages} />
      </StyledContainer>
    </div>
  );
};

export default Patients;
