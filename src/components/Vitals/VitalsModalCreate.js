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

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
`;

const initialValues = {
  name: "",
  unitMeasurement: "",
  lowerLimit: "",
  upperLimit: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .typeError("Name value must be a string")
    .max(15, "Must be 15 characters or less")
    .required("Please enter name"),
  unitMeasurement: Yup.string()
    .required("Please enter unit measurement"),
  lowerLimit: Yup.number().typeError("Lower limit must be a number").required("Please select lower limit"),
  upperLimit: Yup.number().typeError("Upper limit must be a number").required("Please select upper limit"),
});

const VitalsModalCreate = ({ show, handleClick, handleCreate }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    await handleCreate(values);
    handleClick();
    setLoading(false);
  };

  return (
    <Modal
      open={show}
      onClose={handleClick}
    >
      <Modal.Header>Add Vital</Modal.Header>
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
                    placeholder="Weight"
                  />
                  <InputField
                    label="Unit Measurement"
                    name="unitMeasurement"
                    type="text"
                    placeholder="kg"
                  />
                  <FlexContainer>
                    <InputField
                      label="Lower Limit"
                      name="lowerLimit"
                      type="text"
                      placeholder="0"
                    />
                    <InputField
                      label="Upper Limit"
                      name="upperLimit"
                      type="text"
                      placeholder="700"
                    />
                  </FlexContainer>

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

export default VitalsModalCreate;
