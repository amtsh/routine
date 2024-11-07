import { Habit } from "@/lib/types";
import { Reorder, useDragControls } from "framer-motion";
import { Tally2 } from "lucide-react";

export function HabitRowToDrag({ habit }: { habit: Habit }) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      id={habit.id}
      value={habit} // Set the value to the habit
      dragListener={false} // prevent drag on the whole row
      dragControls={dragControls}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
      }}
    >
      <div className="flex justify-between items-center">
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

            <div className="text-zinc-400 text-xs">
              Every {habit.interval || "day"}
            </div>
          </div>
        </div>

        <div
          className="cursor-grab self-center pr-3"
          onPointerDown={(e) => dragControls.start(e)}
          style={{ touchAction: "none" }}
        >
          <Tally2 className="rotate-90 text-zinc-400" />
        </div>
      </div>
    </Reorder.Item>
  );
}
