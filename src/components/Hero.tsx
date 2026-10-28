
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Workout Library</p>

          <h1 className="hero-title">
            TRAIN WITH
            <br />
            INTENT. LOG
            <br />
            <span className="accent-text">EVERY SET.</span>
          </h1>

          <p className="hero-description">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="hero-actions">
            <a href="#library" className="button button-primary">
              Browse workouts
            </a>
          </div>

        </div>

        <div className="hero-visual">
          <Image
            src="/assets/banner.png"
            alt="Muscular athlete demonstrating a gym exercise"
            width={334}
            height={334}
            priority
            className="hero-athlete"
          />
        </div>
      </div>
    </section>
  );
}
