import { assertAdminSession, logoutAction } from "@/app/admin/auth-actions";
import { AdminTopNav } from "@/components/admin/AdminTopNav";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/profile", label: "Profile & SEO" },
  { href: "/admin/nav", label: "Nav" },
  { href: "/admin/page-headers", label: "Page copy" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/lists", label: "Lists & metrics" },
  { href: "/admin/gallery", label: "Gallery" },
];

export default async function AdminSecureLayout({ children }: { children: React.ReactNode }) {
  await assertAdminSession();

  return (
    <div className="adminPanel">
      <aside className="adminSidebar">
        <div className="adminBrand">
          <span className="adminBrandDot" />
          <span>Portfolio Admin</span>
        </div>
        <AdminTopNav links={links} />
      </aside>

      <div className="adminMain">
        <header className="adminTopBar">
          <h1 className="adminTopTitle">Admin Control Center</h1>
          <form action={logoutAction}>
            <button type="submit" className="btnGhost">
              Log out
            </button>
          </form>
        </header>
        {children}
      </div>
    </div>
  );
}
