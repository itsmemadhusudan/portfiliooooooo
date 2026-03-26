import { PortfolioData } from "@/data/portfolio";

type AboutProps = {
  summary: PortfolioData["summary"];
  about: PortfolioData["about"];
  education: PortfolioData["education"];
  achievements: PortfolioData["achievements"];
};

export function About({ summary, about, education, achievements }: AboutProps) {
  return (
    <section className="section card" id="about">
      <h3>About</h3>
      <p className="summaryText">{summary}</p>
      <div className="stackText">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="twoColGrid">
        <article className="miniCard">
          <h4>Education</h4>
          <ul className="simpleList">
            {education.map((item) => (
              <li key={item.degree}>
                <strong>{item.degree}</strong> - {item.institution} ({item.duration})
              </li>
            ))}
          </ul>
        </article>

        <article className="miniCard">
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
