import React from "react";
import { useField } from "formik";
import styled from "styled-components";
import { Label } from "semantic-ui-react";

const StyledDiv = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: #e53935;
  margin-top: 0.25rem;
`;

const InputTime = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const timeSlots = Array.from({ length: 17 }, (_, index) => {
    const hour = Math.floor(index / 2) + 9;
    const minute = index % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  return (
    <StyledDiv>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <Label.Group
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid lightgray",
        }}
      >
        {timeSlots.map((time) => (
          <Label
            key={time}
            onClick={() => {
              if (field.value === time) {
                helpers.setValue(null);
              } else {
                helpers.setValue(time);
              }
            }}
            style={{
              cursor: "pointer",
              margin: "4px",
              width: "100px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: field.value === time ? "#0E6EB8" : "lightgray",
              color: field.value === time ? "#fff" : "inherit",
            }}
          >
            {`${time}:00`}
          </Label>
        ))}
      </Label.Group>

      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </StyledDiv>
  );
};

export default InputTime;
