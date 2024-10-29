"use client";

import { PlusIcon, XIcon } from "lucide-react";
import { DAYS_TO_SHOW, getLastNStatus } from "@/lib/utils";
import Link from "next/link";
import { Habit } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { NewHabitButton } from "../home/home";

export default function HabitSuggestions() {
  const suggestions: Habit[] = [
    {
      id: "1",
      name: "Drink Water",
      icon: "💧",
      color: "bg-blue-500",
      streak: 0,
      completedOn: [],
      createdAt: Date.now(),
    },
    {
      id: "2",
      name: "Exercise",
      icon: "🏋️",
      color: "bg-green-500",
      streak: 0,
      completedOn: [],
      createdAt: Date.now(),
    },
    {
      id: "3",
      name: "Meditate",
      icon: "🧘",
      color: "bg-purple-500",
      streak: 0,
      completedOn: [],
      createdAt: Date.now(),
    },
    {
      id: "4",
      name: "Read",
      icon: "📖",
      color: "bg-orange-500",
      streak: 0,
      completedOn: [],
      createdAt: Date.now(),
    },
    {
      id: "5",
      name: "Take Vitamin D",
      icon: "🧴",
      color: "bg-yellow-500",
      streak: 0,
      completedOn: [],
      createdAt: Date.now(),
    },
    {
      id: "6",
      name: "Wash Face",
      icon: "🚿",
      color: "bg-blue-400",
      streak: 0,
      completedOn: [],
      createdAt: Date.now(),
    },
  ];

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
  return (
    <div className="flex justify-between items-center">
      <Link href={`/edit/${habit.id}`}>
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
      </Link>

      <div className="self-start">
        <Button variant="ghost" className="hover:bg-transparent">
          <span className="text-lg bg-gray-900 flex items-center justify-center w-10 h-10 rounded-full">
            <PlusIcon className="w-4 h-4" />
          </span>
        </Button>
      </div>
    </div>
  );
}
