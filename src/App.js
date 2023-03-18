import Header from "./components/Header";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  const personalDetails = {
    name: "Salim Rostami",
    location: "Paris, France",
    tagline: "I'm a Professor",
    email: "s[dot]rostami[at]ieseg[dot]fr",
    affiliation: "IESEG School of Management",
    brand: "As researcher, I develop mathematical models for a given system (business, project, factory, etc.), and use optimization methods to improve its efficiency (maximize profit, minimize completion time, etc.). In other words, I do mathematical optimization. I also teach Project and Operations Management to B.Sc. and M.Sc. stduents. I am passionate about developing online learning tools and games.",
    birthday: "1989/07/09",
    language: "Persian, English, French (B2)",
  };

  return (
    <>
      <Header />
      <AnimatedRoutes personalDetails={personalDetails} />
    </>
  );
}

export default App;
