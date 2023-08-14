import React, { useState } from "react";
import {
  Container, Icon, Segment,
} from "semantic-ui-react";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 2rem;}
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

const PatientVitals = ({ patientId }) => {
  const [error, setError] = useState();

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
    </StyledContainer>
  );
};

export default PatientVitals;
