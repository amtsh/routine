"use client";

import { useEffect, useState } from "react";
import SelectEmoji from "@/components/SelectEmoji";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSavedHabits } from "@/lib/context/SavedHabitsContext";
import { useRouter } from "next/navigation";
import { TrashIcon } from "lucide-react";
import { Habit } from "@/lib/types";

const colors = [
  "bg-zinc-400",
  "bg-stone-400",
  "bg-amber-400",
  "bg-yellow-400",
  "bg-lime-400",
  "bg-green-400",
  "bg-teal-400",
  "bg-cyan-400",
  "bg-sky-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-violet-400",
  "bg-purple-400",
  "bg-fuchsia-400",
  "bg-pink-400",
  "bg-rose-400",
  "bg-red-400",
  "bg-orange-400",
];

export default function EditHabit({ habitId }: { habitId: string }) {
  const router = useRouter();
  const [habit, setHabit] = useState<Habit | null>(null);
  const { getHabitById, updateHabit, removeHabit } = useSavedHabits();

  // Initialize state variables only after habit is fetched
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [habitName, setHabitName] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");

  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    const fetchedHabit = getHabitById(habitId);

    if (!fetchedHabit) {
      router.push("/"); // Redirect if habit not found
      return;
    }

    setHabit(fetchedHabit);
    setSelectedColor(fetchedHabit.color);
    setHabitName(fetchedHabit.name);
    setEmoji(fetchedHabit.icon);
  }, [habitId]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!habit) {
      return;
    }

    updateHabit({
      ...habit,
      name: habitName,
      icon: emoji,
      color: selectedColor,
    });

    router.push("/");
  };

  const handleDelete = () => {
    removeHabit(habit!);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-zinc-900 rounded-lg p-6">
        <div className="flex justify-center mb-8">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger>
              <div
                className={`w-24 h-24 ${selectedColor} bg-opacity-30 rounded-full flex items-center justify-center`}
              >
                <span className="text-4xl">{emoji}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <SelectEmoji
                onChangeEmoji={(emoji) => {
                  setEmoji(emoji);
                  setPopoverOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-6 gap-4 md:grid-cols-12 place-items-center mb-2">
          {colors.map((color) => (
            <button
              type="button"
              key={color}
              className={`w-10 h-10 ${color} rounded-full focus:outline-none focus:ring-4 focus:ring-white`}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      <div className="my-8">
        <label htmlFor="habit-name" className="block text-xs mb-2">
          Habit name
        </label>

        <Input
          type="text"
          id="habit-name"
          placeholder="Meditate"
          value={habitName}
          className="py-6 text-base"
          onChange={(e) => setHabitName(e.target.value)}
          required
        />
      </div>

      <div className="my-8">
        <Button variant={"outline"} type="submit" className="w-full py-6">
          Update Habit
        </Button>
        <Button
          variant={"ghost"}
          type="button"
          className="w-full py-6 text-red-400 hover:text-red-400"
          onClick={handleDelete}
        >
          <TrashIcon className="w-4 h-4" />
          Delete Habit
        </Button>
      </div>
    </form>
  );
}
