import AboutMe from "../../components/AboutMe";
import PageHeader from "../../components/PageHeader";

const About = ({ name, location, brand, intro, email, affiliation, birthday, language }) => {
  return (
    <section className="about">
      <PageHeader title="About Me" description="Let me introduce myself" />
      <AboutMe name={name} location={location} brand={brand} intro={intro} email={email} affiliation={affiliation} birthday={birthday} language={language}/>
    </section>
  );
};

export default About;
