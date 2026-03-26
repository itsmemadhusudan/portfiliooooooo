import { PortfolioData } from "@/data/portfolio";

type WhyChooseProps = {
  strengths: PortfolioData["strengths"];
};

export function WhyChoose({ strengths }: WhyChooseProps) {
  return (
    <section className="section whyChoose">
      <h3>3 Reasons To Choose Me</h3>
      <div className="reasonGrid">
        {strengths.map((strength) => (
          <article className="reasonCard" key={strength.title}>
            <h4>{strength.title}</h4>
            <p>{strength.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
