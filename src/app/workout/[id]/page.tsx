"use client";

import { use } from "react";
import WorkoutDetails from "@/components/WorkoutDetails";

export default function WorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <WorkoutDetails id={id} />;
}
