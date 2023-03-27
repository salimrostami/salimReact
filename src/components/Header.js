import NavLinks from "./NavLinks";
import logo from "../images/logoSalimW.png";

const Header = () => {
  return (
    <header className="header">
      <img className="logo imgUnselectable" src={logo} alt="logo" />
      <NavLinks />
    </header>
  );
};

export default Header;
