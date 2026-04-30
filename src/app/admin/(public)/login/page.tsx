import { AdminLoginForm } from "@/app/admin/(public)/login/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="adminLoginCard">
      <div className="adminLoginCardHeader">
        <div className="adminLoginBadge" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="11" width="14" height="10" rx="2" ry="2" strokeLinecap="round" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="adminLoginTitle">Sign in</h1>
        <p className="adminLoginSubtitle">Portfolio admin — authorized access only</p>
      </div>

      <AdminLoginForm />

      <p className="adminLoginFoot">Authorized personnel only</p>
    </div>
  );
}
