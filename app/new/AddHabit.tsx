"use client";

import { useState } from "react";
import SelectEmoji from "@/components/SelectEmoji";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-teal-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-pink-500",
];

export default function AddHabit() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [habitName, setHabitName] = useState("");
  const [emoji, setEmoji] = useState("🧘");

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans">
      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="link">Cancel</Button>
        </Link>
        <button className="text-lg text-gray-400">Save</button>
      </div>

      <div className="bg-zinc-900 rounded-lg p-6">
        <div className="flex justify-center mb-8">
          <Popover>
            <PopoverTrigger>
              <div
                className={`w-24 h-24 ${selectedColor} rounded-full flex items-center justify-center`}
              >
                <span className="text-4xl">{emoji}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <SelectEmoji setEmoji={setEmoji} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-6 gap-4 mb-12 md:grid-cols-12">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-10 h-10 ${color} rounded-full focus:outline-none focus:ring-2 focus:ring-white`}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <div className="mb-4">
          <label
            htmlFor="habit-name"
            className="block text-xs text-gray-400 mb-4"
          >
            Habit name
          </label>

          <Input
            type="text"
            id="habit-name"
            placeholder="Meditate"
            value={habitName}
            className="py-6"
            onChange={(e) => setHabitName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
