import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteHeader } from "@/components/SiteHeader";
import { portfolioData } from "@/data/portfolio";

export default function AboutPage() {
  return (
    <div className="pageWrap">
      <main className="container">
        <SiteHeader />
        <ScrollReveal delayClass="reveal-stagger-1">
          <PageHeader
            title="About Me"
            description="My summary, education, and key achievements."
          />
        </ScrollReveal>
        <ScrollReveal delayClass="reveal-stagger-2">
          <About
            summary={portfolioData.summary}
            about={portfolioData.about}
            education={portfolioData.education}
            achievements={portfolioData.achievements}
            focusAreas={portfolioData.focusAreas}
          />
        </ScrollReveal>
      </main>
      <Footer name={portfolioData.name} />
    </div>
  );
}
