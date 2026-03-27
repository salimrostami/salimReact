import { Routes, Route, useLocation } from "react-router-dom";

import Landing from "../pages/landing/Landing";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Articles from "../pages/articles/Articles";
import Teaching from "../pages/teaching/Teaching";
import Software from "../pages/software/Software";

const AnimatedRoutes = ({ personalDetails }) => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <Landing
            name={personalDetails.name}
            tagline={personalDetails.tagline}
          />
        }
      />
      <Route
        path="/about"
        element={
          <About
            name={personalDetails.name}
            location={personalDetails.location}
            email={personalDetails.email}
            affiliation={personalDetails.affiliation}
            brand={personalDetails.brand}
            intro={personalDetails.intro}
            birthday={personalDetails.birthday}
            language={personalDetails.language}
          />
        }
      />
      <Route path="/publications" element={<Articles />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/teaching" element={<Teaching />} />
      <Route path="/software" element={<Software />} />
      <Route
        path="/contact"
        element={
          <Contact
            name={personalDetails.name}
            location={personalDetails.location}
            email={personalDetails.email}
          />
        }
      />
    </Routes>
  );
};

export default AnimatedRoutes;
