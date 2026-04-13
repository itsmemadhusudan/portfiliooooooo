import Image from "next/image";
import Link from "next/link";
import { PortfolioData } from "@/data/portfolio";

type HeroProps = {
  data: PortfolioData;
};

export function Hero({ data }: HeroProps) {
  return (
    <section className="section heroCard heroCard--shine animate-up" id="home">
      <div className="heroContent">
        <div className="animate-up delay-1">
          <p className="eyebrow">Backend Developer Portfolio</p>
          <h1>{data.name}</h1>
          <h2>{data.designation}</h2>
          <p className="lead">{data.tagline}</p>
          <div className="heroActions">
            <Link className="btn btnPrimary" href="/projects">
              View Projects
            </Link>
            <Link className="btn btnGhost" href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div className="profileMock animate-float delay-2" aria-hidden="true">
          <div className="profileImageWrap">
            <Image
              src="/profile/138767859-removebg-preview.png"
              alt="Madhusudan Timalsina profile"
              fill
              sizes="(max-width: 760px) 90vw, 260px"
              priority
              className="profileImage"
            />
          </div>
          <p>Laravel | Node.js | Nest.js | Python</p>
        </div>
      </div>

      <div className="metricRow animate-up delay-2">
        {data.metrics.map((metric) => (
          <div key={metric.label} className="metricItem">
            <p className="metricValue">{metric.value}</p>
            <p className="metricLabel">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
