"use client";

import {
  DAYS_TO_SHOW,
  getDayFromDate,
  getLastNStatus,
  getStreaksCount,
  lastNDates,
} from "@/lib/utils";
import Link from "next/link";
import { Habit } from "@/lib/types";
import { useSavedHabits } from "@/lib/context/SavedHabitsContext";
import PWAPrompt from "react-ios-pwa-prompt";
import { EmptyState, CompletedStatus, IncompleteStatus } from "./Buttons";
import { HabitSuggestionsList } from "@/components/HabitSuggestionsList";

export default function Home() {
  const { savedHabits } = useSavedHabits();

  return (
    <>
      <div className="grid grid-cols-2 gap-0 mb-10 items-center">
        <h3 className="text-xl md:text-3xl font-semibold tracking-tight text-zinc-200">
          Routine
        </h3>
        {/* Days */}
        <div className="">
          <div className={`grid grid-cols-5 gap-0`}>
            {lastNDates.map((day, index) => (
              <div
                key={index}
                className={`text-sm text-end rounded ${
                  index === lastNDates.length - 1
                    ? "text-zinc-100 font-semibold"
                    : "text-zinc-400"
                }`}
              >
                {getDayFromDate(day)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {savedHabits.length === 0 && (
        <div className="space-y-10">
          <EmptyState />
          <div className="pt-24 md:pt-50">
            <h3 className="text-xl md:text-3xl font-semibold tracking-tight text-zinc-200 mb-8">
              Suggested habits
            </h3>
            <HabitSuggestionsList />
          </div>
        </div>
      )}

      <div className="space-y-8">
        {savedHabits.map((habit) => (
          <HabitRow
            key={habit.id}
            habit={habit}
            status={getLastNStatus(
              habit.completedOn.sort().slice(-DAYS_TO_SHOW),
            )}
          />
        ))}
      </div>

      <PWAPrompt
        copyShareStep={"Press the 'Share' icon"}
        appIconPath="favicon.ico"
      />
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
        <div className={`grid grid-cols-5 gap-0`}>
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
