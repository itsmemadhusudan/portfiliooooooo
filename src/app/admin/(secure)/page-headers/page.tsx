import { updatePageHeaderAction } from "@/app/admin/(secure)/actions/page-header-actions";
import { AdminPage, AdminSection } from "@/components/admin/AdminPage";
import { getAllPageHeadersForAdmin } from "@/lib/portfolio-queries";

export default async function AdminPageHeadersPage() {
  const rows = await getAllPageHeadersForAdmin();

  return (
    <AdminPage
      title="Page titles & descriptions"
      description={
        <>
          Slugs are fixed: <code>about</code>, <code>skills</code>, <code>projects</code>, <code>resume</code>,{" "}
          <code>contact</code>, <code>gallery</code>. Edit copy only.
        </>
      }
    >

      {rows.map((r) => (
        <AdminSection key={r.slug} title={r.slug.toUpperCase()}>
          <form action={updatePageHeaderAction}>
            <input type="hidden" name="slug" value={r.slug} />
            <label>
              Title
              <input name="title" defaultValue={r.title} required />
            </label>
            <label>
              Description
              <textarea name="description" defaultValue={r.description} required rows={3} />
            </label>
            <button type="submit">Save</button>
          </form>
        </AdminSection>
      ))}
    </AdminPage>
  );
}
