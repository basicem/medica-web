import React from "react";
import { useField } from "formik";
import styled from "styled-components";
import { Input } from "semantic-ui-react";

const StyledDiv = styled.div`
    width: 100%;
    margin-top: 1rem;
`;

const StyledLabel = styled.label`
    font-weight: bold;
`;

const StyledInput = styled(Input)`
    width: 100%;
`;

const StyledErrorMessage = styled.div`
    font-size: 12px;
    color: #e53935;
    margin-top: 0.25rem;
`;

const InputLink = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <StyledDiv>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledInput
        {...field}
        {...props}
        icon="linkify"
        iconPosition="left"
        label={{ content: "Link" }}
        labelPosition="right"
        placeholder="Enter your meeting link..."
        fluid
      />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </StyledDiv>
  );
};

export default InputLink;
