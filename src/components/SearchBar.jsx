import React, { useState, forwardRef } from 'react';
import '../styles/SearchBar.css';

const SearchBar = forwardRef(({ 
  searchTerm, 
  onSearch, 
  searchType, 
  onSearchTypeChange, 
  suggestions,
  onSuggestionClick
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleTypeChange = (type) => {
    onSearchTypeChange(type);
  };

  const getPlaceholder = () => {
    switch(searchType) {
      case 'electron':
        return '搜索 Electron 版本...';
      case 'chrome':
        return '搜索 Chrome 版本...';
      case 'node':
        return '搜索 Node.js 版本...';
      case 'v8':
        return '搜索 V8 版本...';
      default:
        return '搜索...';
    }
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <div className="search-type-selector">
          <button 
            className={`search-type-btn ${searchType === 'electron' ? 'active' : ''}`}
            onClick={() => handleTypeChange('electron')}
          >
            Electron
          </button>
          <button 
            className={`search-type-btn ${searchType === 'chrome' ? 'active' : ''}`}
            onClick={() => handleTypeChange('chrome')}
          >
            Chrome
          </button>
          <button 
            className={`search-type-btn ${searchType === 'node' ? 'active' : ''}`}
            onClick={() => handleTypeChange('node')}
          >
            Node.js
          </button>
          <button 
            className={`search-type-btn ${searchType === 'v8' ? 'active' : ''}`}
            onClick={() => handleTypeChange('v8')}
          >
            V8
          </button>
        </div>
        
        <div className="search-input-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder={getPlaceholder()}
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            ref={ref}
          />
          {searchTerm && (
            <button 
              className="clear-btn" 
              onClick={() => onSearch('')}
              aria-label="清除搜索"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        
        {isFocused && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="suggestion-item"
                onClick={() => onSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default SearchBar;
