import React from "react";
import { Image, Divider, Label, List, Header } from "semantic-ui-react";
import styled from "styled-components";

const DoctorImage = styled(Image)`
  background-color: #f1f1f1;
  padding: 10px;
  flex: 2;
`;

const DoctorDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  padding: 30px 20px;
  flex: 8;
  text-transform: capitalize;
`;

const DoctorBox = styled.div`
  display: flex;
  height: 300px;
  margin: 1rem;
  border: 1px #f4f0ec solid;
  box-shadow: 5px 5px 5px #f4f0ec;
`;

const TopDetails = styled.div`
  flex: 4;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const BottomDetails = styled.div`
  flex: 2;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const DoctorCard = ({ doctor }) => (
  <DoctorBox>
    <DoctorImage src={doctor.image} size="small" />
    <DoctorDetails>
      <TopDetails>
        <Header as="h2" style={{ color: "#003153" }}>
          {`${doctor.title} ${doctor.firstName} ${doctor.lastName}`}
        </Header>
        <List style={{ color: "gray" }} horizontal>
          {doctor.practiceAreas?.map((pa) => (
            <List.Item key={pa.name}>{pa.name}</List.Item>
          ))}
        </List>
      </TopDetails>
      <Divider />
      <BottomDetails>
        {doctor.workingHours?.map((wh) => (
          <Label key={wh.day} color="blue">
            {`${wh.day} ${wh.workTimeStart}-${wh.workTimeEnd}`}
          </Label>
        ))}
      </BottomDetails>
    </DoctorDetails>
  </DoctorBox>
);

export default DoctorCard;
