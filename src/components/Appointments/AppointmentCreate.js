import React, { useState } from "react";
import {
  Container, Divider, Breadcrumb, Dropdown, FormField, Segment, Icon, Input,
} from "semantic-ui-react";
import { Form, SubmitButton } from "formik-semantic-ui-react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { parseISO, format } from "date-fns";

import InputField from "components/InputField";
import InputSelect from "components/InputSelect";
import InputLink from "components/InputLink";
import InputTime from "components/InputTime";
import InputCheckbox from "components/InputCheckbox";

import { searchPatients } from "api/patients";
import { postAppointment } from "api/appointments";

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

const StyledLabel = styled.label`
    font-weight: bold;
`;

const StyledDivSearch = styled.div`
    width: 100%;
    margin-top: 1rem;
`;

const StyledSearch = styled.div`
  && {
    display: flex;
    align-items: center;
  }
`;

const AvatarImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const HeaderText = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const SubheaderText = styled.div`
  font-size: 12px;
  font-weight: normal;
`;

const validationSchema = Yup.object({
  title: Yup.string().nullable().required("Required"),
  description: Yup.string().nullable().required("Required"),
  patient: Yup.string().nullable().required("Required"),
  date: Yup.date()
    .nullable()
    .required("Required"),
  time: Yup.string().nullable().required("Required"),
  duration: Yup.string()
    .required("Required")
    .oneOf(["15 minutes", "30 minutes", "45 minutes", "60 minutes", "90 minutes", "120 minutes"]),
  isVirtual: Yup.boolean(),
  link: Yup.string().when("isVirtual", {
    is: true,
    then: Yup.string().url("Invalid URL").required("Meeting link is required"),
  }),
});

const AppointmentCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const date = location.state?.date;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const initialValues = {
    title: "",
    description: "",
    patient: "",
    date,
    time: "",
    duration: "",
    isVirtual: false,
    link: "",
    isConfirmed: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await postAppointment({
        title: values.title,
        description: values.description,
        patientId: values.patient,
        date: values.date,
        time: values.time,
        duration: values.duration,
        isVirtual: values.isVirtual,
        link: values.link,
        isConfirmed: false,
      });
      toast.success("New appointment added!");
      navigate("/appointments/");
    } catch (err) {
      toast.error("Unable to create appointment!");
    } finally {
      setSubmitting(false);
    }
  };

  const debouncedSearch = debounce(async (query) => {
    setLoading(true);
    let modifiedResults = [];
    try {
      const filters = {
        search: query,
      };
      const response = await searchPatients(filters);
      const users = response.rows;
      modifiedResults = users.map((user) => ({
        id: user.id,
        image: user.image,
        text: `${user.firstName} ${user.lastName}`,
        value: user.id,
        content: (
          <StyledSearch>
            {user.image && <AvatarImage src={encodeURI(Buffer.from(user.image))} />}
            <div>
              <HeaderText>{`${user.firstName} ${user.lastName}`}</HeaderText>
              <SubheaderText>{user.email}</SubheaderText>
            </div>
          </StyledSearch>
        ),
      }));
      setResults(modifiedResults);
      setError("");
    } catch (e) {
      setError("Unable to fetch patients");
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleSearchChange = (e, { searchQuery }) => {
    setSelectedItem(null);
    debouncedSearch(searchQuery);
  };

  const handleChange = async (data, setFieldValue) => {
    setFieldValue("isVirtual", data.checked);
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
          values, setFieldValue,
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

                <InputField
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="The meeting is..."
                />

                <StyledDivSearch>
                  <StyledLabel>Patient</StyledLabel>
                  <Field name="patient">
                    {({ field }) => (
                      <FormField
                        {...field}
                        control={Dropdown}
                        name="patient"
                        fluid
                        selection
                        search
                        options={results}
                        placeholder="Select Patient"
                        onChange={(e, { value: selectedValue }) => {
                          setFieldValue("patient", selectedValue);
                        }}
                        onSearchChange={handleSearchChange}
                        loading={loading}
                      />
                    )}

                  </Field>
                </StyledDivSearch>

                <InputCheckbox name="isVirtual" onChange={(e, data) => handleChange(data, setFieldValue)}>
                  Virtual
                </InputCheckbox>

                {values.isVirtual && (
                  <InputLink
                    name="link"
                    value={values.link}
                  />
                )}

              </StyledDiv>
              <StyledDiv>

                <InputField
                  label="Select date"
                  name="date"
                  type="date"
                  value={values.date}
                />

                <InputTime
                  label="Select time"
                  name="time"
                  placeholder="11:00"
                />

                <InputSelect
                  label="Duration"
                  name="duration"
                >
                  <option value="">Please select duration</option>
                  <option value="15 minutes">15 minutes</option>
                  <option value="30 minutes">30 minutes</option>
                  <option value="45 minutes">45 minutes</option>
                  <option value="60 minutes">60 minutes</option>
                  <option value="90 minutes">90 minutes</option>
                  <option value="120 minutes">120 minutes</option>
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
