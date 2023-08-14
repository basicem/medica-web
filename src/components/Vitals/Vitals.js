import React, { useState, useEffect } from "react";
import {
  Container, Icon, Segment, Card, Divider, Button,
} from "semantic-ui-react";
import styled from "styled-components";

import { getVitals } from "api/vitals";
import Loader from "components/Loader";

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
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem 1rem 1rem 1rem;
`;

const StyledHeader = styled.h1`

  margin:0
`;

const SmallerCard = styled(Card)`
  &&& {
    width: 15rem;
  }
`;

const Vitals = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [vitals, setVitals] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await getVitals();
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
      <StyledTopContainer>
        <StyledHeader>Vitals</StyledHeader>
        <Button size="small">
          <Icon name="plus square outline" />
          Add Vital
        </Button>
      </StyledTopContainer>
      <Divider />
      <Loader isActive={loading} inverted />
      {vitals && (
        <Card.Group>
          {vitals?.map((v) => (
            <SmallerCard
              color="teal"
              header={v.name}
              description={`Unit measurement: ${v.unitMeasurement}`}
              extra={(
                <>
                  Lower limit:
                  {" "}
                  {v.lowerLimit}
                  <br />
                  Upper limit:
                  {" "}
                  {v.upperLimit}
                </>
            )}
            />
          ))}
        </Card.Group>
      )}
    </StyledContainer>
  );
};

export default Vitals;
