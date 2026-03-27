import projectData from "./softwareData.json";
import Project from "../../components/Project";
import PageHeader from "../../components/PageHeader";
import "./software.css";

const Software = () => {
  const oddEven = projectData.length % 2 === 0 ? 1 : 0;

  return (
    <section className="portfolio">
      <PageHeader title="Software" description="View my developed products" />
      <div className="row">
        {projectData.map((project) => (
          <Project
            key={project.id}
            oddEven={oddEven}
            id={project.id}
            title={project.title}
            top={project.top}
            bottom={project.bottom}
            image={project.image}
            color={project.bgcolor}
            github={project.github}
            deployed={project.deployed}
            description={project.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Software;
