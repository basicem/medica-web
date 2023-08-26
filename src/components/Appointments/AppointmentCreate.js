import React, { useState } from "react";
import {
  Container, Divider, Breadcrumb, Dropdown, FormField, Segment, Icon, Message,
} from "semantic-ui-react";
import { Form, SubmitButton } from "formik-semantic-ui-react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import debounce from "lodash.debounce";

import InputField from "components/InputField";
import InputSelect from "components/InputSelect";
import InputLink from "components/InputLink";
import InputTime from "components/InputTime";
import InputCheckbox from "components/InputCheckbox";

import { searchPatients } from "api/patients";
import { postAppointment } from "api/appointments";
import { STATUS } from "utils/constants";

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

const RemindersTop = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-top: 1rem;
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
  dayBeforeAppointment24Hours: Yup.boolean(),
  dayOfAppointment: Yup.boolean(),
  link: Yup.string().when("isVirtual", {
    is: true,
    then: Yup.string().url("Invalid URL").required("Meeting link is required"),
  }),
});

const optionsArray = [
  { value: "15 minutes", text: "15 minutes" },
  { value: "30 minutes", text: "30 minutes" },
  { value: "45 minutes", text: "45 minutes" },
  { value: "60 minutes", text: "60 minutes" },
  { value: "90 minutes", text: "90 minutes" },
  { value: "120 minutes", text: "120 minutes" },
];

const AppointmentCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const date = location.state?.date;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [results, setResults] = useState([]);

  const initialValues = {
    title: "",
    description: "",
    patient: "",
    date,
    time: "",
    duration: "",
    isVirtual: false,
    dayBeforeAppointment24Hours: false,
    dayOfAppointment: false,
    link: "",
    isConfirmed: false,
  };

  const getReminders = (values) => {
    const reminders = [];
    const [hours, minutes] = values.time.split(":");
    const appointmentDate = new Date(date);
    appointmentDate.setHours(parseInt(hours, 10));
    appointmentDate.setMinutes(parseInt(minutes, 10));

    // 24 hours before appointment
    if (values.dayBeforeAppointment24Hours) {
      const combinedDateTimeReminder = new Date(date);
      combinedDateTimeReminder.setDate(combinedDateTimeReminder.getDate() - 1);
      combinedDateTimeReminder.setHours(parseInt(hours, 10));
      combinedDateTimeReminder.setMinutes(parseInt(minutes, 10));

      const timeDifference = appointmentDate - combinedDateTimeReminder;

      const minutesDifference = timeDifference / (1000 * 60);

      reminders.push(minutesDifference);
    }

    // 08:00 day of appointment
    if (values.dayOfAppointment) {
      const combinedDateTimeReminder = new Date(date);
      combinedDateTimeReminder.setHours(parseInt("08", 10));
      combinedDateTimeReminder.setMinutes(parseInt("00", 10));

      const timeDifference = appointmentDate - combinedDateTimeReminder;

      const minutesDifference = timeDifference / (1000 * 60);

      reminders.push(minutesDifference);
    }

    return reminders;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const reminders = getReminders(values);

      await postAppointment({
        title: values.title,
        description: values.description,
        patientId: values.patient,
        date: values.date,
        time: values.time,
        duration: values.duration,
        isVirtual: values.isVirtual,
        link: values.link,
        status: STATUS.PENDING,
        reminders,
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
    debouncedSearch(searchQuery);
  };

  const handleChange = async (data, setFieldValue) => {
    setFieldValue(data.name, data.checked);
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

                <RemindersTop>Choose reminders</RemindersTop>
                <InputCheckbox name="dayBeforeAppointment24Hours" onChange={(e, data) => handleChange(data, setFieldValue)}>
                  24 Hours Before Appointment
                </InputCheckbox>

                <InputCheckbox name="dayOfAppointment" onChange={(e, data) => handleChange(data, setFieldValue)}>
                  08:00 Day Of Appointment
                </InputCheckbox>

                <Message info>
                  On checked time, reminder emails will be sent!
                </Message>

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
                  options={optionsArray}
                  placeholder="Please select duration"
                />

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
            </StyledTopContainer>
            <StyledButton primary style={{ width: "120px" }} type="submit">Create</StyledButton>
          </Form>
        )}
      </Formik>

    </StyledContainer>
  );
};

export default AppointmentCreate;
