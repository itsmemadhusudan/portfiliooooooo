import Link from "next/link";
import { asc } from "drizzle-orm";
import { addProjectAction, deleteProjectAction } from "@/app/admin/(secure)/actions/project-actions";
import { AdminPage, AdminSection } from "@/components/admin/AdminPage";
import { projects } from "@/db/schema";
import { getDb } from "@/lib/db";

export default async function AdminProjectsPage() {
  const db = getDb();
  const rows = await db.select().from(projects).orderBy(asc(projects.sortOrder));

  return (
    <AdminPage title="Projects" description="Manage portfolio projects and their highlights.">
      <AdminSection title="Existing projects">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stack</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.stack}</td>
                <td className="rowActions">
                  <Link href={`/admin/projects/${r.id}`}>Edit</Link>
                  <form action={deleteProjectAction} style={{ display: "inline" }}>
                    <input type="hidden" name="id" value={r.id} />
                    <button type="submit">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminSection>

      <AdminSection title="Add new project">
        <form action={addProjectAction}>
          <label>
            Name
            <input name="name" required />
          </label>
          <label>
            Stack
            <input name="stack" required />
          </label>
          <label>
            Description
            <textarea name="description" required rows={4} />
          </label>
          <label>
            Highlights (one per line)
            <textarea name="highlights" rows={6} />
          </label>
          <button type="submit">Add project</button>
        </form>
      </AdminSection>
    </AdminPage>
  );
}
