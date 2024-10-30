"use client";

import { PlusIcon } from "lucide-react";
import {
  cn,
  DAYS_TO_SHOW,
  getDayFromDate,
  getLastNStatus,
  getStreaksCount,
  lastNDates,
} from "@/lib/utils";
import Link from "next/link";
import { Habit } from "@/lib/types";
import { useSavedHabits } from "@/lib/context/SavedHabitsContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { orderHabits } from "@/lib/utils";
import Image from "next/image";

const spacingBetweenDays = "w-8";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { getAllHabits } = useSavedHabits();

  useEffect(() => {
    setHabits(orderHabits(getAllHabits()));
  }, [getAllHabits]);

  return (
    <>
      <div className="grid grid-cols-2 gap-0 mb-10 items-center">
        <h3 className="text-xl md:text-3xl font-semibold tracking-tight text-zinc-200">
          Routine
        </h3>
        {/* Days */}
        <div className="">
          <div className={`grid grid-cols-${DAYS_TO_SHOW} gap-0`}>
            {lastNDates.map((day, index) => (
              <div
                key={index}
                className={`text-sm text-end rounded ${
                  index === lastNDates.length - 1
                    ? "text-zinc-100 font-semibold"
                    : "text-zinc-600"
                }`}
              >
                {getDayFromDate(day)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {habits.length === 0 && <EmptyState />}

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

        <div className="py-8">
          <NewHabitRow />
        </div>
      </div>
    </>
  );
}

function HabitRow({ habit, status }: { habit: Habit; status: boolean[] }) {
  const { undoCompletedEntry, addCompletedEntry } = useSavedHabits();
  // const [showStreaks, setShowStreaks] = useState(true);
  const streakCount = getStreaksCount(status);

  return (
    <div className="grid grid-cols-2 place-items-stretch items-center">
      {/* Left grid item */}
      <div>
        <Link href={`/edit/${habit.id}`}>
          <div className="flex">
            <div
              className={`w-12 h-12 rounded-full ${habit.color} bg-opacity-20 flex items-center justify-center mr-3`}
            >
              <span className="text-2xl">{habit.icon}</span>
            </div>

            <div className="flex flex-col self-center">
              <div className="text-sm md:text-lg font-bold">{habit.name}</div>

              {streakCount > 1 ? (
                <div className="text-orange-500 text-xs ">
                  {streakCount} day streak &nbsp;🔥
                </div>
              ) : (
                <div className="text-zinc-400 text-xs">
                  Every {habit.interval || "day"}
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Right grid item */}
      {/* Statuses */}
      <div>
        <div className={`grid grid-cols-${DAYS_TO_SHOW} gap-0`}>
          {lastNDates.map((date, index) => (
            <div key={index} className={"text-end"}>
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
      </div>
    </div>
  );
}

function NewHabitRow() {
  return (
    <div className="flex justify-between items-center">
      <NewHabitButton />

      <NewHabitSuggestionsButton />
    </div>
  );
}

export function NewHabitButton() {
  return (
    <Link href="/new" className="block">
      <Button variant="ghost" className="hover:bg-transparent px-0">
        <span className="text-lg text-zinc-400 flex items-center justify-center w-10 h-10 rounded-full bg-gray-900">
          <PlusIcon className="w-4 h-4" />
        </span>

        <div className="text-sm font-medium text-zinc-400">New Habit</div>
      </Button>
    </Link>
  );
}

export function NewHabitSuggestionsButton() {
  return (
    <Link href="/suggestions" className="block">
      <Button variant="ghost" className="hover:bg-transparent px-0">
        <span className="text-lg flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-amber-400">
          ✨
        </span>
        <div className="text-sm font-medium text-zinc-400">
          Habit Suggestions
        </div>
      </Button>
    </Link>
  );
}

function CompletedStatus({ color }: { color: string }) {
  return <div className={cn("w-5 h-5 rounded", color)} />;
}

function IncompleteStatus({ color }: { color: string }) {
  return <div className={cn("w-5 h-5 rounded opacity-20", color)} />;
}

function EmptyState() {
  return (
    <div className="p-4 overflow-hidden rounded-md border-gray-800 flex justify-center items-center">
      {/* Mobile */}
      <div className="md:hidden">
        <Image
          src={"/meditate-portrait.jpg"}
          width={1350}
          height={1}
          alt={"Boy meditating"}
          className="object-cover transition-all hover:scale-105 rounded-md"
          priority
          quality={100}
        />
      </div>
      {/* Desktop */}
      <div className="hidden md:block">
        <Image
          src={"/meditate-landscape.jpg"}
          width={1600}
          height={1}
          alt={"Boy meditating"}
          className="object-scale-down transition-all hover:scale-105 rounded-md"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
