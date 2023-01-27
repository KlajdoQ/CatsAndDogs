import React from 'react';

export default function SearchBar({ search, setSearch }) {
  

  function handleChange(e) {
    setSearch(e.target.value)
  }

  return (
    <div className="search-div">
          <div className="search-bar">
            <label className="search-label">
                <input
                type="text"
                value={search}
                onChange={handleChange}
                placeholder="Search by name or breed ..."
                className="search-box"
                />
            </label>
    </div>

    </div>
)
}

