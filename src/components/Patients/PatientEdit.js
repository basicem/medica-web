import React, { useEffect, useState } from "react";
import {
  Container, Icon, Image, Divider, Breadcrumb, Loader, Segment,
} from "semantic-ui-react";
import { Form, SubmitButton } from "formik-semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  useNavigate, Link, useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { format } from "date-fns";

import { editPatient, getPatientBySlug } from "api/patients";
import InputField from "components/InputField";
import placeholder from "images/placeholder.png";
import { convertToBase64 } from "helpers/helpers";

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

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

const StyledErrorMessage = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #e53935;
    margin-top: 0.25rem;
`;

const StyledButton = styled(SubmitButton)`
    padding-top: 1rem;
    float: right;
`;

const ImageButton = styled.label`
  border: 1px solid white;
  border-radius: 6px;
  display: inline-block;
  padding: 8px 12px;
  background-color: #00b3b3;
  color: white;
  margin: 1rem 1rem 1rem 1rem;
`;

const validationSchema = Yup.object({
  image: Yup.string()
    .test(
      "empty-check",
      "Image is required",
      (value) => value !== placeholder,
    ),
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  dateOfBirth: Yup.date()
    .nullable()
    .required("Required"),
  address: Yup.string()
    .max(15, "Must be 20 characters or less")
    .required("Required"),
  city: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  phoneNumber: Yup.string()
    .matches(/^[+]*[-\s/0-9]*$/)
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const PatientEdit = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [patient, setPatient] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await getPatientBySlug(slug);
        setPatient(response);
      } catch (e) {
        setError("Unable to fetch patient");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  const handleFileUpload = async (e, setFieldValue) => {
    const file = e.target.files[0];

    if (file) {
      const base64 = await convertToBase64(file);
      setFieldValue("image", base64);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = {
        image: values.image,
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        address: values.address,
        city: values.city,
        phoneNumber: values.phoneNumber,
        email: values.email,
      };
      await editPatient(patient.id, data);
      toast.success("Patient updated!");
      navigate("/patients/");
    } catch (err) {
      toast.error("Unable to update patient!");
    } finally {
      setSubmitting(false);
    }
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
    <StyledContainer>
      <Loader active={loading}>Loading</Loader>
      <StyledHeader>Edit patient</StyledHeader>
      <Breadcrumb>
        <Breadcrumb.Section link><Link to="/patients">Patients</Link></Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link><Link to={`/patients/${slug}`}>Patient details</Link></Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>Edit patient</Breadcrumb.Section>
      </Breadcrumb>
      <Divider />
      {patient
      && (
      <Formik
        initialValues={{ ...patient, dateOfBirth: format(new Date(patient.dateOfBirth), "yyyy-MM-dd"), image: encodeURI(Buffer.from(patient.image.data)) }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

        {({
          values, touched, errors, setFieldValue,
        }) => (
          <Form>
            <StyledTopContainer>
              <ImageContainer>
                <Image style={{ height: "auto", maxWidth: "300px" }} src={values.image} size="medium" circular />
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
                    onChange={(e) => handleFileUpload(e, setFieldValue)}
                    hidden
                  />
                </ImageButton>
                {touched.image && errors.image ? (
                  <StyledErrorMessage>{errors.image}</StyledErrorMessage>
                ) : null}
              </ImageContainer>
              <TopInfo>
                <InputField
                  label="First Name"
                  name="firstName"
                  type="text"
                />

                <InputField
                  label="Last Name"
                  name="lastName"
                  type="text"
                />

                <InputField
                  label="Email"
                  name="email"
                  type="text"
                />

                <InputField
                  label="Date Of Birth"
                  name="dateOfBirth"
                  type="date"
                />

                <InputField
                  label="Address"
                  name="address"
                  type="text"
                />

                <InputField
                  label="City"
                  name="city"
                  type="text"
                />

                <InputField
                  label="Phone Number"
                  name="phoneNumber"
                  type="text"
                />
              </TopInfo>
            </StyledTopContainer>
            <StyledButton primary style={{ width: "120px" }} type="submit">Update</StyledButton>
          </Form>
        )}
      </Formik>
      )}

    </StyledContainer>
  );
};

export default PatientEdit;
