import React, { useState, useEffect } from "react";
import {
  Container, Icon, Segment, Button, Modal, Table, Pagination,
} from "semantic-ui-react";
import styled from "styled-components";
import { format } from "date-fns";

import { PAGINATION } from "utils/constants";

import { getVitalHistory } from "api/patients";
import Loader from "components/Loader";

const StyledContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 2rem;
  }
`;

const PatientVitalModalDetail = ({
  patientId, vitalId, show, handleClose,
}) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [rows, setRows] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    page: PAGINATION.PAGE,
    pageSize: 7,
  });

  const handlePageChange = (e, data) => {
    setFilters({ ...filters, page: data.activePage });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await getVitalHistory(patientId, vitalId, filters);
        setTotalPages(response.totalPages);
        setRows(response.rows);
      } catch (e) {
        setError("Unable to fetch history");
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
          <Icon name="times circle outline" />
          { error }
        </Segment>
      </StyledContainer>
    );
  }

  if (rows === null || rows?.length === 0) {
    return (
      <StyledContainer>
        <Segment inverted color="blue" tertiary>
          Record History not found!
        </Segment>
      </StyledContainer>
    );
  }

  return (
    <div>
      {rows && (
      <Modal
        open={show}
        onClose={handleClose}
      >
        <Loader isActive={loading} inverted />
        <Modal.Header>{`Vital Sign History for ${rows[0].vital.name}`}</Modal.Header>
        <Modal.Content>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Value</Table.HeaderCell>
                <Table.HeaderCell>Unit Measurement</Table.HeaderCell>
                <Table.HeaderCell>Lower Limit</Table.HeaderCell>
                <Table.HeaderCell>Uper Limit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows?.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{format(new Date(item.createdAt), "EEEE, do MMM yyyy")}</Table.Cell>
                  <Table.Cell
                    {...((item.value >= item.vital.lowerLimit
                      && item.value <= item.vital.upperLimit)
                      ? { positive: true } : { negative: true })}
                  >
                    {item.value}
                  </Table.Cell>
                  <Table.Cell>{item.vital.unitMeasurement}</Table.Cell>
                  <Table.Cell>
                    {">"}
                    {`${item.vital.lowerLimit}`}
                  </Table.Cell>
                  <Table.Cell>
                    {"<"}
                    {item.vital.upperLimit}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {totalPages > 1 && (
          <Pagination
            onPageChange={handlePageChange}
            activePage={filters.page}
            totalPages={totalPages}
          />
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Actions>
      </Modal>
      )}
    </div>
  );
};

export default PatientVitalModalDetail;
