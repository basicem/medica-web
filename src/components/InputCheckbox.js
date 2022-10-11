import React from "react";
import { useField } from "formik";
import styled from "styled-components";

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

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: #e53935;
  margin-top: 0.25rem;
`;

const InputCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <StyledDiv>
      <StyledLabel>
        <input style={{ verticalAlign: "middle", marginRight: "0.5rem" }} {...field} {...props} type="checkbox" />
        {children}
      </StyledLabel>
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </StyledDiv>
  );
};

export default InputCheckbox;
