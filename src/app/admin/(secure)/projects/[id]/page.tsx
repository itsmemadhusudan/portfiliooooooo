import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { updateProjectAction } from "@/app/admin/(secure)/actions/project-actions";
import { AdminPage, AdminSection } from "@/components/admin/AdminPage";
import { projectHighlights, projects } from "@/db/schema";
import { getDb } from "@/lib/db";

type Props = { params: Promise<{ id: string }> };

export default async function AdminProjectEditPage({ params }: Props) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isInteger(id)) notFound();

  const db = getDb();
  const [p] = await db.select().from(projects).where(eq(projects.id, id));
  if (!p) notFound();
  const hl = await db
    .select()
    .from(projectHighlights)
    .where(eq(projectHighlights.projectId, id))
    .orderBy(asc(projectHighlights.sortOrder));

  return (
    <AdminPage title={`Edit project: ${p.name}`}>
      <AdminSection>
        <form action={updateProjectAction}>
          <input type="hidden" name="id" value={p.id} />
          <label>
            Name
            <input name="name" defaultValue={p.name} required />
          </label>
          <label>
            Stack
            <input name="stack" defaultValue={p.stack} required />
          </label>
          <label>
            Description
            <textarea name="description" defaultValue={p.description} required rows={5} />
          </label>
          <label>
            Highlights (one per line)
            <textarea name="highlights" defaultValue={hl.map((h) => h.text).join("\n")} rows={8} />
          </label>
          <button type="submit">Save</button>
        </form>
      </AdminSection>
    </AdminPage>
  );
}
