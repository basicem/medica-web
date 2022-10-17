import React from "react";
import {
  Button, Modal,
} from "semantic-ui-react";
import styled from "styled-components";
import * as Yup from "yup";
import { Form } from "formik-semantic-ui-react";
import { Formik } from "formik";

import InputField from "components/InputField";
import InputSelect from "components/InputSelect";
import InputCheckbox from "components/InputCheckbox";
import { useUsers } from "./UsersContext";

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

const initialValues = {
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  role: "",
  isActive: false,
  isVerified: false,

};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters or more")
    .required("Required"),
  role: Yup.string()
    .required("Required")
    .oneOf(["Admin", "Doctor"]),
});

function UserModalCreate() {
  const {
    visibleModalCreate, createLoading, handleCreateUser, handleCloseCreateModal,
  } = useUsers();

  const handleSubmit = async (values) => {
    handleCreateUser(values);
  };

  const handleChange = async (data, setFieldValue) => {
    setFieldValue("isActive", data.checked);
  };

  return (
    <Modal
      onClose={handleCloseCreateModal}
      open={visibleModalCreate}
    >
      <Modal.Header>Add user</Modal.Header>
      <Modal.Content>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            setFieldValue,
          }) => (
            <Form>
              <StyledTopContainer>
                <TopInfo>
                  <InputField
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="Jane"
                  />

                  <InputField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                  />

                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="***********"
                  />

                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="janedoe@gmail.com"
                  />

                  <InputSelect
                    label="Role"
                    name="role"
                  >
                    <option value="">Please select role</option>
                    <option value="Admin">Admin</option>
                    <option value="Doctor">Doctor</option>
                  </InputSelect>

                  <InputCheckbox name="isActive" onChange={(e, data) => handleChange(data, setFieldValue)}>
                    Active
                  </InputCheckbox>
                </TopInfo>
              </StyledTopContainer>
              <Modal.Actions>
                <ButtonGroup>
                  <Button color="grey" onClick={handleCloseCreateModal} disabled={createLoading}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    content="Create"
                    positive
                    disabled={createLoading}
                    loading={createLoading}
                  />
                </ButtonGroup>
              </Modal.Actions>
            </Form>
          )}
        </Formik>
      </Modal.Content>

    </Modal>
  );
}

export default UserModalCreate;
