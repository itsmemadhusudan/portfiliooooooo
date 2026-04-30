import Link from "next/link";

type PageHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function PageHeader({ title, description, eyebrow = "Portfolio Section" }: PageHeaderProps) {
  return (
    <section className="section card pageHeaderCard">
      <p className="eyebrow sectionEyebrow">{eyebrow}</p>
      <h1 className="innerPageTitle">{title}</h1>
      <p className="mutedText">{description}</p>
      <p className="sectionAction">
        <Link href="/">Back to Home</Link>
      </p>
    </section>
  );
}
