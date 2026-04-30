import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteHeader } from "@/components/SiteHeader";
import { getPageCopy, getPortfolioData, getPublishedGallery } from "@/lib/portfolio-queries";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const [portfolioData, albums] = await Promise.all([getPortfolioData(), getPublishedGallery()]);
  const ph = getPageCopy(portfolioData, "gallery");

  return (
    <div className="pageWrap">
      <main className="container">
        <SiteHeader navLinks={portfolioData.navLinks} />
        <ScrollReveal delayClass="reveal-stagger-1">
          <PageHeader
            title={ph.title}
            description={ph.description}
            eyebrow={portfolioData.sectionEyebrow}
          />
        </ScrollReveal>

        {albums.length === 0 ? (
          <ScrollReveal delayClass="reveal-stagger-2">
            <p className="section mutedText">No published albums yet. Check back soon.</p>
          </ScrollReveal>
        ) : (
          albums.map((album, i) => (
            <ScrollReveal key={album.id} delayClass={`reveal-stagger-${Math.min(i + 2, 6)}`}>
              <section className="section card animate-up" id={album.slug}>
                <h3>{album.title}</h3>
                {album.description ? <p className="mutedText">{album.description}</p> : null}
                <div className="galleryGrid">
                  {album.images.map((img) => (
                    <figure key={img.id} className="galleryFigure">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.src} alt={img.caption ?? album.title} className="galleryImg" loading="lazy" />
                      {img.caption ? <figcaption className="galleryCaption">{img.caption}</figcaption> : null}
                    </figure>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ))
        )}

        <ScrollReveal delayClass="reveal-stagger-6">
          <p className="section">
            <Link href="/">← Back home</Link>
          </p>
        </ScrollReveal>
      </main>
      <Footer name={portfolioData.name} />
    </div>
  );
}
