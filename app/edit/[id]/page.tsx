"use client";

import { XIcon, EllipsisIcon, CheckIcon } from "lucide-react";
import EditHabit from "./EditHabit";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EditHabitPage() {
  const { id } = useParams();

  return (
    <main>
      <div className="min-h-screen bg-black text-white p-4 font-sans">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <XIcon className="w-6 h-6 text-zinc-400" />
          </Link>

          <Button variant={"ghost"}>
            <CheckIcon className="w-6 h-6" />
            Save
          </Button>
        </div>
        <div className="flex justify-between mb-10 items-center">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-200">
            Update Habit
          </h3>
        </div>
        <EditHabit habitId={id as string} />
      </div>
    </main>
  );
}
