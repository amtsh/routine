"use client";

import { Habit } from "@/lib/types";
import { useSavedHabits } from "@/lib/context/SavedHabitsContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reorder } from "framer-motion";
import { HabitRowToDrag } from "@/app/home/HabitRowToDrag";
import Link from "next/link";

export default function ReorderComponent() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { getAllHabits } = useSavedHabits();

  useEffect(() => {
    setHabits(getAllHabits());
  }, [getAllHabits]);

  return (
    <>
      <div className="mb-10">
        <h3 className="text-xl md:text-3xl font-semibold tracking-tight text-zinc-200">
          Routine
        </h3>
      </div>

      <Reorder.Group
        axis="y"
        as="ul"
        values={habits}
        onReorder={setHabits} // Update habits on reorder
        className="space-y-8"
      >
        {habits.map((habit) => (
          <HabitRowToDrag key={habit.id} habit={habit} />
        ))}
      </Reorder.Group>

      <div className="my-16">
        <Link href="/home">
          <Button variant={"outline"} className="w-full py-6">
            Done
          </Button>
        </Link>
      </div>
    </>
  );
}
