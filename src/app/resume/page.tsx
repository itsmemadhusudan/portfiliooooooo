import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { SiteHeader } from "@/components/SiteHeader";
import { portfolioData } from "@/data/portfolio";

export default function ResumePage() {
  return (
    <div className="pageWrap">
      <main className="container">
        <SiteHeader />
        <section className="section resumeShell">
          <PageHeader
            title="Resume"
            description="One-page CV of Madhusudan Timalsina."
          />
        </section>

        <section className="section card resumePage resumeSheet animate-up">
          <header className="resumeHeader">
            <div>
              <h2 className="resumeName">{portfolioData.name}</h2>
              <p className="resumeRole">{portfolioData.designation}</p>
              <p className="resumeStatus">
                {portfolioData.currentWork.status} at {portfolioData.currentWork.company}
              </p>
            </div>
            <ul className="resumeContact">
              <li>{portfolioData.contact.phone}</li>
              <li>{portfolioData.contact.email}</li>
              <li>{portfolioData.contact.location}</li>
              <li>{portfolioData.contact.linkedin}</li>
            </ul>
          </header>

          <section className="resumeGrid">
            <article className="miniCard">
              <h4>Professional Summary</h4>
              <p className="resumeText">{portfolioData.summary}</p>
            </article>

            <article className="miniCard">
              <h4>Current Work</h4>
              <p className="resumeText">
                <strong>{portfolioData.currentWork.role}</strong> at{" "}
                <strong>{portfolioData.currentWork.company}</strong>
              </p>
              <ul className="simpleList tightList">
                {portfolioData.currentWork.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="resumeGrid resumeGridThree">
            <article className="miniCard">
              <h4>Education</h4>
              <ul className="simpleList">
                {portfolioData.education.map((edu) => (
                  <li key={edu.degree}>
                    <strong>{edu.degree}</strong> - {edu.institution} ({edu.duration})
                  </li>
                ))}
              </ul>
            </article>

            <article className="miniCard">
              <h4>Technical Skills</h4>
              <ul className="simpleList tightList">
                {[...portfolioData.skills.backend, ...portfolioData.skills.frontend].map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>

            <article className="miniCard">
              <h4>Core Competencies</h4>
              <ul className="simpleList tightList">
                {portfolioData.skills.soft.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="resumeSection">
            <h3>Experience</h3>
            <div className="experienceGrid">
              {portfolioData.experiences.map((exp) => (
                <article className="miniCard" key={`${exp.role}-${exp.duration}`}>
                  <h4>{exp.role}</h4>
                  <p className="mutedText">{exp.duration}</p>
                  <ul className="simpleList">
                    {exp.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="resumeSection">
            <h3>Achievements</h3>
            <ul className="simpleList">
              {portfolioData.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </section>
        </section>
      </main>
      <Footer name={portfolioData.name} />
    </div>
  );
}
