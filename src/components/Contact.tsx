import { PortfolioData } from "@/data/portfolio";

type ContactProps = {
  contact: PortfolioData["contact"];
};

export function Contact({ contact }: ContactProps) {
  return (
    <section className="section card" id="contact">
      <h3>Contact</h3>
      <p>Open to backend opportunities, collaborations, and freelance projects.</p>
      <ul className="contactList">
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
          <span>GitHub:</span>{" "}
          <a href={contact.github} target="_blank" rel="noreferrer">
            {contact.github.replace("https://", "")}
          </a>
        </li>
      </ul>
    </section>
  );
}
