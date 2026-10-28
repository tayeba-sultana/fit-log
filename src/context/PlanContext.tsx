
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";
import type { Workout, PlanWorkout } from "@/types";

interface PlanMetrics {
  exercises: number;
  minutes: number;
  calories: number;
}

interface PlanContextType {
  plan: PlanWorkout[];
  saved: Workout[];
  hydrated: boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  metrics: PlanMetrics;
}

const PLAN_STORAGE_KEY = "fitlog-plan";
const SAVED_STORAGE_KEY = "fitlog-saved";
const MAX_PLAN_WORKOUTS = 5;

const PlanContext = createContext<PlanContextType | null>(null);

function readStoredArray<T>(key: string): T[] {
  const storedValue = localStorage.getItem(key);

  if (!storedValue) {
    return [];
  }

  const parsedValue: unknown = JSON.parse(storedValue);

  if (!Array.isArray(parsedValue)) {
    throw new Error(`Invalid stored data for ${key}`);
  }

  return parsedValue as T[];
}

export function PlanProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const storedPlan = readStoredArray<PlanWorkout>(
          PLAN_STORAGE_KEY
        );
        const storedSaved = readStoredArray<Workout>(
          SAVED_STORAGE_KEY
        );

        setPlan(storedPlan);
        setSaved(storedSaved);
      } catch {
        toast.error("Saved workout data could not be loaded.");
      } finally {
        setHydrated(true);
      }
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);


  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      localStorage.setItem(
        PLAN_STORAGE_KEY,
        JSON.stringify(plan)
      );
    } catch {
      toast.error("Today's plan could not be saved.");
    }
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      localStorage.setItem(
        SAVED_STORAGE_KEY,
        JSON.stringify(saved)
      );
    } catch {
      toast.error("Saved workouts could not be saved.");
    }
  }, [saved, hydrated]);

  const addToPlan = (workout: Workout) => {
    if (!hydrated) {
      toast.error("Please wait while your plan loads.");
      return;
    }

    if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }

    if (plan.length >= MAX_PLAN_WORKOUTS) {
      toast.error("Today's plan is full! Max 5 workouts.");
      return;
    }

    setPlan((currentPlan) => [
      ...currentPlan,
      { ...workout, isDone: false },
    ]);

    toast.success("Added to today's plan!");
  };

  const addToSaved = (workout: Workout) => {
    if (!hydrated) {
      toast.error("Please wait while your data loads.");
      return;
    }

    if (saved.some((item) => item.id === workout.id)) {
      toast.error("Already saved for later!");
      return;
    }

    setSaved((currentSaved) => [
      ...currentSaved,
      workout,
    ]);

    toast.success("Saved for later!");
  };

  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );

    toast.success("Removed from today's plan.");
  };

  const removeFromSaved = (id: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id)
    );

    toast.success("Removed from saved workouts.");
  };

  const markAsDone = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.map((workout) =>
        workout.id === id
          ? { ...workout, isDone: true }
          : workout
      )
    );

    toast.success("Workout marked as done!");
  };

  const metrics = useMemo<PlanMetrics>(
    () => ({
      exercises: plan.length,
      minutes: plan.reduce(
        (total, workout) => total + workout.duration,
        0
      ),
      calories: plan.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
      ),
    }),
    [plan]
  );

  const contextValue: PlanContextType = {
    plan,
    saved,
    hydrated,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    metrics,
  };

  return (
    <PlanContext.Provider value={contextValue}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan(): PlanContextType {
  const context = useContext(PlanContext);

  if (context === null) {
    throw new Error(
      "usePlan must be used within a PlanProvider."
    );
  }

  return context;
}
