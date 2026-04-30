import { asc } from "drizzle-orm";
import {
  addSkillAction,
  deleteSkillAction,
  saveCurrentlyLearningAction,
} from "@/app/admin/(secure)/actions/skill-actions";
import { AdminPage, AdminSection } from "@/components/admin/AdminPage";
import { currentlyLearning, skillCategories, skills } from "@/db/schema";
import { getDb } from "@/lib/db";

export default async function AdminSkillsPage() {
  const db = getDb();
  const cats = await db.select().from(skillCategories).orderBy(asc(skillCategories.sortOrder));
  const allSkills = await db.select().from(skills);
  const learning = await db.select().from(currentlyLearning).orderBy(asc(currentlyLearning.sortOrder));

  return (
    <AdminPage title="Skills" description="Manage categories, chips, and currently learning items.">
      {cats.map((c) => {
        const list = allSkills
          .filter((s) => s.categoryId === c.id)
          .sort((a, b) => a.sortOrder - b.sortOrder);
        return (
          <AdminSection key={c.id} title={c.title} description={`Slug: ${c.slug}`}>
            <table>
              <tbody>
                {list.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>
                      <form action={deleteSkillAction}>
                        <input type="hidden" name="id" value={s.id} />
                        <button type="submit">Delete</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form action={addSkillAction}>
              <input type="hidden" name="categorySlug" value={c.slug} />
              <label>
                New skill
                <input name="name" placeholder="Skill name" required />
              </label>
              <button type="submit">Add</button>
            </form>
          </AdminSection>
        );
      })}

      <AdminSection title="Currently learning" description="One item per line.">
        <form action={saveCurrentlyLearningAction}>
          <label>
            Learning queue
            <textarea name="lines" rows={8} defaultValue={learning.map((l) => l.name).join("\n")} />
          </label>
          <button type="submit">Save</button>
        </form>
      </AdminSection>
    </AdminPage>
  );
}
