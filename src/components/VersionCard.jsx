import React from 'react';
import '../styles/VersionCard.css';

const VersionCard = ({ version, isSelected, onSelect }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div 
      className={`version-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="version-header">
        <div className="version-badge">Electron</div>
        <h2 className="version-number">{version.version}</h2>
        <div className="version-date">{formatDate(version.date)}</div>
      </div>
      
      <div className="version-details">
        <div className="detail-item">
          <div className="detail-label">Chrome</div>
          <div className="detail-value">{version.chrome}</div>
        </div>
        
        <div className="detail-item">
          <div className="detail-label">Node.js</div>
          <div className="detail-value">{version.node}</div>
        </div>
        
        <div className="detail-item">
          <div className="detail-label">V8</div>
          <div className="detail-value">{version.v8}</div>
        </div>
      </div>
      
      <div className="version-footer">
        <div className="modules-badge">
          <span>Modules</span>
          <span className="modules-value">{version.modules}</span>
        </div>
        
        <button 
          className="card-btn"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`https://releases.electronjs.org/release/v${version.version}`);
          }}
        >
          <i className="fas fa-link"></i>
          <span>Goto</span>
        </button>
      </div>
    </div>
  );
};

export default VersionCard;
