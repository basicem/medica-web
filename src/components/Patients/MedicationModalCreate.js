import React, { useState } from "react";
import {
  Button, Modal,
} from "semantic-ui-react";
import styled from "styled-components";
import * as Yup from "yup";
import { Form } from "formik-semantic-ui-react";
import { Formik } from "formik";

import InputField from "components/InputField";

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
  name: "",
  dose: "",
  frequency: "",
  prescribedOn: new Date().toISOString(),
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  dose: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  frequency: Yup.string()
    .matches(
      /^(?:(?:\d+\s)?(?:po|per os|by mouth|bid|tid|qid|hs|prn|stat|ac|pc)\b)|\w+$/i,
      "Invalid frequency format",
    )
    .required("Required"),
});

const MedicationModalCreate = ({ show, handleClick, handleCreate }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    handleCreate(values);
    handleClick();
    setLoading(false);
  };

  return (
    <Modal
      open={show}
      onClose={handleClick}
    >
      <Modal.Header>Add Medication</Modal.Header>
      <Modal.Content>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <StyledTopContainer>
                <TopInfo>
                  <InputField
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Ibuprofen"
                  />

                  <InputField
                    label="Dose"
                    name="dose"
                    type="text"
                    placeholder="2 mg"
                  />

                  <InputField
                    label="Frequency"
                    name="frequency"
                    type="text"
                    placeholder="bid"
                  />

                </TopInfo>
              </StyledTopContainer>
              <Modal.Actions>
                <ButtonGroup>
                  <Button color="grey" onClick={handleClick} disabled={loading}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    content="Create"
                    positive
                    disabled={loading}
                    loading={loading}
                  />
                </ButtonGroup>
              </Modal.Actions>
            </Form>
          )}
        </Formik>
      </Modal.Content>

    </Modal>
  );
};

export default MedicationModalCreate;
