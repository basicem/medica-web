import React from "react";
import {
  Container, Divider, Breadcrumb,
} from "semantic-ui-react";
import { Form, SubmitButton } from "formik-semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import { postPatient } from "api/patients";
import InputField from "components/InputField";
import placeholder from "images/placeholder.png";
import { convertToBase64 } from "helpers/helpers";
import AvatarField from "components/AvatarField";

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

const StyledButton = styled(SubmitButton)`
    padding-top: 1rem;
    float: right;
`;

const initialValues = {
  image: placeholder,
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  address: "",
  city: "",
  phoneNumber: "",
  email: "",
};

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

const PatientCreate = () => {
  const navigate = useNavigate();

  const handleFileUpload = async (e, setFieldValue) => {
    const file = e.target.files[0];

    if (file) {
      const base64 = await convertToBase64(file);
      setFieldValue("image", base64);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await postPatient({
        image: values.image,
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        address: values.address,
        city: values.city,
        phoneNumber: values.phoneNumber,
        email: values.email,
      });
      toast.success("New patient added!");
      navigate("/patients/");
    } catch (error) {
      toast.error("Unable to create patient!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StyledContainer>
      <StyledHeader>Create patient</StyledHeader>
      <Breadcrumb>
        <Breadcrumb.Section link><Link to="/patients">Patients</Link></Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>Create patient</Breadcrumb.Section>
      </Breadcrumb>
      <Divider />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values, setFieldValue,
        }) => (
          <Form>
            <StyledTopContainer>
              <ImageContainer>
                <AvatarField
                  label="Image"
                  name="image"
                  type="image"
                  value={values.image}
                  onChange={(e) => handleFileUpload(e, setFieldValue)}
                />
              </ImageContainer>
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
                  label="Email"
                  name="email"
                  type="text"
                  placeholder="janedoe@gmail.com"
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
                  placeholder="Sarajevska 17"
                />

                <InputField
                  label="City"
                  name="city"
                  type="text"
                  placeholder="Sarajevo"
                />

                <InputField
                  label="Phone Number"
                  name="phoneNumber"
                  type="text"
                  placeholder="061-123-123"
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

export default PatientCreate;
