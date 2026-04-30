import { PortfolioData } from "@/data/portfolio";

type AboutProps = {
  summary: PortfolioData["summary"];
  about: PortfolioData["about"];
  education: PortfolioData["education"];
  achievements: PortfolioData["achievements"];
  focusAreas: PortfolioData["focusAreas"];
};

export function About({ summary, about, education, achievements, focusAreas }: AboutProps) {
  return (
    <section className="section card animate-up" id="about">
      <h3>About</h3>
      <p className="summaryText">{summary}</p>
      <div className="stackText">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="twoColGrid">
        <article className="miniCard animate-up delay-1">
          <h4>Education</h4>
          <ul className="simpleList">
            {education.map((item) => (
              <li key={item.id}>
                <strong>{item.degree}</strong> - {item.institution} ({item.duration})
              </li>
            ))}
          </ul>
        </article>

        <article className="miniCard animate-up delay-2">
          <h4>Focus Areas</h4>
          <ul className="simpleList">
            {focusAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="miniCard animate-up delay-3">
          <h4>Achievements</h4>
          <ul className="simpleList">
            {achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
