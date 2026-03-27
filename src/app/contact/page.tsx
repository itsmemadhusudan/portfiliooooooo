import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { SiteHeader } from "@/components/SiteHeader";
import { portfolioData } from "@/data/portfolio";

export default function ContactPage() {
  return (
    <div className="pageWrap">
      <main className="container">
        <SiteHeader />
        <PageHeader
          title="Contact"
          description="Let's connect for backend roles, freelance projects, and collaborations."
        />
        <Contact
          contact={portfolioData.contact}
          availability={portfolioData.availability}
          services={portfolioData.services}
        />
      </main>
      <Footer name={portfolioData.name} />
    </div>
  );
}
