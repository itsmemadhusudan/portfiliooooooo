"use client";

import { useRef, useState } from "react";

export function UploadToAlbum({ albumId }: { albumId: number }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function onUpload() {
    if (uploading) return;
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setStatus("Choose an image file.");
      return;
    }
    setUploading(true);
    setStatus("Uploading…");
    const fd = new FormData();
    fd.set("file", file);
    fd.set("albumId", String(albumId));
    const res = await fetch("/api/admin/gallery/upload", { method: "POST", body: fd });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus(j.error ?? "Upload failed");
      setUploading(false);
      return;
    }
    setStatus("Done. Reloading.");
    window.location.reload();
  }

  return (
    <div className="adminUploadBox">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="adminUploadInput"
      />
      <button type="button" onClick={() => void onUpload()} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload image"}
      </button>
      {status ? <p className="muted">{status}</p> : null}
    </div>
  );
}
