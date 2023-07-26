import React, { useState, useEffect } from "react";
import {
  Container, Segment, Icon, Image, Button,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { format, getHours, getMinutes } from "date-fns";

import calendar from "images/calendar.png";
import { getAppointmentBySlugPublic, updateStatusPublic } from "api/appointments";
import Loader from "components/Loader";
import { STATUS } from "utils/constants";

const StyledContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3rem
  }
`;

const StyledErrorContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 3rem
  }
`;

const StyledDiv = styled.div`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3rem;
    border: 0.1rem solid lightgray;
    border-radius: 0.3rem;
    padding: 2rem;
  }
`;

const StyledHeader = styled.label`
  margin: 0.5rem;
`;
const StyledInfo = styled.label`
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 0.5rem;
`;

const StyledDate = styled.label`
  color: gray;
  margin: 1.5rem;
`;

const ButtonDiv = styled.div`
&& {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}
`;

const AppointmentConfirmation = () => {
  const [loading, setLoading] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(false);

  const [appointment, setAppointment] = useState("");
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [time, setTime] = useState({});

  const { slug } = useParams();

  const formatTime = (hours, minutes) => {
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  const handleAppointmentAction = async (s) => {
    setIsLoadingStatus(s);
    try {
      const data = {
        status: s,
      };
      await updateStatusPublic(slug, data);
      setStatus(s);
    } catch (er) {
      setError("Unable to confirm appointment");
    } finally {
      setIsLoadingStatus(null);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const responseAppointment = await getAppointmentBySlugPublic(slug);
        setAppointment(responseAppointment);
        setPatient(responseAppointment.patient);
        setDoctor(responseAppointment.doctor);
        setStatus(responseAppointment.status);
        setTime({
          startHours: formatTime(getHours(new Date(responseAppointment.startDate)),
            getMinutes(new Date(responseAppointment.startDate))),
          endHours: formatTime(getHours(new Date(responseAppointment.endDate)),
            getMinutes(new Date(responseAppointment.endDate))),
        });
      } catch (e) {
        setError("Unable to fetch appointment");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (error) {
    return (
      <StyledErrorContainer>
        <Segment inverted color="red" secondary>
          <Icon name="times circle outline" />
          { error }
        </Segment>
      </StyledErrorContainer>
    );
  }

  return (
    <StyledContainer>
      <Loader active={loading}>Loading</Loader>
      {appointment && patient && (
        <StyledDiv>
          <Image style={{ height: "auto", maxWidth: "200px" }} src={calendar} size="tiny" />
          <StyledHeader>{`Dear ${patient.firstName} , you have a new appointment scheduled.`}</StyledHeader>

          <StyledInfo>
            {`${time.startHours} - ${time.endHours} | Dr. ${doctor.firstName} ${doctor.lastName}`}
          </StyledInfo>

          {appointment.isVirtual && (
            <a href={appointment.link}>{appointment.link}</a>
          )}

          <StyledDate>{format(new Date(appointment.startDate), "EEEE, do MMM yyyy")}</StyledDate>

          {status === STATUS.PENDING ? (
            <ButtonDiv>
              <Button
                loading={isLoadingStatus === STATUS.CONFIRMED}
                basic
                color="blue"
                onClick={() => handleAppointmentAction(STATUS.CONFIRMED)}
              >
                Confirm
              </Button>
              <Button
                loading={isLoadingStatus === STATUS.CANCELED}
                basic
                color="red"
                onClick={() => handleAppointmentAction(STATUS.CANCELED)}
              >
                Cancel
              </Button>
            </ButtonDiv>

          ) : (
            <Button
              primary
              disabled
            >
              {status === STATUS.CONFIRMED ? "Confirmed" : "Canceled"}

            </Button>
          )}
        </StyledDiv>
      )}
    </StyledContainer>
  );
};

export default AppointmentConfirmation;
