import { UploadToAlbum } from "@/components/admin/UploadToAlbum";
import {
  createGalleryAlbumAction,
  deleteGalleryAlbumAction,
  deleteGalleryImageAction,
  updateGalleryAlbumAction,
  updateGalleryImageCaptionAction,
} from "@/app/admin/(secure)/actions/gallery-actions";
import { AdminPage, AdminSection } from "@/components/admin/AdminPage";
import { getAllGalleryAlbumsForAdmin } from "@/lib/portfolio-queries";

export default async function AdminGalleryPage() {
  const albums = await getAllGalleryAlbumsForAdmin();
  const totalImages = albums.reduce((sum, a) => sum + a.images.length, 0);
  const publishedCount = albums.filter((a) => a.published).length;

  return (
    <AdminPage title="Gallery" description="Manage albums, visibility, image uploads, and captions.">
      <section className="adminStatGrid">
        <article className="adminStatCard">
          <p className="adminStatLabel">Albums</p>
          <p className="adminStatValue">{albums.length}</p>
        </article>
        <article className="adminStatCard">
          <p className="adminStatLabel">Published Albums</p>
          <p className="adminStatValue">{publishedCount}</p>
        </article>
        <article className="adminStatCard">
          <p className="adminStatLabel">Total Images</p>
          <p className="adminStatValue">{totalImages}</p>
        </article>
        <article className="adminStatCard">
          <p className="adminStatLabel">Unpublished</p>
          <p className="adminStatValue">{albums.length - publishedCount}</p>
        </article>
      </section>

      <AdminSection title="New album">
        <form action={createGalleryAlbumAction}>
          <label>
            Title
            <input name="title" required />
          </label>
          <label>
            Description (optional)
            <textarea name="description" rows={2} />
          </label>
          <button type="submit">Create album</button>
        </form>
      </AdminSection>

      {albums.length === 0 ? (
        <AdminSection title="No albums yet" description="Create first album to start uploading gallery images.">
          <p className="muted">Once album exists, upload images and captions from this page.</p>
        </AdminSection>
      ) : null}

      {albums.map((a) => (
        <AdminSection key={a.id} title={a.title} description={`Slug: ${a.slug}`}>
          <div className="adminGalleryAlbumGrid">
            <div className="adminGalleryAlbumPanel">
              <form action={updateGalleryAlbumAction}>
                <input type="hidden" name="id" value={a.id} />
                <label>
                  Album title
                  <input name="title" defaultValue={a.title} />
                </label>
                <label>
                  Description
                  <textarea name="description" rows={2} defaultValue={a.description ?? ""} />
                </label>
                <label className="adminCheckboxLabel">
                  <input type="checkbox" name="published" defaultChecked={a.published} />
                  Published (visible on public site)
                </label>
                <button type="submit">Save album</button>
              </form>

              <div className="adminGalleryDangerZone">
                <p className="muted">Danger zone</p>
                <form action={deleteGalleryAlbumAction}>
                  <input type="hidden" name="id" value={a.id} />
                  <button type="submit" className="btnGhost">Delete entire album</button>
                </form>
              </div>
            </div>

            <div className="adminGalleryAlbumPanel">
              <h4 className="adminSectionTitle">Images ({a.images.length})</h4>
              <UploadToAlbum albumId={a.id} />

              <div className="adminGalleryImageGrid">
                {a.images.map((img) => (
                  <article key={img.id} className="adminGalleryImageCard">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.filePath} alt={img.caption ?? a.title} className="adminGalleryImagePreview" />
                    <form action={updateGalleryImageCaptionAction}>
                      <input type="hidden" name="id" value={img.id} />
                      <label>
                        Caption
                        <input name="caption" placeholder="Caption" defaultValue={img.caption ?? ""} />
                      </label>
                      <button type="submit">Save caption</button>
                    </form>
                    <form action={deleteGalleryImageAction}>
                      <input type="hidden" name="id" value={img.id} />
                      <button type="submit" className="btnGhost">Delete image</button>
                    </form>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </AdminSection>
      ))}
    </AdminPage>
  );
}
