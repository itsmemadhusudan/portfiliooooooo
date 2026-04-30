import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Projects } from "@/components/Projects";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteHeader } from "@/components/SiteHeader";
import { getPageCopy, getPortfolioData } from "@/lib/portfolio-queries";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const portfolioData = await getPortfolioData();
  const ph = getPageCopy(portfolioData, "projects");

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
          <Projects
            projects={portfolioData.projects}
            experiences={portfolioData.experiences}
            totalProjects={portfolioData.totalProjectsLabel}
          />
        </ScrollReveal>
      </main>
      <Footer name={portfolioData.name} />
    </div>
  );
}
