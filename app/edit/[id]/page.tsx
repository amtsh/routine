"use client";

import EditHabit from "./EditHabit";
import { useParams } from "next/navigation";

export default function EditHabitPage() {
  const { id } = useParams();

  return (
    <main>
      <EditHabit habitId={id as string} />
    </main>
  );
}
