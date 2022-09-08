import React, { useEffect, useState } from "react";
import { Button, Container, Header, Pagination, Icon, Divider } from "semantic-ui-react";
import styled from "styled-components";

import Loader from "components/Loader";
import getPatients from "api/patients";
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
    setFilters({ search: "", page: data.activePage, pageSize: filters.pageSize });
  };

  return (
    <div>
      <StyledTopContainer>
        <Header as="h1" style={{margin:0}}>Patients</Header>
        <Button size="small">
          <Icon name='plus square outline' />
          Add Patient
        </Button>
      </StyledTopContainer>
      <StyledContainer>
        <Divider/>
        <Loader isActive={loading} />
        <PatientFilters filters={filters} onApply={handleApplyFilters} />
        <PatientTable filters={filters} onApply={handleApplyFilters} count={count} nextPage={nextPage} totalPages={totalPages} rows={rows} error={error} />
        <Pagination onPageChange={handlePageChange} activePage={filters.page} totalPages={totalPages} />
      </StyledContainer>
    </div>
  );
};

export default Patients;
