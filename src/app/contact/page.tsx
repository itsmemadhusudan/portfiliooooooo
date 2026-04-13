import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteHeader } from "@/components/SiteHeader";
import { portfolioData } from "@/data/portfolio";

export default function ContactPage() {
  return (
    <div className="pageWrap">
      <main className="container">
        <SiteHeader />
        <ScrollReveal delayClass="reveal-stagger-1">
          <PageHeader
            title="Contact"
            description="Let's connect for backend roles, freelance projects, and collaborations."
          />
        </ScrollReveal>
        <ScrollReveal delayClass="reveal-stagger-2">
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
