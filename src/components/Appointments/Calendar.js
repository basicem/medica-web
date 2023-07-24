import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import interactionPlugin from "@fullcalendar/interaction";
import {
  Container,
  Icon, Segment, Divider,
} from "semantic-ui-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Loader from "components/Loader";
import { getAppointmentsByDoctor } from "api/appointments";

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 0.5rem;
`;

const StyledHeader = styled.h1`
  margin-bottom: 1rem;
  margin-top: 0;
`;

const Calendar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [events, setEvents] = useState();
  const navigate = useNavigate();

  const handleDateClick = (arg) => {
    navigate("/appointments/create", { state: { date: arg.dateStr } });
  };

  const handleEventClick = (selectedEvent) => {
    navigate(`/appointments/${selectedEvent.extendedProps.slug}`);
  };

  const fetchEvents = async (info) => {
    const { start, end } = info;
    const filters = {
      start,
      end,
    };
    try {
      setLoading(true);
      const response = await getAppointmentsByDoctor(filters);
      const transformedEvents = response.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        slug: event.slug,
        color: event.isConfirmed ? "lightgreen" : "lightcoral",
        start: event.startDate,
        end: event.endDate,
      }));
      setEvents(transformedEvents);
    } catch (e) {
      setError("Unable to fetch appointments");
    } finally {
      setLoading(false);
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
      <Loader isActive={loading} inverted />
      <StyledHeader>Appointments</StyledHeader>
      <Divider />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={(info) => handleEventClick(info.event)}
        eventSources={[{ events }]}
        lazyFetching
        datesSet={(arg) => fetchEvents(arg)}
        buttonText={{
          today: "Today",
        }}
        height={600}
      />
    </StyledContainer>
  );
};

export default Calendar;
