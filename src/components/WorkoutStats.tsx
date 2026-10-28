import { ClockIcon, FlameIcon, StarIcon } from "@/components/Icons";

export default function WorkoutStats({
  duration,
  calories,
  rating,
}: {
  duration: number;
  calories: number;
  rating: number;
}) {
  return (
    <>
      <span className="stat"><ClockIcon />{duration} min</span>
      <span className="stat"><FlameIcon />{calories} kcal</span>
      <span className="stat"><StarIcon />{rating}</span>
    </>
  );
}
