import React from "react";
import { useField } from "formik";
import styled from "styled-components";
import { Form, Radio } from "semantic-ui-react";

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

const StyledRadio = styled(Radio)`
&&& label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.1rem;
  margin: 0.3rem;
  text-align: center;
  width: 100px;
}
`;

const StyledRadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
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
          {timeSlots.map((time) => (
            <Form.Field key={time}>
              <StyledRadio
                label={`${time}`}
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
