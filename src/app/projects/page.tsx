import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Projects } from "@/components/Projects";
import { SiteHeader } from "@/components/SiteHeader";
import { portfolioData } from "@/data/portfolio";

export default function ProjectsPage() {
  return (
    <div className="pageWrap">
      <main className="container">
        <SiteHeader />
        <PageHeader
          title="Projects & Experience"
          description="Selected projects and practical experience from academic and real-world builds."
        />
        <Projects
          projects={portfolioData.projects}
          experiences={portfolioData.experiences}
        />
      </main>
      <Footer name={portfolioData.name} />
    </div>
  );
}
