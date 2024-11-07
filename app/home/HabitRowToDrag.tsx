import { Habit } from "@/lib/types";
import { Reorder, useDragControls } from "framer-motion";
import { Grip } from "lucide-react";

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
      <div className="items-center">
        {/* Left grid item */}
        <div>
          <div className="flex">
            <div
              className="cursor-grab flex items-center justify-center mr-3"
              onPointerDown={(e) => dragControls.start(e)}
              style={{ touchAction: "none" }}
            >
              <Grip className="w-8 h-8 text-zinc-400" />
            </div>

            <div
              className={`w-12 h-12 rounded-full ${habit.color} bg-opacity-20 flex items-center justify-center mr-3`}
            >
              <span className="text-2xl">{habit.icon}</span>
            </div>
            <div className="flex flex-col self-center">
              <div className="text-sm md:text-lg font-bold">{habit.name}</div>
            </div>
          </div>
        </div>
      </div>
    </Reorder.Item>
  );
}
