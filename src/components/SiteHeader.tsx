import Link from "next/link";

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className = "" }: SiteHeaderProps) {
  const motionClass = className.includes("siteHeader--home") ? "" : "siteHeader--page ";
  return (
    <header className={`section heroCard siteHeader ${motionClass}${className}`.trim()}>
      <nav className="navLinks navOnly" aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/skills">Skills</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/resume">Resume</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
