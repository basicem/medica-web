import React from "react";
import { useField } from "formik";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
`;

const StyledLabel = styled.label`
    font-weight: bold;
`;

const StyledInput = styled.input`
    width: 20px;
`;

const StyledErrorMessage = styled.div`
    font-size: 12px;
    color: #e53935;
    margin-top: 0.25rem;
`;

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <StyledDiv>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </StyledDiv>
  );
};

export default InputField;
