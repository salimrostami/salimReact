import projectData from "./researchData.json";
import Project from "../../components/Project";
import PageHeader from "../../components/PageHeader";

const Research = () => {
  const ProjectList = () =>
    projectData.map((project, i) => (
      <Project
        key={i}
        oddEven={projectData.length % 2 === 0 ? 1 :0}
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
    ));

  return (
    <section className="portfolio">
      <PageHeader title="Research" description="View my published work" />
      <div className="row">
        <ProjectList />
      </div>
    </section>
  );
};

export default Research;
