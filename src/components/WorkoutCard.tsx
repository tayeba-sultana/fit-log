import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/types";
import WorkoutStats from "@/components/WorkoutStats";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="workout-card">
      <div className="workout-card-image-wrap">
        {workout.image && (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px"
            className="workout-card-image"
          />
        )}
      </div>

      <div className="workout-card-body">
        <div className="workout-card-head">
          <div className="tag-row">
            {workout.muscleGroups.map((muscle) => (
              <span className="tag-pill" key={muscle}>{muscle}</span>
            ))}
          </div>
          <h3 className="workout-card-title">{workout.name}</h3>
          <p className="equipment-line">{workout.equipment}</p>
        </div>

        <div className="workout-card-stats">
          <WorkoutStats
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>
    </Link>
  );
}
