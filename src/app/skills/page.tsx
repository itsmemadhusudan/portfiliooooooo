import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteHeader } from "@/components/SiteHeader";
import { Skills } from "@/components/Skills";
import { portfolioData } from "@/data/portfolio";

export default function SkillsPage() {
  return (
    <div className="pageWrap">
      <main className="container">
        <SiteHeader />
        <ScrollReveal delayClass="reveal-stagger-1">
          <PageHeader
            title="Skills & Tools"
            description="Technical and professional skills I use to deliver real projects."
          />
        </ScrollReveal>
        <ScrollReveal delayClass="reveal-stagger-2">
          <Skills
            skills={portfolioData.skills}
            currentlyLearning={portfolioData.currentlyLearning}
          />
        </ScrollReveal>
      </main>
      <Footer name={portfolioData.name} />
    </div>
  );
}
