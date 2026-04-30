import { asc, eq } from "drizzle-orm";
import { updateProfileAction } from "@/app/admin/(secure)/actions/profile-actions";
import { AdminPage, AdminSection } from "@/components/admin/AdminPage";
import { currentWorkHighlights, profile } from "@/db/schema";
import { getDb } from "@/lib/db";

export default async function AdminProfilePage() {
  const db = getDb();
  const [p] = await db.select().from(profile).limit(1);
  if (!p) return <p>No profile in database.</p>;
  const hl = await db
    .select()
    .from(currentWorkHighlights)
    .where(eq(currentWorkHighlights.profileId, p.id))
    .orderBy(asc(currentWorkHighlights.sortOrder));

  return (
    <AdminPage title="Profile, hero, SEO & current work">
      <AdminSection>
      <form action={updateProfileAction}>
        <h2>Identity</h2>
        <label>
          Name
          <input name="name" defaultValue={p.name} required />
        </label>
        <label>
          Designation
          <input name="designation" defaultValue={p.designation} required />
        </label>
        <label>
          Tagline
          <textarea name="tagline" defaultValue={p.tagline} required />
        </label>
        <label>
          Summary
          <textarea name="summary" defaultValue={p.summary} required />
        </label>
        <label>
          Availability
          <textarea name="availability" defaultValue={p.availability} required />
        </label>
        <label>
          Total projects label (e.g. 23+)
          <input name="totalProjectsLabel" defaultValue={p.totalProjectsLabel} required />
        </label>

        <h2>Hero (home)</h2>
        <label>
          Hero eyebrow (small line above name)
          <input name="heroEyebrow" defaultValue={p.heroEyebrow} required />
        </label>
        <label>
          Hero image path (e.g. /profile/photo.png or /uploads/gallery/…)
          <input name="heroImageSrc" defaultValue={p.heroImageSrc} required />
        </label>
        <label>
          Hero image alt text
          <input name="heroImageAlt" defaultValue={p.heroImageAlt} required />
        </label>
        <label>
          Hero stack line (under image)
          <input name="heroStackLine" defaultValue={p.heroStackLine} required />
        </label>

        <h2>Site metadata</h2>
        <label>
          Browser tab title
          <input name="siteTitle" defaultValue={p.siteTitle} required />
        </label>
        <label>
          Meta description
          <textarea name="siteDescription" defaultValue={p.siteDescription} required rows={3} />
        </label>
        <label>
          Open Graph title (optional, defaults to tab title)
          <input name="ogTitle" defaultValue={p.ogTitle ?? ""} placeholder="Leave empty to reuse site title" />
        </label>
        <label>
          Open Graph description (optional)
          <textarea name="ogDescription" defaultValue={p.ogDescription ?? ""} rows={2} />
        </label>
        <label>
          Inner page eyebrow (above H1 on About, Skills, …)
          <input name="sectionEyebrow" defaultValue={p.sectionEyebrow} required />
        </label>

        <h2>Contact</h2>
        <label>
          Phone
          <input name="phone" defaultValue={p.phone} required />
        </label>
        <label>
          Email
          <input name="email" type="email" defaultValue={p.email} required />
        </label>
        <label>
          LinkedIn URL
          <input name="linkedin" defaultValue={p.linkedin} required />
        </label>
        <label>
          GitHub URL
          <input name="github" defaultValue={p.github} required />
        </label>
        <label>
          Location
          <input name="location" defaultValue={p.location} required />
        </label>

        <h2>Current work</h2>
        <label>
          Company
          <input name="cwCompany" defaultValue={p.cwCompany} required />
        </label>
        <label>
          Role
          <input name="cwRole" defaultValue={p.cwRole} required />
        </label>
        <label>
          Status
          <input name="cwStatus" defaultValue={p.cwStatus} required />
        </label>
        <label>
          Highlights (one per line)
          <textarea name="highlights" defaultValue={hl.map((h) => h.text).join("\n")} />
        </label>
        <button type="submit">Save all</button>
      </form>
      </AdminSection>
    </AdminPage>
  );
}
