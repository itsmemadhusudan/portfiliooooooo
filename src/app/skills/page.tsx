import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { SiteHeader } from "@/components/SiteHeader";
import { Skills } from "@/components/Skills";
import { portfolioData } from "@/data/portfolio";

export default function SkillsPage() {
  return (
    <div className="pageWrap">
      <main className="container">
        <SiteHeader />
        <PageHeader
          title="Skills & Tools"
          description="Technical and professional skills I use to deliver real projects."
        />
        <Skills
          skills={portfolioData.skills}
          currentlyLearning={portfolioData.currentlyLearning}
        />
      </main>
      <Footer name={portfolioData.name} />
    </div>
  );
}
