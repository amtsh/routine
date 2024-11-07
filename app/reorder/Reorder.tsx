"use client";

import { Habit } from "@/lib/types";
import { useSavedHabits } from "@/lib/context/SavedHabitsContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reorder } from "framer-motion";

import { HabitRowToDrag } from "./HabitRowToDrag";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { XIcon } from "lucide-react";

export default function ReorderComponent() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { getAllHabits, saveAllHabits } = useSavedHabits();
  const router = useRouter();

  useEffect(() => {
    setHabits(getAllHabits());
  }, [getAllHabits]);

  const handleSubmit = () => {
    saveAllHabits(habits);

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans">
      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <XIcon className="w-6 h-6 text-zinc-400" />
        </Link>

        <Button className="text-md px-0" variant="link" onClick={handleSubmit}>
          Done
        </Button>
      </div>

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
        <Button
          variant={"outline"}
          className="w-full py-6"
          onClick={handleSubmit}
        >
          Done
        </Button>
      </div>
    </div>
  );
}
