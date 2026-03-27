import { useState } from "react";
import { NavLink } from "react-router-dom";

import openMenu from "../images/open.svg";
import closeMenuIcon from "../images/close.svg";

const NavLinks = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <button
        type="button"
        className="dropdown-toggle"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-expanded={isMenuOpen}
        aria-controls="site-navigation"
      >
        {isMenuOpen ? (
          <img className="closeMenu" src={closeMenuIcon} alt="Close" />
        ) : (
          <img className="openMenu" src={openMenu} alt="Open" />
        )}
      </button>
      <nav
        id="site-navigation"
        className={`links ${isMenuOpen ? "open" : "closed"}`}
      >
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>
        <NavLink to="/experience" onClick={closeMenu}>
          Experience
        </NavLink>
        <NavLink to="/publications" onClick={closeMenu}>
          Publications
        </NavLink>
        <NavLink to="/teaching" onClick={closeMenu}>
          Teaching
        </NavLink>
        <NavLink to="/software" onClick={closeMenu}>
          Software
        </NavLink>
        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>
      </nav>
    </>
  );
};

export default NavLinks;
