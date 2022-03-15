import React from "react";
import { Container, Segment } from "semantic-ui-react";
import styled from "styled-components";

import DoctorCard from "components/Doctors/DoctorCard";

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
`;

const DoctorList = ({ count, nextPage, rows, error }) => {
  if (error) {
    return (
      <StyledContainer>
        <Segment inverted color="red" secondary>
          {error}
        </Segment>
      </StyledContainer>
    );
  }

  if (!rows) {
    return null;
  }

  if (rows.length === 0) {
    return (
      <StyledContainer>
        <Segment inverted color="red" secondary>
          Doctors not find!
        </Segment>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      {rows.map((d) => (
        <DoctorCard key={d.id} doctor={d} />
      ))}
    </StyledContainer>
  );
};

export default DoctorList;
