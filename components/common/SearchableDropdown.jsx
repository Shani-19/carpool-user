"use client";

import React, { useState, useEffect, useRef } from 'react';

const SearchableDropdown = ({
  options = ["", "", ""],
  placeholder = "Search...",
  onSelect,
  defaultValue = "",
  searchable = true,
  disabled = false
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(defaultValue || (options.length > 0 ? options[0] : ""));

  const dropdownRef = useRef(null);

  // Sync with parent when defaultValue changes
  useEffect(() => {
    if (defaultValue !== undefined) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);

  const filteredOptions = options.filter((elm) => {
    const label = typeof elm === 'object' ? elm.name : elm;
    return String(label).toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSelect = (option) => {
    const value = typeof option === 'object' ? option.name : option;
    setSelectedOption(value);
    setIsDropdownOpen(false);
    setSearchQuery("");
    if (onSelect) onSelect(value);
  };

  // to Close
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
    <div ref={dropdownRef} className={`drop-menu mb-0 ${isDropdownOpen ? "active" : ""}`} style={{ position: 'relative', width: '100%' }}>

      <div
        className="select"
        onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        title={selectedOption || placeholder}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '5px' }}>
          {selectedOption || placeholder}
        </span>
        <i className={`fa ${isDropdownOpen ? "fa-angle-up" : "fa-angle-down"}`} style={{ flexShrink: 0 }} />
      </div>

      <div
        className="dropdown"
        style={
          isDropdownOpen
            ? {
              display: "block",
              opacity: 1,
              visibility: "visible",
              transition: "0.4s",
              padding: '0',
              overflow: 'hidden',
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              zIndex: 100
            }
            : {
              display: "block",
              opacity: 0,
              visibility: "hidden",
              transition: "0.4s",
              padding: '0',
              zIndex: 100
            }
        }
      >
        {searchable && (
          <div className="search-box" style={{ padding: '10px', borderBottom: '1px solid #f5f5f5', backgroundColor: '#fafafa', position: 'relative' }}>
            <input
              type="text"
              placeholder={placeholder}
              className="search-field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '8px 30px 8px 10px',
                outline: 'none',
                border: '1px solid #eee',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            />
            <span className="icon" style={{ position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>
        )}

        {/* List */}
        <ul
          className="custom-scrollbar"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            maxHeight: '250px',
            overflowY: 'auto',
            scrollbarWidth: 'thin'
          }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((elm, i) => {
              const label = typeof elm === 'object' ? elm.name : elm;
              const display = typeof elm === 'object' ? (
                <div className="cstm-dli-count d-flex justify-content-between align-items-center w-100" title={elm.name}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{elm.name}</span>
                  <span style={{ fontSize: '11px', color: '#888', background: '#f5f5f5', padding: '2px 6px', borderRadius: '10px', flexShrink: 0, marginLeft: '18px' }}>{elm.count}</span>
                </div>
              ) : (
                <span title={elm} style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{elm}</span>
              );

              return (
                <li
                  key={i}
                  className={`cstm-dropdown-list-item ${selectedOption === label ? "selected" : ""}`}
                  onClick={() => handleSelect(elm)}
                  style={{
                    padding: '10px 15px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'background 0.2s ease',
                    borderLeft: selectedOption === label ? '3px solid #000' : '3px solid transparent'
                  }}
                >
                  {display}
                </li>
              )
            })
          ) : (
            <li className="no-results" style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '13px' }}>
              No results found
            </li>
          )}
        </ul>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          borderRadius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #999;
        }
      `}</style>
    </div>
  );
};

export default SearchableDropdown;