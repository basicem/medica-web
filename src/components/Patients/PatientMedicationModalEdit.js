import React, { useState } from "react";
import {
  Button, Modal,
} from "semantic-ui-react";
import styled from "styled-components";
import * as Yup from "yup";
import { Form } from "formik-semantic-ui-react";
import { Formik } from "formik";

import { DOSE_MEASUREMENT, FREQUENCY } from "utils/constants";

import InputField from "components/InputField";
import InputSelect from "components/InputSelect";

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

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
`;

const doseOptions = Object.keys(DOSE_MEASUREMENT).map((key) => ({
  key,
  value: key,
  text: DOSE_MEASUREMENT[key],
}));

const frequencyOptions = Object.keys(FREQUENCY).map((key) => ({
  key,
  value: key,
  text: FREQUENCY[key],
}));

const frequencyValues = frequencyOptions.map((option) => option.text);

const doseMeasurementValues = doseOptions.map((option) => option.text);

const validationSchema = Yup.object({
  name: Yup.string()
    .typeError("Name value must be a string")
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  doseValue: Yup.number()
    .typeError("Dose value must be a number")
    .required("Required"),
  doseMeasurement: Yup.string().oneOf(doseMeasurementValues).required("Please select dose measurement"),
  frequency: Yup.string().oneOf(frequencyValues).required("Please select frequency"),
});

const PatientMedicationModalEdit = ({
  selectedMedication, show, handleClick, handleEdit,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    handleEdit(values);
  };

  return (
    <Modal
      open={show}
      onClose={handleClick}
    >
      <Modal.Header>Edit Medication</Modal.Header>
      <Modal.Content>
        {selectedMedication
        && (
        <Formik
          initialValues={selectedMedication}
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
                  <FlexContainer>
                    <InputField
                      label="Dose Value"
                      name="doseValue"
                      type="text"
                      placeholder="100"
                    />
                    <InputSelect
                      label="Dose Measurement"
                      name="doseMeasurement"
                      options={doseOptions}
                      placeholder="Please select dose measurement"
                    />
                  </FlexContainer>

                  <InputSelect
                    label="Frequency"
                    name="frequency"
                    options={frequencyOptions}
                    placeholder="Please select frequency"
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
                    content="Update"
                    positive
                    disabled={loading}
                    loading={loading}
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
};

export default PatientMedicationModalEdit;
