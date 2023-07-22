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
import { postAppointment } from "api/appointments";
import InputTime from "components/InputTime";

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

const TopInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const StyledHeader = styled.h1`
  margin-bottom: 2rem;
`;

const StyledButton = styled(SubmitButton)`
    padding-top: 1rem;
    float: right;
`;

const validationSchema = Yup.object({
  title: Yup.string().nullable().required("Required"),
  patient: Yup.string().nullable().required("Required"),
  date: Yup.date()
    .nullable()
    .required("Required"),
  time: Yup.string().nullable().required("Required"),
  duration: Yup.string()
    .matches(/^(\d+\.?\d*) minutes$/, "Time must be in the format \"X minutes\"")
    .required("Required"),
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
              <TopInfo>
                <InputField
                  label="Title"
                  name="title"
                  type="text"
                  placeholder="Meeting with ..."
                />
                {/* prbably something else */}
                {/* like search */}
                {/* this is TODO */}
                <InputField
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

                <InputTime
                  label="Select time"
                  name="time"
                  type="text"
                  placeholder="11:00"
                />

                <InputField
                  label="Duration"
                  name="duration"
                  type="text"
                  placeholder="45 minutes"
                />
              </TopInfo>
            </StyledTopContainer>
            <StyledButton primary style={{ width: "120px" }} type="submit">Create</StyledButton>
          </Form>
        )}
      </Formik>

    </StyledContainer>
  );
};

export default AppointmentCreate;
