"use client";

import { CheckIcon, PlusIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { Habit } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { NewHabitButton } from "../home/home";
import { useSavedHabits } from "@/lib/context/SavedHabitsContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { getSuggestionHabits } from "@/lib/utils";

const suggestions = getSuggestionHabits();

export default function HabitSuggestions() {
  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link href="/">
            <XIcon className="w-6 h-6 text-zinc-400" />
          </Link>
        </div>
      </div>

      <div className="flex justify-between mb-10 items-center">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-200">
          Suggestions
        </h3>
      </div>

      <div className="space-y-8">
        {suggestions.map((habit, index) => (
          <SuggestHabitRow key={index} habit={habit} />
        ))}

        <NewHabitButton />
      </div>
    </div>
  );
}

function SuggestHabitRow({ habit }: { habit: Habit }) {
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

          <div className="text-zinc-400 text-xs">Every day</div>
        </div>
      </div>

      <div className="self-start">
        {added ? (
          <Button variant="ghost" className="hover:bg-transparent" disabled>
            <span className="text-lg bg-green-600 flex items-center justify-center w-10 h-10 rounded-full">
              <CheckIcon className="w-4 h-4 text-green-100" />
            </span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="hover:bg-transparent"
            onClick={() => handleAddHabit(habit)}
          >
            <span className="text-lg bg-gray-900 flex items-center justify-center w-10 h-10 rounded-full">
              <PlusIcon className="w-4 h-4" />
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}
