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

const validationSchema = Yup.object({
  role: Yup.string()
    .required("Required")
    .oneOf(["Admin", "Doctor"]),
});

function UserModalEdit() {
  const {
    selectedUser,
    updateLoading, visibleModalEdit, handleEditUser,
    handleCloseEditModal,
  } = useUsers();

  const handleSubmit = async (values) => {
    handleEditUser(values);
  };

  const handleChange = async (data, setFieldValue) => {
    setFieldValue("isActive", data.checked);
  };

  const handleChangeVerified = async (data, setFieldValue) => {
    setFieldValue("isVerified", data.checked);
  };

  if (!selectedUser) { return null; }

  return (
    <Modal
      onClose={handleCloseEditModal}
      open={visibleModalEdit}
    >
      <Modal.Header>
        Edit user
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>
            {" "}
            {`${selectedUser.firstName} ${selectedUser.lastName}`}
          </Header>
          <Label color="blue">
            <Icon name="mail outline" />
            {`${selectedUser.email}`}
          </Label>
        </Modal.Description>
        {selectedUser
        && (

        <Formik
          initialValues={selectedUser}
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

                  <InputCheckbox checked={values.isVerified} name="isVerified" onChange={(e, data) => handleChangeVerified(data, setFieldValue)}>
                    Verified
                  </InputCheckbox>

                </TopInfo>
              </StyledTopContainer>
              <Modal.Actions>
                <ButtonGroup>
                  <Button color="grey" onClick={handleCloseEditModal} disabled={updateLoading}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    content="Update"
                    positive
                    disabled={updateLoading}
                    loading={updateLoading}
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
