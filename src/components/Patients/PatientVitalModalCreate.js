import React, { useState, useEffect } from "react";
import {
  Container, Segment, Icon, Modal, Button,
} from "semantic-ui-react";
import * as Yup from "yup";
import { Form } from "formik-semantic-ui-react";
import { Formik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import { getVitals } from "api/vitals";
import InputField from "components/InputField";
import InputSelect from "components/InputSelect";

const StyledContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 2rem;
  }
`;

const StyledTopContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: row;
  gap: 5rem;

`;

const ButtonGroup = styled.div`
  padding-top: 2rem;
  padding-bottom: 1.5rem;
  float: right;
`;

const TopInfo = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
`;

const initialValues = {
  vital: "",
  value: "",
};

const PatientVitalModalCreate = ({ show, handleClick, handleCreate }) => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [vitals, setVitals] = useState([]);
  let vitalOptions;
  let vitalValues;
  let validationSchema;

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const filters = {
          search: "",
        };
        const response = await getVitals(filters);

        vitalOptions = Object.keys(response).map((key) => ({
          key,
          value: response[key].id,
          text: response[key].name,
        }));

        vitalValues = vitalOptions.map((option) => option.text);

        validationSchema = Yup.object({
          vital: Yup.string().oneOf(vitalValues).required("Please select vital"),
          value: Yup.string()
            .typeError("Name value must be a string")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        });

        setVitals(vitalOptions);
      } catch (e) {
        setError("Unable to fetch vitals");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    handleCreate(values);
    handleClick();
    setLoading(false);
  };

  if (error) {
    return (
      <StyledContainer>
        <Segment inverted color="red" secondary>
          <Icon name="times circle outline" />
          { error }
        </Segment>
      </StyledContainer>
    );
  }

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
                  <InputSelect
                    label="Vitals"
                    name="vital"
                    options={vitals}
                    placeholder="Please select vital"
                  />
                  <InputField
                    label="Value"
                    name="value"
                    type="text"
                    placeholder="Please enter value"
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

export default PatientVitalModalCreate;
