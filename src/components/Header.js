import NavLinks from "./NavLinks";
import logoWhite from "../images/logoSalimW.png";
import logoBlack from "../images/logoSalimB.png";

const Header = ({ theme, onToggleTheme }) => {
  const logo = theme === "light" ? logoBlack : logoWhite;

  return (
    <header className="header">
      <a href="/">
        <img className="logo imgUnselectable" src={logo} alt="logo" />
      </a>
      <button
        className={`themeToggle ${theme === "light" ? "isLight" : "isDark"}`}
        onClick={onToggleTheme}
        aria-label={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
        aria-pressed={theme === "light"}
        title={theme === "dark" ? "Light mode" : "Dark mode"}
      >
        <span className="themeLabel" aria-hidden="true">
          Dark
        </span>
        <span className="themeLabel" aria-hidden="true">
          Light
        </span>
        <span className="themeKnob" aria-hidden="true" />
      </button>
      <NavLinks />
    </header>
  );
};

export default Header;
