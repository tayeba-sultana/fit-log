
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const pathname = usePathname();
  

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="FitLog home">
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={28}
            height={28}
            className="brand-logo"
            priority
          />
          <span>FITLOG</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "active" : ""}`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`nav-link ${
              pathname === "/my-plan" ? "active" : ""
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="nav-actions">
          <Link href="/my-plan" className="counter-pill plan-pill">
            Plan
            
          </Link>

          <Link href="/my-plan" className="counter-pill saved-pill">
            Saved
            
          </Link>
        </div>
      </div>
    </header>
  );
}
