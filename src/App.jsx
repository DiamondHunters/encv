import React, { useState, useEffect, useRef } from 'react';
import { electronVersions } from './data/electronVersions';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import VersionCard from './components/VersionCard';
import VersionTable from './components/VersionTable';
import './styles/App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('electron'); // electron, chrome, node, v8
  const [filteredVersions, setFilteredVersions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [viewMode, setViewMode] = useState('card'); // card, table
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12); // 默认每页显示12个版本
  const searchInputRef = useRef(null);

  useEffect(() => {
    // 初始化时显示所有版本
    setFilteredVersions(electronVersions);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = electronVersions.filter(version => {
        const searchValue = version[searchType === 'electron' ? 'version' : searchType].toLowerCase();
        return searchValue.includes(searchTerm.toLowerCase());
      });
      
      setFilteredVersions(filtered);
      
      // 生成搜索建议
      if (searchTerm.length > 0) {
        const uniqueValues = [...new Set(electronVersions.map(v => 
          v[searchType === 'electron' ? 'version' : searchType]
        ))];
        
        const matchingSuggestions = uniqueValues
          .filter(value => value.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, 5); // 限制建议数量
          
        setSuggestions(matchingSuggestions);
      } else {
        setSuggestions([]);
      }
    } else {
      setFilteredVersions(electronVersions);
      setSuggestions([]);
    }
  }, [searchTerm, searchType]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    handlePageChange(1);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setSearchTerm('');
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    handlePageChange(1);
  };

  const handleVersionSelect = (version) => {
    setSelectedVersion(version);
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // 改变每页数量时重置到第一页
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredVersions.slice(startIndex, endIndex);
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <SearchBar 
            searchTerm={searchTerm}
            onSearch={handleSearch}
            searchType={searchType}
            onSearchTypeChange={handleSearchTypeChange}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            ref={searchInputRef}
          />
          
          <div className="view-controls">
            <button 
              className={`view-btn ${viewMode === 'card' ? 'active' : ''}`} 
              onClick={() => setViewMode('card')}
            >
              <i className="fas fa-th-large"></i> 卡片视图
            </button>
            <button 
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`} 
              onClick={() => setViewMode('table')}
            >
              <i className="fas fa-table"></i> 表格视图
            </button>
            <select 
              value={pageSize} 
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="page-size-select"
            >
              <option value={12}>12条/页</option>
              <option value={24}>24条/页</option>
              <option value={48}>48条/页</option>
            </select>
          </div>
          
          {filteredVersions.length === 0 ? (
            <div className="no-results">
              <p>没有找到匹配的版本</p>
            </div>
          ) : viewMode === 'card' ? (
            <>
              <div className="version-cards">
                {getCurrentPageData().map((version) => (
                  <VersionCard 
                    key={version.version} 
                    version={version} 
                    isSelected={selectedVersion?.version === version.version}
                    onSelect={() => handleVersionSelect(version)}
                  />
                ))}
              </div>
              <div className="pagination">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  上一页
                </button>
                <span>{currentPage} / {Math.ceil(filteredVersions.length / pageSize)}</span>
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= Math.ceil(filteredVersions.length / pageSize)}
                >
                  下一页
                </button>
              </div>
            </>
          ) : (
            <>
              <VersionTable 
                versions={getCurrentPageData()}
                selectedVersion={selectedVersion}
                onVersionSelect={handleVersionSelect}
              />
              <div className="pagination">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  上一页
                </button>
                <span>{currentPage} / {Math.ceil(filteredVersions.length / pageSize)}</span>
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= Math.ceil(filteredVersions.length / pageSize)}
                >
                  下一页
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>© 2025 Electron Version Lookup</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
