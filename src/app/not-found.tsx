import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container not-found">
      <p className="eyebrow">PAGE NOT FOUND</p>
      <h1>404</h1>
      <h2>LOST YOUR REP?</h2>
      <p className="muted-text">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <Link href="/" className="button button-primary">
        BACK TO HOME
      </Link>
    </section>
  );
}