import React, { useState, useEffect } from "react";
import {
  Container, Icon, Segment, Card,
} from "semantic-ui-react";
import styled from "styled-components";

import { getVitals } from "api/patients";

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

const PatientVitals = ({ patientId }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [patientVitals, setPatientVitals] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await getVitals(patientId);
        setPatientVitals(response);
      } catch (e) {
        setError("Unable to fetch vitals");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

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
      <StyledVitalsTopContainer>
        <StyledSubHeader>Vitals</StyledSubHeader>
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
              <SmallerCard>
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
    </StyledContainer>
  );
};

export default PatientVitals;
