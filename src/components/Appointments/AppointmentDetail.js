import React, { useEffect, useState } from "react";
import {
  Container, Segment, Icon, Image, Card, Breadcrumb, Divider, Dropdown, Button,
} from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { format, getHours, getMinutes } from "date-fns";
import { toast } from "react-toastify";

import ModalUpdateAppointmentStatus from "components/Appointments/ModalUpdateAppointmentStatus";
import Loader from "components/Loader";
import { updateStatus, getAppointmentBySlug } from "api/appointments";
import { STATUS } from "utils/constants";

const StyledContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 2rem;
  }
`;

const StyledDetailsContainer = styled(Container)`
  && {
    display: flex;
  }
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

const StyledDivPatient = styled.div`
  && {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 50%;
    padding: 0.5rem;
  }
`;

const LabelName = styled.label`
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 1rem;
    margin-top: 1rem;
`;

const LabelInfo = styled.label`
    padding-bottom: 1rem;
`;

const LabelInfoDate = styled.label`
  padding-bottom: 1rem;
  color: grey;
`;

const StyledHeader = styled.h1`
  margin-bottom: 1rem;
  margin-top: 0;
`;

const StyledTitle = styled.h2`
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  flex: 4;
`;

const StyledTopDiv = styled.div`
&& {
  display: flex;
  flex-direction: row;
}
`;

const AppointmentDetail = () => {
  const { slug } = useParams();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState();
  const [patient, setPatient] = useState();

  const [time, setTime] = useState({});

  const [status, setStatus] = useState(null);
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setModal(!modal);
  };

  const handleUpdate = async () => {
    try {
      const data = {
        status,
      };
      await updateStatus(slug, data);
      setModal(!modal);
      setAppointment({ ...appointment, status });
    } catch (err) {
      toast.error("Unable to update appointment!");
    }
  };

  const handleStatusChange = (e, { value }) => {
    setModal(!modal);
    setStatus(value);
  };

  const options = [
    {
      key: "pending", text: STATUS.PENDING, value: STATUS.PENDING, disabled: true,
    },
    { key: "confirmed", text: STATUS.CONFIRMED, value: STATUS.CONFIRMED },
    { key: "canceled", text: STATUS.CANCELED, value: STATUS.CANCELED },
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        const responseAppointment = await getAppointmentBySlug(slug);
        setAppointment(responseAppointment);
        setPatient(responseAppointment.patient);
        setStatus(responseAppointment.status);
        setTime({
          startHours: getHours(new Date(responseAppointment.startDate)),
          startMinutes: getMinutes(new Date(responseAppointment.startDate)),
          endHours: getHours(new Date(responseAppointment.endDate)),
          endMinutes: getMinutes(new Date(responseAppointment.endDate)),
        });
      } catch (e) {
        setError("Unable to fetch appointment");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

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
      {appointment && patient && (
        <StyledContainer>
          <ModalUpdateAppointmentStatus selected={status} show={modal} handleClick={handleClick} handleUpdate={handleUpdate} />
          <StyledHeader>Appointment Details</StyledHeader>
          <Breadcrumb>
            <Breadcrumb.Section link><Link to="/appointments">Appointments</Link></Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Appointment Details</Breadcrumb.Section>
          </Breadcrumb>
          <Divider />
          <StyledDetailsContainer>

            <StyledDivPatient>
              <Card>
                <Image
                  src={encodeURI(Buffer.from(patient.image))}
                  wrapped
                  ui={false}
                  label={{
                    color: "blue",
                    content: "Patient",
                    icon: "stethoscope",
                    ribbon: true,
                  }}
                />
                <Card.Content>
                  <Card.Header>{`${patient.firstName} ${patient.lastName}`}</Card.Header>
                  <Card.Meta href={`mailto:${patient.email}`} style={{ color: "#0E6EB8" }}>{patient.email}</Card.Meta>
                  <Card.Description>
                    {`${patient.address}, ${patient.city}`}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Icon name="phone" />
                  {`${patient.phoneNumber}`}
                </Card.Content>
              </Card>
            </StyledDivPatient>

            <StyledDiv>
              <StyledTopDiv>
                <StyledTitle>{appointment.title}</StyledTitle>

                <Dropdown
                  selection
                  fluid
                  options={options}
                  value={appointment.status}
                  onChange={handleStatusChange}
                  style={{ alignSelf: "flex-start", flex: 1 }}
                />
              </StyledTopDiv>

              <LabelName>Description:</LabelName>
              <LabelInfo>{appointment.description}</LabelInfo>

              <Divider fitted />

              <LabelName>Date and Time:</LabelName>
              <LabelInfo>
                <Icon name="calendar alternate outline" />
                {`${time.startHours}:${time.startMinutes} - ${time.endHours}:${time.endMinutes}`}
              </LabelInfo>

              <LabelInfoDate>{format(new Date(appointment.startDate), "EEEE, do MMM yyyy")}</LabelInfoDate>

              {appointment.isVirtual
                ? (
                  <div>
                    <LabelName>Virtual: </LabelName>
                    <a href={appointment.link}>{appointment.link}</a>
                  </div>
                )
                : null}

            </StyledDiv>

          </StyledDetailsContainer>
        </StyledContainer>
      )}
    </StyledContainer>
  );
};

export default AppointmentDetail;
