type FooterProps = {
  name: string;
};

export function Footer({ name }: FooterProps) {
  return (
    <footer className="footer">
      <p>{new Date().getFullYear()} {name}. All rights reserved.</p>
    </footer>
  );
}
