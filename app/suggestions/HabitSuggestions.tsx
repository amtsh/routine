"use client";

import Link from "next/link";
import { HabitSuggestionsList } from "@/components/HabitSuggestionsList";
import { BackButton } from "../home/Buttons";

export default function HabitSuggestions() {
  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link href="/">
            <BackButton />
          </Link>
        </div>
      </div>

      <div className="flex justify-between mb-10 items-center">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-200">
          Suggestions
        </h3>
      </div>

      <HabitSuggestionsList />
    </div>
  );
}
