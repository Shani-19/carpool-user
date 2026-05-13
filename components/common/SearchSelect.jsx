"use client";

import React, { useState, useEffect, useRef } from 'react';

const SearchableDropdown = ({
  options = ["New York", "Los Vegas", "California"],
  placeholder = "Search...",
  onSelect,
  defaultValue = ""
}) => {
  // --- State ---
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(defaultValue || options[0]);

  const dropdownRef = useRef(null);

  // --- Logic: Filter options based on search ---
  const filteredOptions = options.filter((elm) =>
    elm.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Logic: Handle selection ---
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    setSearchQuery(""); // Reset search when an item is picked
    if (onSelect) onSelect(option);
  };

  // --- Logic: Click Outside to Close ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`drop-menu ${isDropdownOpen ? "active" : ""}`} style={{ position: 'relative' }}>

      {/* 1. The Trigger Box (Shows current selection) */}
      <div className="select" onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{selectedOption}</span>
        <i className={`fa ${isDropdownOpen ? "fa-angle-up" : "fa-angle-down"}`} />
      </div>

      {/* 2. The Dropdown Content */}
      <div
        className="dropdown-container"
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: '#fff',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          display: isDropdownOpen ? "block" : "none", // Toggle visibility
          border: '1px solid #eee'
        }}
      >
        {/* Search Input Field */}
        <div className="search-box" style={{ padding: '8px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder={placeholder}
            className="search-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '5px', outline: 'none' }}
          />
          <span className="icon" style={{ marginLeft: '-25px' }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: '#666' }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </div>

        {/* Results List */}
        <ul className="box-search-select" style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '200px', overflowY: 'auto' }}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((elm, i) => (
              <li
                key={i}
                className={`search-result-item ${selectedOption === elm ? "active" : ""}`}
                onClick={() => handleSelect(elm)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  backgroundColor: selectedOption === elm ? '#f0f0f0' : 'transparent'
                }}
              >
                {elm}
              </li>
            ))
          ) : (
            <li className="no-results" style={{ padding: '10px', color: '#999' }}>No results found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchableDropdown;