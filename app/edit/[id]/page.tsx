"use client";

import EditHabit from "./EditHabit";
import { useParams } from "next/navigation";

export default function EditHabitPage() {
  const { id } = useParams();

  return <EditHabit habitId={id as string} />;
}
