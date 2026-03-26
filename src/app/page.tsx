import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { SiteHeader } from "@/components/SiteHeader";
import { Skills } from "@/components/Skills";
import { WhyChoose } from "@/components/WhyChoose";
import { portfolioData } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="pageWrap">
      <main className="container">
        <SiteHeader />
        <Hero data={portfolioData} />
        <About
          summary={portfolioData.summary}
          about={portfolioData.about}
          education={portfolioData.education}
          achievements={portfolioData.achievements.slice(0, 3)}
        />
        <WhyChoose strengths={portfolioData.strengths} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects.slice(0, 3)} />
        <Contact contact={portfolioData.contact} />
      </main>
      <Footer name={portfolioData.name} />
    </div>
  );
}
