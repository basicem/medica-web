import React from "react";
import styled from "styled-components";
import { Checkbox } from "semantic-ui-react";

const StyledDiv = styled.div`
    margin-top: 1rem;
    width: 100%;
`;

const StyledLabel = styled.label`
  display: inline-block;
  font-size: 1rem;
  border-radius: 5px;
  appearance: none;
  align-item: center;

`;

const InputCheckbox = ({ children, ...props }) => (
  <StyledDiv>
    <StyledLabel>
      <Checkbox toggle onChange={props.onChange} style={{ verticalAlign: "middle", marginRight: "0.5rem" }} {...props} />
      {children}
    </StyledLabel>
  </StyledDiv>
);

export default InputCheckbox;
