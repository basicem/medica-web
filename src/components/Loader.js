import React from "react";
import { Container, Dimmer, Loader as SemanticLoader } from "semantic-ui-react";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
`;

const Loader = ({ isActive }) => (
  <StyledContainer>
    <Dimmer active={isActive} inverted>
      <SemanticLoader inverted content="Loading" />
    </Dimmer>
  </StyledContainer>
);

export default Loader;
