import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import logoWhite from "../images/logoSalimW.png";
import logoBlack from "../images/logoSalimB.png";

const Header = ({ theme, onToggleTheme }) => {
  const logo = theme === "light" ? logoBlack : logoWhite;

  return (
    <header className="header">
      <Link to="/" aria-label="Home">
        <img className="logo imgUnselectable" src={logo} alt="logo" />
      </Link>
      <NavLinks theme={theme} onToggleTheme={onToggleTheme} />
    </header>
  );
};

export default Header;
