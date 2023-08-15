import React, { useState, useEffect } from "react";
import {
  Container, Icon, Segment, Card, Divider, Button, Input,
} from "semantic-ui-react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";

import { editVital, getVitals, postVital } from "api/vitals";
import VitalsModalCreate from "./VitalsModalCreate";
import VitalsModalEdit from "./VitalsModalEdit";

const StyledContainer = styled(Container)`
  && {
    display: flex;
    margin: 1rem;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 2rem;
  }
`;

const StyledTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem 1rem 1rem 1rem;
`;

const StyledHeader = styled.h1`

  margin:0
`;

const StyledCardGroup = styled(Card.Group)`
  &&& {
    margin-top: 1rem;
  }
`;

const SmallerCard = styled(Card)`
  &&& {
    width: 15rem;
  }
`;

const StyledCardHeader = styled(Card.Header)`
  &&&&& {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const Vitals = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [vitals, setVitals] = useState([]);
  const [selectedVital, setSelectedVital] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const debouncedSearch = debounce(async (query) => {
    try {
      setLoading(true);
      const filters = {
        search: query,
      };
      const results = await getVitals(filters);
      setVitals(results);
      setError("");
    } catch (e) {
      setError("Unable to fetch vitals");
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleClick = () => {
    setShowCreate(!showCreate);
  };

  const handleCreate = async (values) => {
    try {
      await postVital(values);
      toast.success("Vital added!");
      debouncedSearch("");
    } catch (err) {
      toast.error("Unable to add vital!");
    } finally {
      setShowCreate(!showCreate);
    }
  };

  const handleClickEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleEdit = async (values) => {
    try {
      await editVital(values.id, values);
      toast.success("Vital updated!");
      debouncedSearch("");
    } catch (err) {
      toast.error("Unable to update vital!");
    } finally {
      handleClickEdit(!showEdit);
    }
  };

  const handleSearch = (value) => {
    debouncedSearch(value);
  };

  const handleVitalClick = (v) => {
    setSelectedVital(v);
    handleClickEdit();
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const filters = {
          search: "",
        };
        const response = await getVitals(filters);
        setVitals(response);
      } catch (e) {
        setError("Unable to fetch vitals");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

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
      <VitalsModalCreate
        show={showCreate}
        handleClick={handleClick}
        handleCreate={handleCreate}
      />
      <VitalsModalEdit
        show={showEdit}
        selectedVital={selectedVital}
        handleClick={handleClickEdit}
        handleEdit={handleEdit}
      />
      <StyledTopContainer>
        <StyledHeader>Vitals</StyledHeader>
        <Button size="small" onClick={handleClick}>
          <Icon name="plus square outline" />
          Add Vital
        </Button>
      </StyledTopContainer>
      <Divider />
      <Input
        fluid
        selection
        search
        placeholder="Search..."
        onChange={(e, { value }) => {
          handleSearch(value);
        }}
        loading={loading}
      />
      {vitals === null || vitals?.length === 0
        ? (
          <StyledContainer>
            <Segment inverted color="blue" tertiary>
              <Icon name="x" />
              Vitals not found!
            </Segment>
          </StyledContainer>
        )
        : (
          <StyledCardGroup>
            {vitals?.map((v) => (
              <SmallerCard color="teal" onClick={() => handleVitalClick(v)}>
                <Card.Content>
                  <StyledCardHeader>
                    {v.name}
                  </StyledCardHeader>
                  <Card.Description>{`Unit measurement: ${v.unitMeasurement}`}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <>
                    Lower limit:
                    {" "}
                    {v.lowerLimit}
                    <br />
                    Upper limit:
                    {" "}
                    {v.upperLimit}
                  </>
                </Card.Content>
              </SmallerCard>
            ))}
          </StyledCardGroup>
        )}
    </StyledContainer>
  );
};

export default Vitals;
