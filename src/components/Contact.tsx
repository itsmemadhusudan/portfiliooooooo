import { PortfolioData } from "@/data/portfolio";
import { ContactForm } from "@/components/ContactForm";

type ContactProps = {
  contact: PortfolioData["contact"];
  availability: PortfolioData["availability"];
  services: PortfolioData["services"];
};

export function Contact({ contact, availability, services }: ContactProps) {
  return (
    <section className="section contactSection animate-up" id="contact">
      <article className="card animate-up delay-1">
        <h3>Contact Information</h3>
        <p>{availability}</p>
        <ul className="contactList">
          <li>
            <span>Phone:</span>{" "}
            <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} aria-label="Call phone number">
              {contact.phone}
            </a>
          </li>
          <li>
            <span>Email:</span>{" "}
            <a href={`mailto:${contact.email}`} aria-label="Send email">
              {contact.email}
            </a>
          </li>
          <li>
            <span>LinkedIn:</span>{" "}
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              {contact.linkedin.replace("https://", "")}
            </a>
          </li>
          <li>
            <span>Location:</span> {contact.location}
          </li>
          <li>
            <span>GitHub:</span>{" "}
            <a href={contact.github} target="_blank" rel="noreferrer">
              {contact.github.replace("https://", "")}
            </a>
          </li>
        </ul>
      </article>

      <article className="card animate-up delay-2">
        <h3>Services I Can Help With</h3>
        <ul className="simpleList">
          {services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </article>

      <article className="card animate-up delay-3">
        <h3>Send a Message</h3>
        <p className="mutedText">Your message will be delivered to timmadh@gmail.com.</p>
        <ContactForm />
      </article>
    </section>
  );
}
