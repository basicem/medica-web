import React, { useEffect, useState } from "react";
import { Container, Segment, Dimmer, Loader, Image } from "semantic-ui-react";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
`;

const MyLoader = ({ isActive }) => (
  <StyledContainer>
    <Dimmer active={isActive} inverted>
      <Loader inverted content="Loading" />
    </Dimmer>
  </StyledContainer>
);

export default MyLoader;
