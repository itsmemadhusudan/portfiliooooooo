import { asc } from "drizzle-orm";
import { addEducationAction, deleteEducationAction } from "@/app/admin/(secure)/actions/education-actions";
import { AdminPage, AdminSection } from "@/components/admin/AdminPage";
import { education } from "@/db/schema";
import { getDb } from "@/lib/db";

export default async function AdminEducationPage() {
  const db = getDb();
  const rows = await db.select().from(education).orderBy(asc(education.sortOrder));

  return (
    <AdminPage title="Education" description="Manage academic timeline and degree history.">
      <AdminSection title="Existing entries">
        <table>
          <thead>
            <tr>
              <th>Degree</th>
              <th>Institution</th>
              <th>Duration</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.degree}</td>
                <td>{r.institution}</td>
                <td>{r.duration}</td>
                <td>
                  <form action={deleteEducationAction}>
                    <input type="hidden" name="id" value={r.id} />
                    <button type="submit">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminSection>

      <AdminSection title="Add entry">
        <form action={addEducationAction}>
          <label>
            Degree
            <input name="degree" required />
          </label>
          <label>
            Institution
            <input name="institution" required />
          </label>
          <label>
            Duration
            <input name="duration" required />
          </label>
          <button type="submit">Add</button>
        </form>
      </AdminSection>
    </AdminPage>
  );
}
