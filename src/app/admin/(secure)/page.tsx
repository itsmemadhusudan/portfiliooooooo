import Link from "next/link";
import {
  achievements,
  education,
  experiences,
  galleryAlbums,
  galleryImages,
  metrics,
  navLinks,
  projects,
  services,
  skills,
} from "@/db/schema";
import { getDb } from "@/lib/db";
import { AdminPage, AdminSection } from "@/components/admin/AdminPage";

export default async function AdminDashboardPage() {
  const db = getDb();
  const [
    projectRows,
    skillRows,
    expRows,
    imageRows,
    albumRows,
    serviceRows,
    achievementRows,
    metricRows,
    eduRows,
    navRows,
  ] = await Promise.all([
    db.select({ id: projects.id }).from(projects),
    db.select({ id: skills.id }).from(skills),
    db.select({ id: experiences.id }).from(experiences),
    db.select({ id: galleryImages.id }).from(galleryImages),
    db.select({ id: galleryAlbums.id }).from(galleryAlbums),
    db.select({ id: services.id }).from(services),
    db.select({ id: achievements.id }).from(achievements),
    db.select({ id: metrics.id }).from(metrics),
    db.select({ id: education.id }).from(education),
    db.select({ id: navLinks.id }).from(navLinks),
  ]);

  const statCards = [
    { label: "Projects", value: projectRows.length, href: "/admin/projects" },
    { label: "Skills", value: skillRows.length, href: "/admin/skills" },
    { label: "Experience", value: expRows.length, href: "/admin/experience" },
    { label: "Gallery Images", value: imageRows.length, href: "/admin/gallery" },
  ];

  return (
    <AdminPage
      title="Dashboard"
      description="Manage portfolio content, structure, and media from one place."
    >
      <section className="adminStatGrid">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className="adminStatCard">
            <p className="adminStatLabel">{card.label}</p>
            <p className="adminStatValue">{card.value}</p>
          </Link>
        ))}
      </section>

      <AdminSection
        title="System snapshot"
        description="Content modules loaded from SQLite. Any save in admin automatically revalidates public pages."
      >
        <div className="adminQuickGrid">
          <div className="adminCard" style={{ margin: 0 }}>
            <p className="adminStatLabel">Navigation Links</p>
            <p className="adminStatValue">{navRows.length}</p>
          </div>
          <div className="adminCard" style={{ margin: 0 }}>
            <p className="adminStatLabel">Gallery Albums</p>
            <p className="adminStatValue">{albumRows.length}</p>
          </div>
          <div className="adminCard" style={{ margin: 0 }}>
            <p className="adminStatLabel">Education Rows</p>
            <p className="adminStatValue">{eduRows.length}</p>
          </div>
          <div className="adminCard" style={{ margin: 0 }}>
            <p className="adminStatLabel">Service Entries</p>
            <p className="adminStatValue">{serviceRows.length}</p>
          </div>
          <div className="adminCard" style={{ margin: 0 }}>
            <p className="adminStatLabel">Achievement Entries</p>
            <p className="adminStatValue">{achievementRows.length}</p>
          </div>
          <div className="adminCard" style={{ margin: 0 }}>
            <p className="adminStatLabel">Metric Items</p>
            <p className="adminStatValue">{metricRows.length}</p>
          </div>
        </div>
      </AdminSection>

      <AdminSection title="Quick actions">
        <div className="adminQuickGrid">
          <Link href="/admin/profile" className="adminQuickLink">
            Update brand, hero, SEO, and contact
          </Link>
          <Link href="/admin/nav" className="adminQuickLink">
            Manage public navigation links
          </Link>
          <Link href="/admin/page-headers" className="adminQuickLink">
            Edit page titles and descriptions
          </Link>
          <Link href="/admin/projects" className="adminQuickLink">
            Add or edit project portfolio
          </Link>
          <Link href="/admin/skills" className="adminQuickLink">
            Update skills and learning tracks
          </Link>
          <Link href="/admin/gallery" className="adminQuickLink">
            Upload and organize gallery media
          </Link>
        </div>
      </AdminSection>
    </AdminPage>
  );
}
