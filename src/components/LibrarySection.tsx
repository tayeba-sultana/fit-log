"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { Workout } from "@/types";
import { getAllWorkouts } from "@/utils/api";
import WorkoutCard from "@/components/WorkoutCard";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadWorkouts() {
      try {
        const data = await getAllWorkouts();

        if (active) {
          setWorkouts(data);
        }
      } catch (err) {
        console.error(err);

        if (active) {
          setError(true);
          toast.error("Unable to load workouts. Please try again.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadWorkouts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="library" className="library-section">
      <div className="section-header">
        <h2 className="section-title">The Library</h2>
        <p className="section-description">
          {workouts.length > 0
            ? `${workouts.length} lifts covering every major muscle group.`
            : "Lifts covering every major muscle group."}
        </p>
      </div>

      <div>

        {loading ? (
          <div className="workout-grid" aria-label="Loading workouts">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="skeleton-card" key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="empty-state">
            <h3>WORKOUTS COULDN’T LOAD</h3>
            <p>Check your connection and refresh the page.</p>
            <button
              className="button button-primary"
              onClick={() => window.location.reload()}
            >
              TRY AGAIN
            </button>
          </div>
        ) : workouts.length === 0 ? (
          <div className="empty-state">
            <h3>NO WORKOUTS FOUND</h3>
            <p>There are no workouts available from the API right now.</p>
          </div>
        ) : (
          <div className="workout-grid">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}