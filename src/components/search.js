import React from 'react';
import '../App.css'

const SearchForm = ({ inputValue, handleChange, handleSubmit }) => {
  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        className="searchbar"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter text"
      />
      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
