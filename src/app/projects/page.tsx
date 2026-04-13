import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Projects } from "@/components/Projects";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteHeader } from "@/components/SiteHeader";
import { portfolioData } from "@/data/portfolio";

export default function ProjectsPage() {
  return (
    <div className="pageWrap">
      <main className="container">
        <SiteHeader />
        <ScrollReveal delayClass="reveal-stagger-1">
          <PageHeader
            title="Projects & Experience"
            description="Selected projects and practical experience from academic and real-world builds."
          />
        </ScrollReveal>
        <ScrollReveal delayClass="reveal-stagger-2">
          <Projects
            projects={portfolioData.projects}
            experiences={portfolioData.experiences}
            totalProjects="23+"
          />
        </ScrollReveal>
      </main>
      <Footer name={portfolioData.name} />
    </div>
  );
}
