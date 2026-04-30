type AdminPageProps = {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
};

export function AdminPage({ title, description, children }: AdminPageProps) {
  return (
    <div>
      <header className="adminPageHeader">
        <h2 className="adminPageTitle">{title}</h2>
        {description ? <p className="muted">{description}</p> : null}
      </header>
      {children}
    </div>
  );
}

type AdminSectionProps = {
  title?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function AdminSection({ title, description, children, className = "" }: AdminSectionProps) {
  return (
    <section className={`adminCard ${className}`.trim()}>
      {title ? <h3 className="adminSectionTitle">{title}</h3> : null}
      {description ? <p className="muted">{description}</p> : null}
      {children}
    </section>
  );
}
