import React from "react";
import {
  Container, Divider, Breadcrumb,
} from "semantic-ui-react";
import { Form, SubmitButton } from "formik-semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import InputField from "components/InputField";
// import { postAppointment } from "api/appointments";
import InputSelect from "components/InputSelect";
import InputTime from "components/InputTime";
import InputSearch from "components/InputSearch";

const StyledContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 2rem;}
`;

const StyledTopContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 5rem;
`;

const StyledHeader = styled.h1`
  margin-bottom: 2rem;
`;

const StyledButton = styled(SubmitButton)`
    padding-top: 1rem;
    float: right;
`;

const StyledDiv = styled.div`
  && {
    display: flex;
    flex-direction: column;
    flex: 2;
    width: 50%;
    padding: 0.5rem;
  }
`;

const validationSchema = Yup.object({
  title: Yup.string().nullable().required("Required"),
  patient: Yup.string().nullable().required("Required"),
  date: Yup.date()
    .nullable()
    .required("Required"),
  time: Yup.string().nullable().required("Required"),
  duration: Yup.string()
    .required("Required")
    .oneOf(["15", "30", "45", "60", "90", "120"]),
});

const AppointmentCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const date = location.state?.date;

  const initialValues = {
    title: "",
    patient: "",
    date,
    time: "",
    duration: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // await postAppointment({
      //   title: values.title,
      //   patient: values.patient,
      //   date: values.date,
      //   time: values.time,
      //   duration: values.duration,
      // });
      toast.success("New patient added!");
      navigate("/appointments/");
    } catch (error) {
      toast.error("Unable to create patient!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StyledContainer>
      <StyledHeader>Create appointment</StyledHeader>
      <Breadcrumb>
        <Breadcrumb.Section link><Link to="/appointments">Appointments</Link></Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>Create appointment</Breadcrumb.Section>
      </Breadcrumb>
      <Divider />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
        }) => (
          <Form>
            <StyledTopContainer>
              <StyledDiv>
                <InputField
                  label="Title"
                  name="title"
                  type="text"
                  placeholder="Meeting with ..."
                />
                <InputSearch
                  label="Patient"
                  name="patient"
                  type="text"
                />

                <InputField
                  label="Select date"
                  name="date"
                  type="date"
                  value={values.date}
                />
              </StyledDiv>
              <StyledDiv>

                <InputTime
                  label="Select time"
                  name="time"
                  type="text"
                  placeholder="11:00"
                />

                <InputSelect
                  label="Duration"
                  name="duration"
                >
                  <option value="">Please select duration</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                </InputSelect>
              </StyledDiv>
            </StyledTopContainer>
            <StyledButton primary style={{ width: "120px" }} type="submit">Create</StyledButton>
          </Form>
        )}
      </Formik>

    </StyledContainer>
  );
};

export default AppointmentCreate;
