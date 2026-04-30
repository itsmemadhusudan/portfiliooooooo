import Link from "next/link";
import { asc } from "drizzle-orm";
import { addExperienceAction, deleteExperienceAction } from "@/app/admin/(secure)/actions/experience-actions";
import { AdminPage, AdminSection } from "@/components/admin/AdminPage";
import { experiences } from "@/db/schema";
import { getDb } from "@/lib/db";

export default async function AdminExperiencePage() {
  const db = getDb();
  const exps = await db.select().from(experiences).orderBy(asc(experiences.sortOrder));

  return (
    <AdminPage title="Experience" description="Manage professional timeline entries and bullets.">
      <AdminSection title="Existing experience">
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Duration</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {exps.map((e) => (
              <tr key={e.id}>
                <td>{e.role}</td>
                <td>{e.duration}</td>
                <td className="rowActions">
                  <Link href={`/admin/experience/${e.id}`}>Edit</Link>
                  <form action={deleteExperienceAction} style={{ display: "inline" }}>
                    <input type="hidden" name="id" value={e.id} />
                    <button type="submit">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminSection>

      <AdminSection title="Add new experience">
        <form action={addExperienceAction}>
          <label>
            Role
            <input name="role" required />
          </label>
          <label>
            Duration
            <input name="duration" required />
          </label>
          <label>
            Points (one per line)
            <textarea name="points" rows={6} />
          </label>
          <button type="submit">Add</button>
        </form>
      </AdminSection>
    </AdminPage>
  );
}
