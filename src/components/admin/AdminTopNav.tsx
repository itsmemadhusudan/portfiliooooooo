"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminLink = {
  href: string;
  label: string;
};

type AdminTopNavProps = {
  links: AdminLink[];
};

export function AdminTopNav({ links }: AdminTopNavProps) {
  const pathname = usePathname();
  return (
    <div className="adminSideLinks">
      {links.map((l) => {
        const active = pathname === l.href || (l.href !== "/admin" && pathname.startsWith(`${l.href}/`));
        return (
          <Link key={l.href} href={l.href} className={`adminSideLink ${active ? "isActive" : ""}`.trim()}>
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}
