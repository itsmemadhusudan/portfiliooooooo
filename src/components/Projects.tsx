import { Project } from "@/data/portfolio";

type ProjectsProps = {
  projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
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
    </section>
  );
}
