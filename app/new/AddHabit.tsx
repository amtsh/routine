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
import { useSavedHabits } from "@/lib/context/SavedHabitsContext";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
const colors = [
  "bg-red-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-yellow-400",
  "bg-lime-400",
  "bg-green-400",
  "bg-teal-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-violet-400",
  "bg-purple-400",
  "bg-pink-400",
];

export default function AddHabit() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [habitName, setHabitName] = useState("");
  const [emoji, setEmoji] = useState("🧘");
  const router = useRouter();

  const { saveHabit } = useSavedHabits();

  const handleSave = () => {
    saveHabit({
      id: uuidv4(),
      name: habitName,
      icon: emoji,
      color: selectedColor,
      streak: 0,
      completedOn: [],
      createdAt: Date.now(),
    });

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans">
      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="ghost">Cancel</Button>
        </Link>
        <Button variant={"outline"} onClick={handleSave}>
          Save
        </Button>
      </div>

      <div className="bg-zinc-900 rounded-lg p-6">
        <div className="flex justify-center mb-8">
          <Popover>
            <PopoverTrigger>
              <div
                className={`w-24 h-24 ${selectedColor} bg-opacity-30 rounded-full flex items-center justify-center`}
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
