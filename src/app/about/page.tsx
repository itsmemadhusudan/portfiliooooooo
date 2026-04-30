import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteHeader } from "@/components/SiteHeader";
import { getPageCopy, getPortfolioData } from "@/lib/portfolio-queries";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const portfolioData = await getPortfolioData();
  const ph = getPageCopy(portfolioData, "about");

  return (
    <div className="pageWrap">
      <main className="container">
        <SiteHeader navLinks={portfolioData.navLinks} />
        <ScrollReveal delayClass="reveal-stagger-1">
          <PageHeader
            title={ph.title}
            description={ph.description}
            eyebrow={portfolioData.sectionEyebrow}
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
