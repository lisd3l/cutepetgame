import React, { useCallback, useRef, useState, MouseEvent } from "react";
import { CSSTransition } from "react-transition-group";

const Header: React.FC = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const onNavClick = useCallback((event: MouseEvent) => {
    const tagName = (event.target as HTMLElement).tagName.toLocaleLowerCase();
    if (tagName === "a" || tagName === "button") {
      setShowMenu(false);
    }
  }, []);
  return (
    <header>
      <div className={`header home-header ${showMenu ? "active" : ""}`}>
        <div className="home-logo"></div>
        <div className="home-menu" onClick={() => setShowMenu(!showMenu)}>
          <div className="flex flex-col">
            <div className="menu-line menu-line-1"></div>
            <div className="menu-line menu-line-2"></div>
            <div className="menu-line menu-line-3"></div>
          </div>
        </div>
        <CSSTransition timeout={300} nodeRef={menuRef} in={showMenu} classNames="animate-nav">
          <nav className="home-nav" ref={menuRef} onClick={onNavClick}>
            {children}
          </nav>
        </CSSTransition>
      </div>
    </header>
  );
};

export default Header;
