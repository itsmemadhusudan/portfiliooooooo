import Link from "next/link";
import { PortfolioData } from "@/data/portfolio";

type HomeSnapshotProps = {
  currentWork: PortfolioData["currentWork"];
  contact: PortfolioData["contact"];
  education: PortfolioData["education"];
  languages: PortfolioData["languages"];
  interests: PortfolioData["interests"];
};

export function HomeSnapshot({
  currentWork,
  contact,
  education,
  languages,
  interests,
}: HomeSnapshotProps) {
  const primaryEdu = education[0];

  return (
    <section className="section card animate-up homeSnapshot" id="snapshot" aria-labelledby="snapshot-heading">
      <h3 id="snapshot-heading">At a glance</h3>
      <p className="mutedText snapshotLead">
        Where I work, what I speak, what I study, and the problems I like to solve.
      </p>
      <div className="snapshotGrid">
        <article className="miniCard snapshotItem">
          <h4>Now</h4>
          <p className="snapshotStrong">
            {currentWork.role} · {currentWork.company}
          </p>
          <p className="mutedText snapshotMeta">{currentWork.status}</p>
          <ul className="simpleList tightList snapshotBullets">
            {currentWork.highlights.slice(0, 2).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>

        <article className="miniCard snapshotItem">
          <h4>Location & languages</h4>
          <p className="snapshotStrong">{contact.location}</p>
          <p className="mutedText snapshotMeta">Professional communication</p>
          <ul className="simpleList tightList snapshotBullets">
            {languages.map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
        </article>

        <article className="miniCard snapshotItem">
          <h4>Education</h4>
          {primaryEdu ? (
            <>
              <p className="snapshotStrong">{primaryEdu.degree}</p>
              <p className="mutedText snapshotMeta">
                {primaryEdu.institution} · {primaryEdu.duration}
              </p>
            </>
          ) : null}
          <p className="snapshotResumeLink">
            <Link href="/resume">View full resume →</Link>
          </p>
        </article>

        <article className="miniCard snapshotItem">
          <h4>Interests</h4>
          <ul className="simpleList tightList snapshotBullets">
            {interests.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
