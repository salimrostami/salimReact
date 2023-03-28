import NavLinks from "./NavLinks";
import logo from "../images/logoSalimW.png";

const Header = () => {
  return (
    <header className="header">
      <a href="/"><img className="logo imgUnselectable" src={logo} alt="logo" /></a>
      <NavLinks />
    </header>
  );
};

export default Header;
