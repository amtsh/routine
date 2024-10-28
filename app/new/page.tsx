import Link from "next/link";
import AddHabit from "./AddHabit";
import { EllipsisIcon, XIcon } from "lucide-react";

export default function AddHabitPage() {
  return (
    <main>
      <div className="min-h-screen bg-black text-white p-4 font-sans">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <XIcon className="w-6 h-6 text-zinc-400" />
          </Link>
          <EllipsisIcon className="w-6 h-6 text-zinc-400" />
        </div>

        <div className="flex justify-between mb-10 items-center">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-200">
            Add Habit
          </h3>
        </div>

        <AddHabit />
      </div>
    </main>
  );
}
