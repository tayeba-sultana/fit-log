// "use client";

// import { use } from "react";
// import WorkoutDetails from "@/components/WorkoutDetails";

// export default function WorkoutPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = use(params);
//   return <WorkoutDetails id={id} />;
// }

import { Suspense } from "react";
import WorkoutDetails from "@/components/WorkoutDetails";

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<p className="p-10 text-center">Loading…</p>}>
      <WorkoutDetails id={id} />
    </Suspense>
  );
}
