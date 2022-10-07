import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container, Divider, Icon, Image, Button, Segment, Loader, Breadcrumb,
} from "semantic-ui-react";
import styled from "styled-components";

import { toast } from "react-toastify";

import { getPatientBySlug, deletePatient } from "api/patients";
import ModalDeletePatient from "components/ModalDeletePatient";

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

const StyledTopHeader = styled.div`
  display: flex;
`;
const ButtonsContainer = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TopInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

const NameHeader = styled.h1`
  color: #626262;
  margin: 0rem;
`;

const LabelName = styled.label`
    font-weight: bold;
    font-size: 15px;
`;
const LabelInfo = styled.label`
    padding-bottom: 0.5rem;
`;

const LabelContactInfo = styled.label`
  margin-top: 0.5rem;
  padding-bottom: 1rem;
  color: #7F7F7F;
`;

const StyledHeader = styled.h1`
  margin-bottom: 2rem;
  margin-top: 0;
`;

const PatientDetail = () => {
  const navigate = useNavigate();

  const { slug } = useParams();
  const [patient, setPatient] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setModal(!modal);
  };

  const handleEditClick = () => {
    navigate(`/patients/edit/${slug}`);
  };

  const handleDelete = async () => {
    try {
      await deletePatient(slug);
      toast.success("Patient deleted!");
      navigate("/patients/");
    } catch (err) {
      toast.error("Unable to delete patient!");
    } finally {
      setModal(!modal);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
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
      <StyledHeader>Patient details</StyledHeader>
      <Breadcrumb>
        <Breadcrumb.Section link><Link to="/patients">Patients</Link></Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>Patient details</Breadcrumb.Section>
      </Breadcrumb>
      <Divider />
      <ModalDeletePatient show={modal} handleClick={handleClick} handleDelete={handleDelete} />
      {patient && (
        <StyledTopContainer>
          <ImageContainer>
            <Image
              style={{ height: "auto", maxWidth: "300px" }}
              label={{
                color: "blue",
                content: "Image",
                icon: "image outline",
                ribbon: true,
              }}
              src={encodeURI(Buffer.from(patient.image))}
              size="medium"
            />
          </ImageContainer>

          <TopInfo>
            <StyledTopHeader>
              <NameHeader>{`${patient.firstName} ${patient.lastName}`}</NameHeader>
              <ButtonsContainer>
                <Button size="small" primary icon labelPosition="left" onClick={handleEditClick}>
                  <Icon name="edit outline" />
                  Edit
                </Button>
                <Button size="small" color="red" icon labelPosition="right" onClick={handleClick}>
                  Delete
                  <Icon name="trash alternate outline" />
                </Button>
              </ButtonsContainer>
            </StyledTopHeader>

            <LabelInfo basic>
              <Icon name="map marker alternate" />
              {patient.city}
            </LabelInfo>

            <Divider fitted />

            <LabelContactInfo>CONTACT INFORMATION</LabelContactInfo>

            <LabelName>Email:</LabelName>
            <LabelInfo as="a">{patient.email}</LabelInfo>

            <LabelName>Address:</LabelName>
            <LabelInfo>{`${patient.address}, ${patient.city}`}</LabelInfo>

            <LabelName>Phone Number:</LabelName>
            <LabelInfo>{patient.phoneNumber}</LabelInfo>

          </TopInfo>
        </StyledTopContainer>
      )}

    </StyledContainer>
  );
};
export default PatientDetail;
