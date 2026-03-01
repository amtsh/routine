"use client";

import { CheckIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Habit } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useSavedHabits } from "@/lib/context/SavedHabitsContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { getSuggestionHabits } from "@/lib/utils";

const suggestions = getSuggestionHabits();

export function SuggestHabitRow({ habit }: { habit: Habit }) {
  const { addHabit } = useSavedHabits();
  const [added, setAdded] = useState(false);

  const handleAddHabit = (habit: Habit) => {
    addHabit({
      ...habit,
      id: uuidv4(),
      createdAt: Date.now(),
    });
    setAdded(true);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex">
        <div
          className={`w-12 h-12 rounded-full ${habit.color} bg-opacity-20 flex items-center justify-center mr-3`}
        >
          <span className="text-2xl">{habit.icon}</span>
        </div>

        <div className="flex flex-col self-center">
          <div className="text-sm md:text-lg font-bold text-zinc-300">
            {habit.name}
          </div>

          <div className="text-zinc-400 text-xs">
            Every {habit.interval || "day"}
          </div>
        </div>
      </div>

      <div className="self-start">
        {added ? (
          <Button
            variant="ghost"
            className="hover:bg-transparent px-2 disabled:opacity-100"
            disabled
          >
            <span className="text-lg bg-green-700 flex items-center justify-center w-12 h-12 rounded-full">
              <CheckIcon className="w-4 h-4" />
            </span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="hover:bg-transparent px-2"
            onClick={() => handleAddHabit(habit)}
          >
            <span className="text-lg bg-gray-900 flex items-center justify-center w-12 h-12 rounded-full">
              <PlusIcon className="w-4 h-4" />
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}

export function HabitSuggestionsList() {
  return (
    <>
      {suggestions.map((suggestion, index) => (
        <div className="space-y-8 mb-16" key={index}>
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-zinc-400">
            {suggestion.title}
          </h3>

          <div className="space-y-8">
            {suggestion.habits.map((habit, habitIndex) => (
              <SuggestHabitRow key={habitIndex} habit={habit} />
            ))}
          </div>
        </div>
      ))}

      <div className="space-y-8 mt-16">
        <Link
          href="/new"
          className="flex justify-between items-center py-2 -mx-2 px-2 rounded-lg hover:bg-zinc-900/50 transition-colors"
        >
          <div className="flex">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-zinc-600 flex items-center justify-center mr-3">
              <PlusIcon className="w-5 h-5 text-zinc-500" />
            </div>
            <div className="flex flex-col self-center">
              <div className="text-sm md:text-lg font-bold text-zinc-400">
                Add your own habit
              </div>
              <div className="text-zinc-500 text-xs">
                Create a custom habit
              </div>
            </div>
          </div>
          <PlusIcon className="w-5 h-5 text-zinc-500" />
        </Link>
      </div>
    </>
  );
}
