import React from "react";
import { useField } from "formik";
import styled from "styled-components";
import { Form } from "semantic-ui-react";

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

const HiddenRadioInput = styled.input.attrs({ type: "radio" })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const StyledLabelRadio = styled.label`
  &&& {
    font-weight: bold;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: lightgray;
    color: black;
    border-radius: 0.5rem;
    padding: 0.2rem;
    margin: 0.2rem;
    text-align: center;
    width: 100px;
  }

  ${HiddenRadioInput}:checked + & {
    background-color: lightblue;
    color: white;
  }
`;

const StyledRadio = ({ label, id, ...props }) => {
  const [field] = useField(props);

  return (
    <>
      <HiddenRadioInput {...field} {...props} id={id} />
      <StyledLabelRadio htmlFor={id}>
        {label}
      </StyledLabelRadio>
    </>
  );
};

const StyledRadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  gap: 0.3rem;

`;

const InputTime = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const timeSlots = Array.from({ length: 17 }, (_, index) => {
    const hour = Math.floor(index / 2) + 9;
    const minute = index % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  return (
    <StyledDiv>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <Form.Group>
        <StyledRadioGroup>
          {timeSlots.map((time, index) => (
            <Form.Field key={time}>
              <StyledRadio
                type="radio"
                label={time}
                id={`radio-${index}`} // Use a unique id for each radio input
                name={field.name}
                value={time}
                checked={field.value === time}
                onChange={() => field.onChange({ target: { name: field.name, value: time } })}
              />
            </Form.Field>
          ))}
        </StyledRadioGroup>
      </Form.Group>
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </StyledDiv>
  );
};

export default InputTime;
