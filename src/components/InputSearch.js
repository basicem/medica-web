import React, { useState } from "react";
import { Search, Label } from "semantic-ui-react";
import { searchPatients } from "api/patients";
import debounce from "lodash.debounce";
import styled from "styled-components";

const StyledDiv = styled.div`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
`;

const InputSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const debouncedSearch = debounce(async (query) => {
    setLoading(true);
    try {
      const filters = {
        search: query,
      };
      const response = await searchPatients(filters);
      const modifiedResults = response.map((user) => ({
        id: user.id,
        title: `${user.firstName} ${user.lastName}`,
        description: user.email,
      }));
      setResults(modifiedResults);
      setError("");
    } catch (e) {
      setError("Unable to fetch patients");
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleSearchChange = (e, { value }) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      setResults([]);
    } else {
      debouncedSearch(value);
    }
  };

  const handleResultSelect = (e, { result }) => {
    setSelectedItem(result);
    setResults([]);
  };

  return (
    <StyledDiv>
      <Search
        loading={loading}
        onSearchChange={handleSearchChange}
        onResultSelect={handleResultSelect}
        results={results}
        value={searchTerm}
        noResultsMessage={error}
      />
      {selectedItem && (
      <div>
        <Label as="a" color="teal" image>
          {selectedItem.title}
          <Label.Detail>
            {" "}
            {selectedItem.description}
          </Label.Detail>
        </Label>
      </div>
      )}
    </StyledDiv>
  );
};

export default InputSearch;
