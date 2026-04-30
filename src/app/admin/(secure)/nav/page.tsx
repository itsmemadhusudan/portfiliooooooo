import {
  addNavLinkAction,
  deleteNavLinkAction,
  updateNavLinkAction,
} from "@/app/admin/(secure)/actions/nav-actions";
import { AdminPage, AdminSection } from "@/components/admin/AdminPage";
import { getAllNavLinksForAdmin } from "@/lib/portfolio-queries";

export default async function AdminNavPage() {
  const rows = await getAllNavLinksForAdmin();

  return (
    <AdminPage
      title="Navigation"
      description="Only visible links appear in the public header. Lower sort numbers appear first."
    >

      {rows.map((r) => (
        <AdminSection key={r.id} title={`Link #${r.id}`}>
          <form action={updateNavLinkAction} className="rowActions" style={{ flexWrap: "wrap", gap: "0.5rem" }}>
            <input type="hidden" name="id" value={r.id} />
            <label style={{ flex: "1 1 120px" }}>
              Label
              <input name="label" defaultValue={r.label} required />
            </label>
            <label style={{ flex: "1 1 140px" }}>
              Path
              <input name="href" defaultValue={r.href} required />
            </label>
            <label style={{ flex: "0 0 90px" }}>
              Sort
              <input name="sortOrder" type="number" defaultValue={r.sortOrder} required />
            </label>
            <label style={{ display: "flex", alignItems: "flex-end", gap: "0.35rem", paddingBottom: "0.2rem" }}>
              <input type="checkbox" name="visible" defaultChecked={r.visible} />
              Visible
            </label>
            <button type="submit">Save</button>
          </form>
          <form action={deleteNavLinkAction}>
            <input type="hidden" name="id" value={r.id} />
            <button type="submit">Delete link</button>
          </form>
        </AdminSection>
      ))}

      <AdminSection title="Add link">
        <form action={addNavLinkAction}>
          <label>
            Label
            <input name="label" required />
          </label>
          <label>
            Path (e.g. /about)
            <input name="href" required />
          </label>
          <button type="submit">Add</button>
        </form>
      </AdminSection>
    </AdminPage>
  );
}
