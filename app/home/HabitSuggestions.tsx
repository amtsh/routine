import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Habit } from "@/lib/types";

export default function HabitSuggestions({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Habit Suggestions</DialogTitle>
          <DialogDescription>
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function HabitRowSuggestion({ habit }: { habit: Habit }) {
  return (
    <div className="flex items-center">
      <div className="flex">
        <div
          className={`w-12 h-12 rounded-full ${habit.color} bg-opacity-20 flex items-center justify-center mr-3`}
        >
          <span className="text-2xl">{habit.icon}</span>
        </div>

        <div className="flex flex-col self-center">
          <div className="text-sm md:text-lg font-semibold text-white">
            {habit.name}
          </div>
        </div>
      </div>

      <div className="flex-grow" />
    </div>
  );
}
