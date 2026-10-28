"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import WorkoutStats from "@/components/WorkoutStats";
import { CheckIcon, CloseIcon } from "@/components/Icons";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

function MyPlanContent() {
  const { plan, saved, hydrated, removeFromPlan, removeFromSaved, markAsDone } =
    usePlan();

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab: Tab = searchParams.get("tab") === "saved" ? "saved" : "plan";

  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const setActiveTab = (tab: Tab) => {
    router.replace(tab === "saved" ? "/my-plan?tab=saved" : "/my-plan", {
      scroll: false,
    });
  };

  const currentList = activeTab === "plan" ? plan : saved;

  const sortedList = useMemo(() => {
    return [...currentList].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      return b.rating - a.rating;
    });
  }, [currentList, sortBy]);

  const totals = useMemo(
    () => ({
      exercises: currentList.length,
      minutes: currentList.reduce((sum, w) => sum + w.duration, 0),
      calories: currentList.reduce((sum, w) => sum + w.caloriesBurned, 0),
    }),
    [currentList]
  );

  return (
    <div className="container plan-page">
      <header className="plan-heading">
        <h1 className="page-title">My Plan</h1>
        <p className="plan-subtitle">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </header>

      <section className="metrics-card" aria-label="Plan summary">
        <div className="metric">
          <p className="metric-label">Exercises</p>
          <strong className="metric-value">{totals.exercises}</strong>
        </div>
        <div className="metric">
          <p className="metric-label">Minutes</p>
          <strong className="metric-value">{totals.minutes}</strong>
        </div>
        <div className="metric">
          <p className="metric-label">Calories</p>
          <strong className="metric-value">{totals.calories}</strong>
        </div>
      </section>

      <section className="plan-toolbar">
        <div className="plan-tabs" role="tablist" aria-label="Workout lists">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "plan"}
            className={activeTab === "plan" ? "plan-tab active" : "plan-tab"}
            onClick={() => setActiveTab("plan")}
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "saved"}
            className={activeTab === "saved" ? "plan-tab active" : "plan-tab"}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </button>
        </div>

        <label className="sort-control">
          <span>Sort By</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </section>

      {!hydrated ? (
        <div className="plan-loading" role="status">
          <span className="plan-spinner" />
          <p>Loading workouts...</p>
        </div>
      ) : sortedList.length === 0 ? (
        <section className="empty-state">
          <h2>Nothing here yet</h2>
          <p>
            {activeTab === "plan"
              ? "Browse the library and add a lift to get today moving."
              : "Browse the library and save a workout to find it here later."}
          </p>
          <Link href="/" className="button button-primary">
            Go to workouts
          </Link>
        </section>
      ) : (
        <section className="plan-list" aria-label="Workouts">
          {sortedList.map((item) => {
            const isDone =
              activeTab === "plan" &&
              plan.some((w) => w.id === item.id && w.isDone);

            return (
              <article className="plan-item" key={item.id}>
                <div className="plan-item-main">
                  <Link
                    href={`/workout/${item.id}`}
                    className="plan-item-image"
                    aria-label={`View ${item.name} details`}
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <span>FITLOG</span>
                    )}
                  </Link>

                  <div className="plan-item-info">
                    <h2>{item.name}</h2>
                    <p className="plan-equipment">
                      {item.equipment || "Equipment not specified"}
                    </p>
                    <div className="plan-item-stats">
                      <WorkoutStats
                        duration={item.duration}
                        calories={item.caloriesBurned}
                        rating={item.rating}
                      />
                    </div>
                  </div>
                </div>

                <div className="plan-item-actions">
                  <Link href={`/workout/${item.id}`} className="button button-outline">
                    View Details
                  </Link>

                  {activeTab === "plan" &&
                    (isDone ? (
                      <span className="button button-done">
                        <CheckIcon />
                        Completed
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="button button-primary"
                        onClick={() => markAsDone(item.id)}
                      >
                        <CheckIcon />
                        Mark as Done
                      </button>
                    ))}

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      activeTab === "plan" ? removeFromPlan(item.id) : removeFromSaved(item.id)
                    }
                    aria-label={`Remove ${item.name}`}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={null}>
      <MyPlanContent />
    </Suspense>
  );
}