import PropTypes from "prop-types";
import React from "react";
import { Button, Input } from "reactstrap";

const SearchPanel = ({ term, handleSearch, toggleForm }) => (
  <div className="d-flex mb-3">
    <Input
      placeholder="Search Task"
      className="mr-3"
      value={term}
      onChange={(event) => handleSearch(event.target.value)}
    />

    <Button color="success" onClick={toggleForm}>
      New
    </Button>
  </div>
);

SearchPanel.propTypes = { 
  term: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
};

export default SearchPanel;
