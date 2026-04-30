import Link from "next/link";
import type { NavLinkEntry } from "@/data/portfolio";

type SiteHeaderProps = {
  className?: string;
  navLinks: NavLinkEntry[];
};

export function SiteHeader({ className = "", navLinks }: SiteHeaderProps) {
  const motionClass = className.includes("siteHeader--home") ? "" : "siteHeader--page ";
  const links = navLinks.length > 0 ? navLinks : [{ id: 0, label: "Home", href: "/" }];

  return (
    <header className={`section heroCard siteHeader ${motionClass}${className}`.trim()}>
      <nav className="navLinks navOnly" aria-label="Main navigation">
        {links.map((l) => (
          <Link key={l.id} href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
