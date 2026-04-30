import { asc } from "drizzle-orm";
import {
  saveAchievementsAction,
  saveFocusAreasAction,
  saveInterestsAction,
  saveLanguagesAction,
  saveMetricsAction,
  saveServicesAction,
  saveStrengthsAction,
} from "@/app/admin/(secure)/actions/lists-actions";
import {
  achievements,
  focusAreas,
  interests,
  languages,
  metrics,
  services,
  strengths,
} from "@/db/schema";
import { getDb } from "@/lib/db";
import { AdminPage, AdminSection } from "@/components/admin/AdminPage";

export default async function AdminListsPage() {
  const db = getDb();
  const [ach, focus, svc, lang, intr, met, str] = await Promise.all([
    db.select().from(achievements).orderBy(asc(achievements.sortOrder)),
    db.select().from(focusAreas).orderBy(asc(focusAreas.sortOrder)),
    db.select().from(services).orderBy(asc(services.sortOrder)),
    db.select().from(languages).orderBy(asc(languages.sortOrder)),
    db.select().from(interests).orderBy(asc(interests.sortOrder)),
    db.select().from(metrics).orderBy(asc(metrics.sortOrder)),
    db.select().from(strengths).orderBy(asc(strengths.sortOrder)),
  ]);

  const strengthsText = str
    .map((s) => `${s.title}\n${s.description}`)
    .join("\n---\n");

  return (
    <AdminPage title="Lists & metrics" description="Bulk-manage repeated content blocks used across pages.">
      <AdminSection title="Achievements (one per line)">
        <form action={saveAchievementsAction}>
          <textarea name="text" rows={10} defaultValue={ach.map((a) => a.text).join("\n")} />
          <button type="submit">Save achievements</button>
        </form>
      </AdminSection>

      <AdminSection title="Focus areas (one per line)">
        <form action={saveFocusAreasAction}>
          <textarea name="text" rows={6} defaultValue={focus.map((a) => a.text).join("\n")} />
          <button type="submit">Save focus areas</button>
        </form>
      </AdminSection>

      <AdminSection title="Services (one per line)">
        <form action={saveServicesAction}>
          <textarea name="text" rows={8} defaultValue={svc.map((a) => a.text).join("\n")} />
          <button type="submit">Save services</button>
        </form>
      </AdminSection>

      <AdminSection title="Languages (one per line)">
        <form action={saveLanguagesAction}>
          <textarea name="text" rows={4} defaultValue={lang.map((a) => a.name).join("\n")} />
          <button type="submit">Save languages</button>
        </form>
      </AdminSection>

      <AdminSection title="Interests (one per line)">
        <form action={saveInterestsAction}>
          <textarea name="text" rows={8} defaultValue={intr.map((a) => a.text).join("\n")} />
          <button type="submit">Save interests</button>
        </form>
      </AdminSection>

      <AdminSection title="Metrics (one per line: value | label)">
        <form action={saveMetricsAction}>
          <textarea
            name="text"
            rows={5}
            defaultValue={met.map((m) => `${m.value} | ${m.label}`).join("\n")}
          />
          <button type="submit">Save metrics</button>
        </form>
      </AdminSection>

      <AdminSection
        title="Strengths"
        description={
          <>
            Each block: first line = title, following lines = description. Separate blocks with a line containing only{" "}
            <code>---</code>.
          </>
        }
      >
        <form action={saveStrengthsAction}>
          <textarea name="text" rows={16} defaultValue={strengthsText} />
          <button type="submit">Save strengths</button>
        </form>
      </AdminSection>
    </AdminPage>
  );
}
