import { asc } from "drizzle-orm";
import { saveAboutParagraphsAction } from "@/app/admin/(secure)/actions/about-actions";
import { AdminPage, AdminSection } from "@/components/admin/AdminPage";
import { aboutParagraphs } from "@/db/schema";
import { getDb } from "@/lib/db";

export default async function AdminAboutPage() {
  const db = getDb();
  const rows = await db.select().from(aboutParagraphs).orderBy(asc(aboutParagraphs.sortOrder));
  const text = rows.map((r) => r.text).join("\n\n");

  return (
    <AdminPage
      title="About content"
      description="Manage long-form introduction paragraphs shown on home and about pages."
    >
      <AdminSection description="Separate paragraphs with a blank line.">
        <form action={saveAboutParagraphsAction}>
          <label>
            Paragraphs
            <textarea name="paragraphs" defaultValue={text} rows={16} />
          </label>
          <button type="submit">Save</button>
        </form>
      </AdminSection>
    </AdminPage>
  );
}
