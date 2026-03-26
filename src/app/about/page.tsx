import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { SiteHeader } from "@/components/SiteHeader";
import { portfolioData } from "@/data/portfolio";

export default function AboutPage() {
  return (
    <div className="pageWrap">
      <main className="container">
        <SiteHeader />
        <PageHeader
          title="About Me"
          description="My summary, education, and key achievements."
        />
        <About
          summary={portfolioData.summary}
          about={portfolioData.about}
          education={portfolioData.education}
          achievements={portfolioData.achievements}
        />
      </main>
      <Footer name={portfolioData.name} />
    </div>
  );
}
