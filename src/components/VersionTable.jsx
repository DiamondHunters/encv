import React from 'react';
import '../styles/VersionTable.css';

const VersionTable = ({ versions, selectedVersion, onVersionSelect }) => {
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
    <div className="table-container">
      <table className="version-table">
        <thead>
          <tr>
            <th>Electron</th>
            <th>发布日期</th>
            <th>Chrome</th>
            <th>Node.js</th>
            <th>V8</th>
            <th>Modules</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {versions.map(version => (
            <tr
              key={version.version}
              className={selectedVersion?.version === version.version ? 'selected' : ''}
              onClick={() => onVersionSelect(version)}
            >
              <td className="version-cell">{version.version}</td>
              <td>{formatDate(version.date)}</td>
              <td className="code-cell">{version.chrome}</td>
              <td className="code-cell">{version.node}</td>
              <td className="code-cell">{version.v8}</td>
              <td>{version.modules}</td>
              <td>
                <button
                  className="card-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://releases.electronjs.org/release/v${version.version}`);
                  }}
                >
                  <i className="fas fa-link"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VersionTable;
