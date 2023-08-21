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
    display: flex;
    font-weight: bold;
`;

const StyledErrorMessage = styled.div`
    display: flex;
    font-size: 12px;
    color: #e53935;
    margin-top: 0.25rem;
`;

const InputSelect = ({
  label, options, placeholder, ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <StyledDiv>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <select {...field} {...props}>
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </StyledDiv>
  );
};

export default InputSelect;
