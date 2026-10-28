import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link href="/" className="brand footer-brand">
          <Image
            src="/assets/logo.png"
            alt=""
            width={20}
            height={20}
            className="brand-logo"
          />
          <span>FITLOG</span>
        </Link>

        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
