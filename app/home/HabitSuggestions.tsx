import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Habit } from "@/lib/types";
import { PlusIcon } from "lucide-react";

export default function HabitSuggestions({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="left-[50%] top-[30%] bg-zinc-900 shadow-md">
        <DialogHeader>
          <DialogTitle>
            <div className="text-2xl font-semibold text-zinc-200">
              Suggested Habits
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="text-sm text-zinc-400">
              Add to your routine to improve your life.
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col mt-4 space-y-8">
          <HabitRowSuggestion
            habit={{
              id: "1",
              name: "Drink Water",
              icon: "💧",
              color: "bg-blue-500",
              streak: 0,
              completedOn: [],
              createdAt: Date.now(),
            }}
          />
          <HabitRowSuggestion
            habit={{
              id: "2",
              name: "Read a Book",
              icon: "📚",
              color: "bg-green-500",
              streak: 0,
              completedOn: [],
              createdAt: Date.now(),
            }}
          />
          <HabitRowSuggestion
            habit={{
              id: "1",
              name: "Drink Water",
              icon: "💧",
              color: "bg-blue-500",
              streak: 0,
              completedOn: [],
              createdAt: Date.now(),
            }}
          />
          <HabitRowSuggestion
            habit={{
              id: "2",
              name: "Read a Book",
              icon: "�",
              color: "bg-green-500",
              streak: 0,
              completedOn: [],
              createdAt: Date.now(),
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function HabitRowSuggestion({ habit }: { habit: Habit }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full ${habit.color} bg-opacity-20 flex items-center justify-center mr-3`}
        >
          <span className="text-lg">{habit.icon}</span>
        </div>

        <div className="flex flex-col">
          <div className="text-sm md:text-base font-semibold text-zinc-200">
            {habit.name}
          </div>
        </div>
      </div>

      <Button variant="ghost" className="hover:bg-transparent px-0">
        <span className="text-lg text-zinc-400 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800">
          <PlusIcon className="w-4 h-4" />
        </span>
      </Button>
    </div>
  );
}
