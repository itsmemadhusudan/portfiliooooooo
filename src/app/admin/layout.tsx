export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="adminRoot">
      <style>{`
        .adminRoot { min-height: 100vh; background: var(--bg, #0f1117); color: #e8eaed; padding: 1.5rem; }
        .adminRoot .adminLoginShell {
          margin: -1.5rem;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1.25rem, 4vw, 2.5rem);
          background:
            radial-gradient(ellipse 100% 90% at 50% -30%, rgba(29, 95, 102, 0.28), transparent 55%),
            radial-gradient(ellipse 70% 50% at 100% 100%, rgba(240, 183, 38, 0.06), transparent 45%),
            linear-gradient(168deg, #080a0f 0%, #10141c 42%, #0b0e14 100%);
        }
        .adminLoginCard {
          width: 100%;
          max-width: 420px;
          padding: clamp(2rem, 5vw, 2.75rem);
          border-radius: 16px;
          background: rgba(22, 26, 34, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 0 0 1px rgba(0, 0, 0, 0.35) inset,
            0 24px 56px rgba(0, 0, 0, 0.45),
            0 4px 16px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .adminLoginCardHeader { text-align: center; margin-bottom: 1.75rem; }
        .adminLoginBadge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          margin-bottom: 1.25rem;
          border-radius: 14px;
          background: linear-gradient(145deg, rgba(29, 95, 102, 0.45), rgba(18, 72, 78, 0.35));
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #c5e8e4;
          font-size: 1.35rem;
          line-height: 1;
        }
        .adminLoginTitle {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #f1f3f4;
        }
        .adminLoginSubtitle {
          margin: 0.45rem 0 0;
          font-size: 0.9rem;
          color: #9aa0a6;
          font-weight: 400;
        }
        .adminLoginForm label {
          margin-top: 1.1rem;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #bdc1c6;
        }
        .adminLoginForm input {
          margin-top: 0.35rem !important;
          max-width: none !important;
          padding: 0.72rem 0.95rem !important;
          border-radius: 10px !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          background: rgba(8, 10, 15, 0.65) !important;
          font-size: 0.95rem !important;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .adminLoginForm input:focus {
          outline: none;
          border-color: rgba(29, 95, 102, 0.65) !important;
          box-shadow: 0 0 0 3px rgba(29, 95, 102, 0.2);
        }
        .adminLoginForm button[type="submit"] {
          width: 100%;
          margin-top: 1.5rem !important;
          padding: 0.72rem 1rem !important;
          border-radius: 10px !important;
          font-size: 0.95rem !important;
          font-weight: 600 !important;
          letter-spacing: 0.03em !important;
          background: linear-gradient(180deg, #247a82 0%, #1d5f66 100%) !important;
          box-shadow: 0 4px 14px rgba(18, 72, 78, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.12);
          cursor: pointer;
          transition: filter 0.15s ease, transform 0.08s ease;
        }
        .adminLoginForm button[type="submit"]:hover {
          filter: brightness(1.06);
        }
        .adminLoginForm button[type="submit"]:active {
          transform: translateY(1px);
        }
        .adminLoginForm button[type="submit"]:disabled {
          filter: grayscale(0.35);
          opacity: 0.82;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .adminLoginForm fieldset:disabled input {
          opacity: 0.55;
          cursor: not-allowed;
        }
        .adminLoginModalOverlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          animation: adminLoginFadeIn 0.2s ease-out;
        }
        @keyframes adminLoginFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .adminLoginModalDialog {
          max-width: 360px;
          width: 100%;
          text-align: center;
          padding: 2rem 1.75rem;
          border-radius: 18px;
          background: linear-gradient(180deg, #1e242e 0%, #161b24 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 28px 64px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0, 0, 0, 0.35) inset;
        }
        .adminLoginModalMessage {
          margin: 0;
          font-size: 1.35rem;
          font-weight: 600;
          color: #fdd663;
          letter-spacing: -0.02em;
          line-height: 1.45;
        }
        .adminLoginModalMessage .adminLoginModalEmoji {
          font-size: 2rem;
          vertical-align: middle;
          line-height: 1;
        }
        .adminLoginModalWait {
          margin: 1rem 0 0;
          font-size: 0.9rem;
          color: #9aa0a6;
        }
        .adminLoginFoot {
          margin-top: 1.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          text-align: center;
          font-size: 0.75rem;
          color: #6b7078;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .adminLoginAlert {
          margin: 1rem 0 0;
          padding: 0.65rem 0.85rem;
          border-radius: 10px;
          background: rgba(220, 80, 80, 0.12);
          border: 1px solid rgba(242, 139, 130, 0.35);
          color: #f5aea8;
          font-size: 0.875rem;
          text-align: center;
        }
        .adminRoot a { color: #8ab4f8; }
        .adminRoot .adminPanel {
          margin: -1.5rem;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 252px minmax(0, 1fr);
          background: linear-gradient(160deg, #070a0f 0%, #0b1119 48%, #101826 100%);
        }
        .adminRoot .adminSidebar {
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(180deg, rgba(16, 22, 32, 0.96), rgba(10, 15, 24, 0.96));
          padding: 1rem;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }
        .adminRoot .adminBrand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: #d4f4f0;
          margin-bottom: 1rem;
          letter-spacing: 0.02em;
        }
        .adminRoot .adminBrandDot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #22b8cf;
          box-shadow: 0 0 10px rgba(34, 184, 207, 0.7);
        }
        .adminRoot .adminSideLinks {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .adminRoot .adminSideLink {
          display: block;
          text-decoration: none;
          padding: 0.58rem 0.72rem;
          border-radius: 10px;
          color: #cad2dc;
          font-size: 0.9rem;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .adminRoot .adminSideLink:hover {
          background: rgba(34, 184, 207, 0.12);
          color: #edf9ff;
        }
        .adminRoot .adminSideLink.isActive {
          background: linear-gradient(180deg, rgba(34, 184, 207, 0.2), rgba(34, 184, 207, 0.08));
          color: #f4fcff;
          border: 1px solid rgba(34, 184, 207, 0.35);
        }
        .adminRoot .adminMain {
          min-width: 0;
          padding: 1.2rem 1.4rem 2rem;
        }
        .adminRoot .adminPageHeader {
          margin-bottom: 0.9rem;
        }
        .adminRoot .adminPageTitle {
          margin: 0 0 0.35rem;
          font-size: 1.1rem;
          color: #f5fbff;
          letter-spacing: -0.01em;
        }
        .adminRoot .adminSectionTitle {
          margin: 0 0 0.55rem;
          font-size: 1rem;
          color: #f1f7ff;
        }
        .adminRoot .adminTopBar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          gap: 0.8rem;
        }
        .adminRoot .adminTopTitle {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 700;
          color: #f6fbff;
        }
        .adminRoot .adminCard {
          background: linear-gradient(180deg, rgba(21, 27, 36, 0.97), rgba(14, 20, 30, 0.98));
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 14px;
          padding: 1rem 1.1rem;
          margin-bottom: 1rem;
          box-shadow: 0 14px 24px rgba(0, 0, 0, 0.2);
        }
        .adminRoot .adminStatGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.9rem;
          margin-bottom: 1rem;
        }
        .adminRoot .adminStatCard {
          background: linear-gradient(180deg, rgba(16, 20, 29, 0.98), rgba(10, 15, 24, 0.98));
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 0.95rem 1rem;
        }
        .adminRoot .adminStatValue {
          margin: 0.15rem 0 0;
          font-size: 1.45rem;
          font-weight: 700;
          color: #f2f8ff;
        }
        .adminRoot .adminStatLabel {
          margin: 0;
          font-size: 0.82rem;
          color: #93a0ae;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .adminRoot .adminQuickGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.75rem;
        }
        .adminRoot .adminQuickLink {
          display: block;
          text-decoration: none;
          background: rgba(34, 184, 207, 0.08);
          border: 1px solid rgba(34, 184, 207, 0.2);
          border-radius: 10px;
          padding: 0.72rem 0.8rem;
          color: #daf5ff;
          font-weight: 600;
        }
        .adminRoot .adminGalleryAlbumGrid {
          display: grid;
          grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
          gap: 1rem;
        }
        .adminRoot .adminGalleryAlbumPanel {
          background: rgba(10, 15, 24, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 0.9rem;
        }
        .adminRoot .adminCheckboxLabel {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.8rem;
        }
        .adminRoot .adminCheckboxLabel input {
          width: auto;
          margin: 0;
        }
        .adminRoot .adminUploadBox {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.6rem;
          margin-top: 0.5rem;
          margin-bottom: 0.9rem;
        }
        .adminRoot .adminUploadInput {
          flex: 1;
          min-width: 220px;
        }
        .adminRoot .adminGalleryImageGrid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 0.8rem;
        }
        .adminRoot .adminGalleryImageCard {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.7rem;
          background: rgba(7, 12, 20, 0.85);
        }
        .adminRoot .adminGalleryImagePreview {
          width: 100%;
          height: 148px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 0.6rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .adminRoot .adminGalleryDangerZone {
          margin-top: 1rem;
          padding-top: 0.8rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .adminRoot label { display: block; font-size: 0.85rem; margin-top: 0.75rem; color: #bdc1c6; }
        .adminRoot input, .adminRoot textarea, .adminRoot select {
          width: 100%;
          max-width: 42rem;
          margin-top: 0.25rem;
          padding: 0.55rem 0.65rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(9, 13, 20, 0.85);
          color: #e8eaed;
        }
        .adminRoot textarea { min-height: 5rem; }
        .adminRoot button, .adminRoot .adminBtn {
          margin-top: 0.75rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: none;
          background: linear-gradient(180deg, #1f7a84, #1a6670);
          color: #fff;
          cursor: pointer;
          font-weight: 600;
        }
        .adminRoot .btnGhost { background: #2b3340; }
        .adminRoot table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
        .adminRoot th, .adminRoot td {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.55rem 0.4rem;
          text-align: left;
          vertical-align: top;
        }
        .adminRoot .rowActions { display: flex; flex-wrap: wrap; gap: 0.35rem; }
        .adminRoot .muted { color: #9aa0a6; font-size: 0.85rem; }
        @media (max-width: 1080px) {
          .adminRoot .adminPanel { grid-template-columns: 1fr; }
          .adminRoot .adminSidebar {
            position: static;
            height: auto;
            border-right: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          .adminRoot .adminSideLinks { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .adminRoot .adminStatGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 720px) {
          .adminRoot .adminSideLinks,
          .adminRoot .adminQuickGrid,
          .adminRoot .adminStatGrid { grid-template-columns: 1fr; }
          .adminRoot .adminTopBar { flex-direction: column; align-items: flex-start; }
          .adminRoot .adminGalleryAlbumGrid { grid-template-columns: 1fr; }
          .adminRoot .adminGalleryImageGrid { grid-template-columns: 1fr; }
        }
      `}</style>
      {children}
    </div>
  );
}
