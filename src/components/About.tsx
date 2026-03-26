import { PortfolioData } from "@/data/portfolio";

type AboutProps = {
  about: PortfolioData["about"];
};

export function About({ about }: AboutProps) {
  return (
    <section className="section card" id="about">
      <h3>About</h3>
      <div className="stackText">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
