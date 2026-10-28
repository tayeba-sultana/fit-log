"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/utils/api";
import { BookmarkIcon, PlusIcon } from "@/components/Icons";
import type { Workout } from "@/types";

export default function WorkoutDetails({ id }: { id: string }) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const { plan, addToPlan, addToSaved } = usePlan();

  useEffect(() => {
    let active = true;

    getWorkoutById(id)
      .then((result) => {
        if (active) setWorkout(result);
      })
      .catch(() => {
        if (active) setFailed(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="route-loading">
        <span className="loader-ring" />
        Loading workout...
      </div>
    );
  }

  if (failed || !workout) {
    return (
      <section className="container details-section">
        <div className="empty-state">
          <h2>Workout not found</h2>
          <p>This workout could not be loaded.</p>
          <Link href="/" className="button button-primary">
            Back to library
          </Link>
        </div>
      </section>
    );
  }

  const already = plan.some((item) => item.id === workout.id);
  const planFull = plan.length >= 5;

  const specs: [string, string][] = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", String(workout.sets)],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating.toFixed(1)],
  ];

  return (
    <section className="container details-section">
      <Link href="/" className="back-link">
        ← Back to library
      </Link>

      <div className="details-layout">
        <div className="details-visual">
          {workout.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={workout.image} alt={workout.name} className="details-image" />
          )}
        </div>

        <div className="details-copy">
          <h1 className="details-title">{workout.name}</h1>
          <p className="details-description">{workout.description}</p>

          <div className="tag-row details-tags">
            {workout.muscleGroups.map((tag) => (
              <span className="tag-pill" key={tag}>{tag}</span>
            ))}
          </div>

          <div className="specs-panel">
            {specs.map(([label, value]) => (
              <div className="spec-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="instructions">
            <h2 className="subsection-title">Instructions</h2>
            <ol className="instruction-list">
              {workout.instructions.map((step, index) => (
                <li key={`${index}-${step}`}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="details-actions">
            <button
              className="button button-primary"
              disabled={already || planFull}
              onClick={() => addToPlan(workout)}
            >
              <PlusIcon />
              {already ? "Already in plan" : planFull ? "Plan full (5/5)" : "Add to today's plan"}
            </button>

            <button className="button button-outline" onClick={() => addToSaved(workout)}>
              <BookmarkIcon />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
