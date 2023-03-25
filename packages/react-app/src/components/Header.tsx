import React from "react";

const Header: React.FC = ({ children }) => {
  return (
    <header>
      <div className="header home-header">
        <nav className="home-nav">{children}</nav>
      </div>
    </header>
  );
};

export default Header;
