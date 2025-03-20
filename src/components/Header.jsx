import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img 
              src="https://www.electronjs.org/assets/img/logo.svg" 
              alt="Electron Logo" 
              className="logo-img" 
            />
            <h1>Electron 组件版本查询</h1>
          </div>
          <div className="header-description">
            <p>查询 Electron 使用的 Chromium、Node.js 和 V8 版本</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
