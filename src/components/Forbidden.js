import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Message } from "semantic-ui-react";

const StyledTopContainer = styled.div`
  margin-top: 3rem;
  padding: 1rem;
`;

const Forbidden = () => (
  <StyledTopContainer>
    <Message negative>
      <Message.Header>Forbidden Access</Message.Header>
      <p>You do not have permission to access this page.</p>
    </Message>
    <p>
      Please go back to the
      {" "}
      <Link to="/login">login</Link>
      {" "}
      with appropriate credentials.
    </p>
  </StyledTopContainer>
);

export default Forbidden;
