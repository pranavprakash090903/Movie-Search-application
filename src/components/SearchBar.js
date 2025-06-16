import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 500),
    [onSearch]
  );

  const handleInputChange = (e) => {
    setInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleClear = () => {
    setInput("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={input}
        onChange={handleInputChange}
        aria-label="Search movies"
        className="search-input"
      />
      {input && (
        <button
          className="clear-btn"
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          &#x2715;
        </button>
      )}
      <style>{`
        .search-bar {
          position: relative;
          max-width: 400px;
          margin: 1rem auto 0.5rem auto;
          display: flex;
          align-items: center;
        }
        .search-input {
          width: 100%;
          padding: 0.75rem 2.5rem 0.75rem 1rem;
          border-radius: 30px;
          border: none;
          font-size: 1.1rem;
          outline: none;
          background: #2a2a2a;
          color: #e0e0e0;
          transition: background 0.3s ease;
        }
        .search-input::placeholder {
          color: #888;
        }
        .search-input:focus {
          background: #3a3a3a;
        }
        .clear-btn {
          position: absolute;
          right: 1rem;
          background: transparent;
          border: none;
          font-size: 1.25rem;
          color: #888;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }
      `}</style>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
