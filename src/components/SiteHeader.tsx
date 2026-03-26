import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="section heroCard siteHeader">
      <nav className="navLinks navOnly" aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/skills">Skills</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
