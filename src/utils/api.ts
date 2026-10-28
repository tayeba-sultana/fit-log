import type { Workout } from "@/types";

const API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function fetchFromApi<T>(path = ""): Promise<T> {
  let lastError: Error = new Error("Unable to load workouts.");

  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError =
        error instanceof Error
          ? error
          : new Error("An unexpected API error occurred.");
    }
  }

  throw lastError;
}

function normalizeWorkoutList(data: unknown): Workout[] {
  if (Array.isArray(data)) {
    return data as Workout[];
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "data" in data &&
    Array.isArray(data.data)
  ) {
    return data.data as Workout[];
  }

  throw new Error("The API returned an unexpected workout list.");
}

function normalizeSingleWorkout(data: unknown): Workout {
  if (
    typeof data === "object" &&
    data !== null &&
    "data" in data
  ) {
    return data.data as Workout;
  }

  return data as Workout;
}

export async function getAllWorkouts(): Promise<Workout[]> {
  const data = await fetchFromApi<unknown>();
  return normalizeWorkoutList(data);
}

export async function getWorkoutById(
  id: number | string,
): Promise<Workout> {
  const data = await fetchFromApi<unknown>(`/${encodeURIComponent(String(id))}`);
  return normalizeSingleWorkout(data);
}