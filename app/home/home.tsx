"use client";

import { PlusIcon, SparklesIcon } from "lucide-react";
import {
  cn,
  DAYS_TO_SHOW,
  getDayFromDate,
  getLastNStatus,
  lastNDates,
} from "@/lib/utils";
import Link from "next/link";
import { Habit } from "@/lib/types";
import { useSavedHabits } from "@/lib/context/SavedHabitsContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import HabitSuggestions from "./HabitSuggestions";

const spacingBetweenDays = "w-8";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { getAllHabits } = useSavedHabits();

  useEffect(() => {
    setHabits(getAllHabits());
  }, [getAllHabits]);

  return (
    <>
      <div className="flex justify-between mb-10 items-center">
        <h3 className="text-xl md:text-3xl font-semibold tracking-tight text-zinc-200">
          Routine
        </h3>
        <div className="flex ">
          {lastNDates.map((day, index) => (
            <div
              key={index}
              className={`${spacingBetweenDays} text-sm text-center rounded ${
                index === lastNDates.length - 1
                  ? "text-zinc-100 bg-zinc-700"
                  : "text-zinc-600"
              }`}
            >
              {getDayFromDate(day)}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {habits.map((habit, index) => (
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
    </>
  );
}

function HabitRow({ habit, status }: { habit: Habit; status: boolean[] }) {
  const { undoCompletedEntry, addCompletedEntry } = useSavedHabits();
  const [showStreaks, setShowStreaks] = useState(false);

  return (
    <div className="flex items-center">
      <Link href={`/edit/${habit.id}`}>
        <div className="flex">
          <div
            className={`w-12 h-12 rounded-full ${habit.color} bg-opacity-20 flex items-center justify-center mr-3`}
          >
            <span className="text-2xl">{habit.icon}</span>
          </div>

          <div className="flex flex-col self-center">
            <div className="text-sm md:text-lg font-bold">{habit.name}</div>

            {showStreaks ? (
              <div className="text-orange-500 text-xs ">
                {habit.streak} {habit.streak > 1 ? "s" : ""} streak&nbsp;🔥
              </div>
            ) : (
              <div className="text-zinc-400 text-xs">Every day</div>
            )}
          </div>
        </div>
      </Link>
      <div className="flex-grow" />

      {lastNDates.map((date, index) => (
        <div
          key={index}
          className={`${spacingBetweenDays} flex justify-center`}
        >
          {status[index] ? (
            <button onClick={() => undoCompletedEntry(habit, date)}>
              <CompletedStatus color={habit.color} />
            </button>
          ) : (
            <button onClick={() => addCompletedEntry(habit, date)}>
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
    <div className="flex justify-between items-center">
      <Link href="/new" className="block">
        <Button variant="ghost" className="hover:bg-transparent px-0">
          <span className="text-lg text-zinc-400 flex items-center justify-center w-10 h-10 rounded-full bg-gray-900">
            <PlusIcon className="w-4 h-4" />
          </span>

          <div className="text-sm font-medium text-zinc-400">Add New Habit</div>
        </Button>
      </Link>

      <div>
        <HabitSuggestions>
          <Button variant="ghost" className="hover:bg-transparent px-0">
            <span className="text-lg flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-amber-400">
              <SparklesIcon className="w-4 h-4" />
            </span>
            <div className="text-sm font-medium text-zinc-400">
              Habit Suggestions
            </div>
          </Button>
        </HabitSuggestions>
      </div>
    </div>
  );
}

function CompletedStatus({ color }: { color: string }) {
  return <div className={cn("w-5 h-5 rounded", color)} />;
}

function IncompleteStatus({ color }: { color: string }) {
  return <div className={cn("w-5 h-5 rounded opacity-20", color)} />;
}
