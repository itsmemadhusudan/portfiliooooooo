import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HomeSnapshot } from "@/components/HomeSnapshot";
import { Projects } from "@/components/Projects";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteHeader } from "@/components/SiteHeader";
import { Skills } from "@/components/Skills";
import { WhyChoose } from "@/components/WhyChoose";
import { getPortfolioData } from "@/lib/portfolio-queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const portfolioData = await getPortfolioData();

  return (
    <div className="pageWrap homePage">
      <div className="homeMotionLayer" aria-hidden="true">
        <span className="homeOrb homeOrb--1" />
        <span className="homeOrb homeOrb--2" />
        <span className="homeOrb homeOrb--3" />
        <span className="homeOrb homeOrb--4" />
      </div>
      <main className="container homePageContent">
        <SiteHeader className="siteHeader--home" navLinks={portfolioData.navLinks} />
        <Hero data={portfolioData} />
        <ScrollReveal delayClass="reveal-stagger-1">
          <HomeSnapshot
            currentWork={portfolioData.currentWork}
            contact={portfolioData.contact}
            education={portfolioData.education}
            languages={portfolioData.languages}
            interests={portfolioData.interests}
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
        <ScrollReveal delayClass="reveal-stagger-3">
          <WhyChoose strengths={portfolioData.strengths} />
        </ScrollReveal>
        <ScrollReveal delayClass="reveal-stagger-4">
          <Skills skills={portfolioData.skills} currentlyLearning={portfolioData.currentlyLearning} />
        </ScrollReveal>
        <ScrollReveal delayClass="reveal-stagger-5">
          <Projects
            projects={portfolioData.projects.slice(0, 3)}
            totalProjects={portfolioData.totalProjectsLabel}
          />
        </ScrollReveal>
        <ScrollReveal delayClass="reveal-stagger-6">
          <Contact
            contact={portfolioData.contact}
            availability={portfolioData.availability}
            services={portfolioData.services}
          />
        </ScrollReveal>
      </main>
      <Footer name={portfolioData.name} />
    </div>
  );
}
