import React from "react";
import { useField } from "formik";
import styled from "styled-components";

const StyledDiv = styled.div`
    width: 100%;
    margin-top: 1rem;
`;

const StyledLabel = styled.label`
    font-weight: bold;
`;

const StyledErrorMessage = styled.div`
    font-size: 12px;
    color: #e53935;
    margin-top: 0.25rem;
`;

const InputSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <StyledDiv>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </StyledDiv>
  );
};

export default InputSelect;
