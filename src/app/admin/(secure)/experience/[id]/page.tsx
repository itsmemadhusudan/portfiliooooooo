import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { updateExperienceAction } from "@/app/admin/(secure)/actions/experience-actions";
import { AdminPage, AdminSection } from "@/components/admin/AdminPage";
import { experiencePoints, experiences } from "@/db/schema";
import { getDb } from "@/lib/db";

type Props = { params: Promise<{ id: string }> };

export default async function AdminExperienceEditPage({ params }: Props) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isInteger(id)) notFound();

  const db = getDb();
  const [e] = await db.select().from(experiences).where(eq(experiences.id, id));
  if (!e) notFound();
  const pts = await db
    .select()
    .from(experiencePoints)
    .where(eq(experiencePoints.experienceId, id))
    .orderBy(asc(experiencePoints.sortOrder));

  return (
    <AdminPage title={`Edit experience: ${e.role}`}>
      <AdminSection>
        <form action={updateExperienceAction}>
          <input type="hidden" name="id" value={e.id} />
          <label>
            Role
            <input name="role" defaultValue={e.role} required />
          </label>
          <label>
            Duration
            <input name="duration" defaultValue={e.duration} required />
          </label>
          <label>
            Points (one per line)
            <textarea name="points" defaultValue={pts.map((p) => p.text).join("\n")} rows={8} />
          </label>
          <button type="submit">Save</button>
        </form>
      </AdminSection>
    </AdminPage>
  );
}
