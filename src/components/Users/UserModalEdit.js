import React from "react";
import {
  Button, Modal, Header, Label, Icon,
} from "semantic-ui-react";
import styled from "styled-components";
import * as Yup from "yup";
import { Form } from "formik-semantic-ui-react";
import { Formik } from "formik";

import InputSelect from "components/InputSelect";
import InputCheckbox from "components/InputCheckbox";

const StyledTopContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 5rem;
`;

const TopInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

const ButtonGroup = styled.div`
  padding-top: 2rem;
  padding-bottom: 1.5rem;
  float: right;
`;

const validationSchema = Yup.object({
  role: Yup.string()
    .required("Required")
    .oneOf(["Admin", "Doctor"]),
});

function UserModalEdit({
  user, show, handleEditUser, handleCancel,
}) {
  const handleSubmit = async (values, { setSubmitting }) => {
    handleEditUser(values, setSubmitting);
  };

  const handleChange = async (data, setFieldValue) => {
    setFieldValue("isActive", data.checked);
  };

  if (!user) { return null; }

  return (
    <Modal
      onClose={handleCancel}
      open={show}
    >
      <Modal.Header>
        Edit user
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>
            {" "}
            {`${user.firstName} ${user.lastName}`}
          </Header>
          <Label color="blue">
            <Icon name="mail outline" />
            {`${user.email}`}
          </Label>
        </Modal.Description>
        {user
        && (

        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values, setFieldValue,
          }) => (
            <Form>
              <StyledTopContainer>
                <TopInfo>
                  <InputSelect
                    label="Role"
                    name="role"
                  >
                    <option value="">Please select role</option>
                    <option value="Admin">Admin</option>
                    <option value="Doctor">Doctor</option>
                  </InputSelect>

                  <InputCheckbox checked={values.isActive} name="isActive" onChange={(e, data) => handleChange(data, setFieldValue)}>
                    Active
                  </InputCheckbox>

                </TopInfo>
              </StyledTopContainer>
              <Modal.Actions>
                <ButtonGroup>
                  <Button color="grey" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    content="Update"
                    positive
                  />
                </ButtonGroup>
              </Modal.Actions>
            </Form>
          )}
        </Formik>
        )}
      </Modal.Content>

    </Modal>
  );
}

export default UserModalEdit;
