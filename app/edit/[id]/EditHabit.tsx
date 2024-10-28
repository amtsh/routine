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
import Link from "next/link";
import { useSavedHabits } from "@/lib/context/SavedHabitsContext";
import { useRouter } from "next/navigation";
import { EllipsisIcon, TrashIcon, XIcon } from "lucide-react";
import { getBgColors } from "@/lib/utils";
import { Habit } from "@/lib/types";

const colors = getBgColors();

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
    <div className="min-h-screen bg-black text-white p-4 font-sans">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <XIcon className="w-6 h-6 text-zinc-400" />
          </Link>
          <EllipsisIcon className="w-6 h-6 text-zinc-400" />
        </div>

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

          <div className="grid grid-cols-6 gap-4 mb-12 md:grid-cols-12">
            {colors.map((color) => (
              <button
                type="button"
                key={color}
                className={`w-10 h-10 ${color} rounded-full focus:outline-none focus:ring-2 focus:ring-white`}
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
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete Habit
          </Button>
        </div>
      </form>
    </div>
  );
}
