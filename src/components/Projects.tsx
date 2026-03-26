import { PortfolioData, Project } from "@/data/portfolio";

type ProjectsProps = {
  projects: Project[];
  experiences?: PortfolioData["experiences"];
};

export function Projects({ projects, experiences = [] }: ProjectsProps) {
  return (
    <section className="section" id="projects">
      <h3>Projects</h3>
      <div className="projectGrid">
        {projects.map((project) => (
          <article className="projectCard" key={project.name}>
            <p className="stack">{project.stack}</p>
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {experiences.length > 0 && (
        <article className="card sectionSpacing">
          <h3>Experience Highlights</h3>
          <div className="experienceGrid">
            {experiences.map((experience) => (
              <div key={experience.role} className="miniCard">
                <h4>{experience.role}</h4>
                <p className="mutedText">{experience.duration}</p>
                <ul className="simpleList">
                  {experience.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}
