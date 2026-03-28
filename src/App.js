import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import AnimatedRoutes from "./components/AnimatedRoutes";

const THEME_PREFERENCE_KEY = "theme-preference";

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const storedTheme = localStorage.getItem(THEME_PREFERENCE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {
    // Continue with system preference if storage is unavailable.
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const PERSONAL_DETAILS = {
  name: "Salim Rostami",
  location: "Paris, France",
  tagline: "I'm a Professor",
  email: "s[dot]rostami[at]ieseg[dot]fr",
  affiliation: "IESEG School of Management",
  brand: "Professor of Operations Management, PhD in Operations Research.",
  intro:
    "As researcher, I develop mathematical models for a given system (business, project, factory, etc.), and use optimization methods to improve its efficiency (maximize profit, minimize completion time, etc.). In other words, I do mathematical optimization. I also teach Project and Operations Management to B.Sc. and M.Sc. stduents. I am passionate about developing online learning tools and games.",
  birthday: "1989-07-09",
  language: "Persian, English, French",
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_PREFERENCE_KEY, theme);
    } catch {
      // Ignore write errors (private mode / blocked storage).
    }
  }, [theme]);

  useEffect(() => {
    const preventImageActions = (event) => {
      if (event.target instanceof HTMLImageElement) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventImageActions, true);
    document.addEventListener("dragstart", preventImageActions, true);

    return () => {
      document.removeEventListener("contextmenu", preventImageActions, true);
      document.removeEventListener("dragstart", preventImageActions, true);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }, []);

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <AnimatedRoutes personalDetails={PERSONAL_DETAILS} />
    </>
  );
}

export default App;
