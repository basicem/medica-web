import React, {useEffect, useState} from "react"
import { Container } from "semantic-ui-react";
import styled from "styled-components";

import Loader from "components/Loader";
import getPatients from "api/patients";
import PatientTable from "components/Patients/PatientTable"
import PatientFilters from "./PatientFilters";


const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
`;


const Patients = () => {
    const [count, setCount] = useState(0);
    const [nextPage, setNextPage] = useState(0);
    const [rows, setRows] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        page: 1,
        pageSize: 30,
    });

    
    useEffect(() => {
        const fetch = async () => {
          try {
            const response = await getPatients(filters);
            setCount(response.count);
            setNextPage(response.nextPage);
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
        setFilters({ search, page: 1, pageSize: 30 });
    }

    return (
        <StyledContainer>
          <Loader isActive={loading} />
          <PatientFilters filters={filters} onApply={handleApplyFilters}/>
          <PatientTable count={count} nextPage={nextPage} rows={rows} error={error} />
        </StyledContainer>
      );
};

export default Patients;