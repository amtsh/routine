"use client";

import { EllipsisIcon, PlusIcon } from "lucide-react";
import { cn, DAYS_TO_SHOW, getLastNStatus, lastNWeekDays } from "@/lib/utils";
import Link from "next/link";
import { Habit } from "@/lib/types";
import { useSavedHabits } from "@/lib/context/SavedHabitsContext";

const weekDays = lastNWeekDays(DAYS_TO_SHOW);

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
                index === DAYS_TO_SHOW - 1
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
          <HabitRow
            key={index}
            habit={habit}
            status={getLastNStatus(
              habit.completedOn.sort().slice(-DAYS_TO_SHOW)
            )}
          />
        ))}

        <NewHabitButton />
      </div>
    </div>
  );
}

function HabitRow({ habit, status }: { habit: Habit; status: boolean[] }) {
  const { undoCompletedEntry, addCompletedEntry } = useSavedHabits();

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
      {status.map((isCompleted, index) => (
        <div key={index} className="w-8 flex justify-center">
          {isCompleted ? (
            <button onClick={() => undoCompletedEntry(habit, index)}>
              <CompletedStatus color={habit.color} />
            </button>
          ) : (
            <button onClick={() => addCompletedEntry(habit)}>
              <IncompleteStatus color={habit.color} />
            </button>
          )}
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

function CompletedStatus({ color }: { color: string }) {
  return <div className={cn("w-5 h-5 rounded opacity-80", color)} />;
}

function IncompleteStatus({ color }: { color: string }) {
  return <div className={cn("w-3 h-3 rounded-full opacity-40", color)} />;
}
