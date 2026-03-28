import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SeoHead from "./SeoHead";

const Landing = lazy(() => import("../pages/landing/Landing"));
const About = lazy(() => import("../pages/about/About"));
const Publications = lazy(() => import("../pages/publications/Publications"));
const Teaching = lazy(() => import("../pages/teaching/Teaching"));
const Experience = lazy(() => import("../pages/experience/Experience"));
const Software = lazy(() => import("../pages/software/Software"));

const AnimatedRoutes = ({ personalDetails }) => {
  const location = useLocation();
  const { name, tagline, ...aboutDetails } = personalDetails;

  return (
    <>
      <SeoHead location={location} personalDetails={personalDetails} />
      <Suspense fallback={<div className="container py-5">Loading...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Landing name={name} tagline={tagline} />
            }
          />
          <Route
            path="/about"
            element={<About name={name} {...aboutDetails} />}
          />
          <Route path="/publications" element={<Publications />} />
          <Route
            path="/articles"
            element={<Navigate to="/publications" replace />}
          />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/software" element={<Software />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AnimatedRoutes;
