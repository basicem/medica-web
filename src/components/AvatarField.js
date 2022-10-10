import React from "react";
import { useField } from "formik";
import styled from "styled-components";
import { Icon, Image } from "semantic-ui-react";

const ImageButton = styled.label`
  border: 1px solid white;
  border-radius: 6px;
  display: inline-block;
  padding: 8px 12px;
  background-color: #00b3b3;
  color: white;
  margin: 1rem 1rem 1rem 1rem;
`;

const StyledErrorMessage = styled.div`
    font-size: 12px;
    color: #e53935;
    margin-top: 0.25rem;
`;

const AvatarField = ({ label, ...props }) => {
  const [meta] = useField(props);
  return (
    <>
      <Image style={{ height: "auto", maxWidth: "300px" }} src={props.value} size="medium" circular />
      <ImageButton
        variant="contained"
        component="label"
      >
        <Icon name="file image outline" />
        Choose Avatar
        <input
          label="Image"
          name="image"
          type="file"
          accept=".jpeg, .png, .jpg"
          hidden
          onChange={props.onChange}
        />
      </ImageButton>
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

export default AvatarField;
