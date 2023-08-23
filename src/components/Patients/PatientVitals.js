import React, { useState, useEffect, useCallback } from "react";
import {
  Container, Icon, Segment, Card, Button,
} from "semantic-ui-react";
import styled from "styled-components";
import { toast } from "react-toastify";

import { getVitals, postVital } from "api/patients";
import Loader from "components/Loader";
import PatientVitalModalCreate from "./PatientVitalModalCreate";
import PatientVitalModalDetail from "./PatientVitalModalDetail";

const StyledContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 2rem;
  }
`;

const StyledSubHeader = styled.h2`
  margin-top: 0;
`;

const StyledVitalsTopContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 5rem;
  margin-top: 1rem;
`;

const StyledCardGroup = styled(Card.Group)`
  &&& {
    display: flex;
    flex-wrap: wrap;
  }
`;

const SmallerCard = styled(Card)`
  &&& {
    display: flex;
    width: fit-content;
    flex: 0 0 auto;
    color: black;
  }
`;

const StyledDescription = styled(Card.Description)`
  &&&&& {
    font-size: 0.7rem;
    color: gray;
  }
`;

const StyledCardHeader = styled.div`
  &&&&& {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    gap: 0.5rem;
    margin-top: 0.6rem;
  }
`;

const StyledHeaderValue = styled(Card.Header)`
  &&&&& {
    display: flex;
    font-size: 3rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const StyledHeaderUnit = styled(Card.Header)`
  &&&&& {
    display: flex;
    font-size: 1rem;
    color: gray;
    align-self: flex-end;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: row;
`;

const PatientVitals = ({ patientId }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [patientVitals, setPatientVitals] = useState([]);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedVital, setSelectedVital] = useState(null);

  const fetchVitals = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getVitals(patientId);
      setPatientVitals(response);
    } catch (e) {
      setError("Unable to fetch vitals");
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchVitals();
  }, [fetchVitals]);

  const handleClick = () => {
    setShow(!show);
  };

  const handleCreate = async (values) => {
    try {
      await postVital(patientId, {
        vitalId: values.vital,
        value: values.value,
      });
      fetchVitals();
      toast.success("Vital added!");
    } catch (err) {
      toast.error("Unable to add vital!");
    } finally {
      handleClick();
    }
  };

  const handleDetail = async (key) => {
    setSelectedVital(key);
    setShowDetails(!showDetails);
  };

  const handleClose = () => {
    setShowDetails(!showDetails);
  };

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

  return (
    <StyledContainer>
      <Loader isActive={loading} inverted />
      <StyledVitalsTopContainer>
        <StyledSubHeader>Vitals</StyledSubHeader>
        <ButtonsContainer>
          <Button size="small" onClick={handleClick}>
            <Icon name="plus square outline" />
            Add Vital
          </Button>
        </ButtonsContainer>
      </StyledVitalsTopContainer>

      {patientVitals === null || patientVitals?.length === 0
        ? (
          <Segment secondary>
            Vitals not found!
          </Segment>
        )
        : (
          <StyledCardGroup>
            {patientVitals?.map((pv) => (
              <SmallerCard key={pv.id} onClick={() => handleDetail(pv.vital.id)}>
                <Card.Content>
                  <StyledDescription>{pv.vital.name}</StyledDescription>
                  <StyledCardHeader>
                    <StyledHeaderValue>{pv.value}</StyledHeaderValue>
                    <StyledHeaderUnit>{pv.vital.unitMeasurement}</StyledHeaderUnit>
                  </StyledCardHeader>
                </Card.Content>
              </SmallerCard>
            ))}
          </StyledCardGroup>
        )}
      <PatientVitalModalCreate
        show={show}
        handleClick={handleClick}
        handleCreate={handleCreate}
      />
      {showDetails
      && (
        <PatientVitalModalDetail
          show={showDetails}
          patientId={patientId}
          vitalId={selectedVital}
          handleClose={handleClose}
        />
      )}
    </StyledContainer>
  );
};

export default PatientVitals;
