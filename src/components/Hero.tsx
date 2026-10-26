
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            WORKOUT LIBRARY
          </div>

          <h1 className="hero-title">
            TRAIN WITH
            <br />
            INTENT. LOG
            <br />
            <span className="accent-text">EVERY SET.</span>
          </h1>

          <p className="hero-description">
            Your training. Your progress. Your rules.
            Build your workout plan, track every lift,
            and stay consistent with FitLog.
          </p>

          <div className="hero-actions">
            <a href="#library" className="button button-primary">
              BROWSE WORKOUTS 
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
