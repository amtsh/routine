"use client";

import { EllipsisIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Habit } from "@/lib/types";
import { useSavedHabits } from "@/lib/context/SavedHabitsContext";

// @typescript-eslint/no-unused-vars
const suggestedHabits: Habit[] = [
  { name: "Vitamin D", icon: "💊", streak: 1, color: "yellow" },
  { name: "Honey water", icon: "🥃", streak: 2, color: "cyan" },
  { name: "Face Moisturiser", icon: "🧴", streak: 1, color: "green" },
  { name: "Wear Glasses", icon: "😎", streak: 1, color: "yellow" },
  { name: "Shower", icon: "🚿", streak: 1, color: "yellow" },
];

const weekDays = ["We", "Th", "Fr", "Sa", "Su"];

export default function Home() {
  const { savedHabits } = useSavedHabits();

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans">
      <div className="flex justify-between items-center mb-8">
        <EllipsisIcon className="w-6 h-6" />
      </div>

      <div className="flex justify-between mb-8 items-center">
        <h3 className="text-2xl font-semibold tracking-tight">Routine</h3>
        <div className="flex ">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className={cn(
                "w-8 text-center",
                index === weekDays.length - 1
                  ? "bg-zinc-800 rounded"
                  : "text-zinc-600"
              )}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {savedHabits.map((habit, index) => (
          <HabitRow key={index} habit={habit} weekDays={weekDays} />
        ))}

        <NewHabitButton />
      </div>
    </div>
  );
}

function HabitRow({ habit, weekDays }: { habit: Habit; weekDays: string[] }) {
  return (
    <div className="flex items-center">
      <div
        className={`w-10 h-10 rounded-full ${habit.color} bg-opacity-30 flex items-center justify-center mr-3`}
      >
        <span className="text-lg">{habit.icon}</span>
      </div>
      <div className="flex-grow">
        <div>{habit.name}</div>

        <div className="text-orange-500 text-xs">
          🔥&nbsp;&nbsp;{habit.streak} day{habit.streak > 1 ? "s" : ""}
        </div>
      </div>
      {weekDays.map((_, dayIndex) => (
        <div key={dayIndex} className="w-8 flex justify-center">
          <div className={cn("w-3 h-3 rounded-full", "bg-zinc-800")} />
        </div>
      ))}
    </div>
  );
}

function NewHabitButton() {
  return (
    <Link href="/new" className="block">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center mr-3`}
        >
          <span className="text-lg text-zinc-400">
            <PlusIcon className="w-4 h-4" />
          </span>
        </div>
        <div className="flex-grow">
          <div className="text-sm font-medium text-zinc-400">Add New Habit</div>
        </div>
      </div>
    </Link>
  );
}
