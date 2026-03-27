import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme-preference");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme-preference", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }, []);

  const personalDetails = useMemo(
    () => ({
      name: "Salim Rostami",
      location: "Paris, France",
      tagline: "I'm a Professor",
      email: "s[dot]rostami[at]ieseg[dot]fr",
      affiliation: "IESEG School of Management",
      brand: "Professor of Operations Management, PhD in Operations Research.",
      intro:
        "As researcher, I develop mathematical models for a given system (business, project, factory, etc.), and use optimization methods to improve its efficiency (maximize profit, minimize completion time, etc.). In other words, I do mathematical optimization. I also teach Project and Operations Management to B.Sc. and M.Sc. stduents. I am passionate about developing online learning tools and games.",
      birthday: "1989/07/09",
      language: "Persian, English, French",
    }),
    [],
  );

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <AnimatedRoutes personalDetails={personalDetails} />
    </>
  );
}

export default App;
