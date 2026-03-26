import { PortfolioData } from "@/data/portfolio";

type HeroProps = {
  data: PortfolioData;
};

export function Hero({ data }: HeroProps) {
  return (
    <section className="section hero" id="home">
      <p className="eyebrow">Backend Engineer Portfolio</p>
      <h1>{data.name}</h1>
      <h2>{data.designation}</h2>
      <p className="lead">{data.tagline}</p>
      <div className="heroActions">
        <a className="btn btnPrimary" href="#projects">
          View Projects
        </a>
        <a className="btn btnGhost" href="#contact">
          Contact
        </a>
      </div>
    </section>
  );
}
