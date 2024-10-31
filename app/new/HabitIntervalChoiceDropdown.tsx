import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HabitIntervalChoiceDropdown({
  habitInterval,
  onHabitIntervalChange,
}: {
  habitInterval: string;
  onHabitIntervalChange: (interval: string) => void;
}) {
  const [localIntervalValue, setLocalIntervalValue] = useState<
    string | undefined
  >(habitInterval);

  useEffect(() => {
    setLocalIntervalValue(habitInterval);
  }, []);

  return (
    <div className="space-y-2">
      <Label className="text-base">When</Label>
      <Select
        value={localIntervalValue || "day"}
        onValueChange={(value) => {
          setLocalIntervalValue(value);
          onHabitIntervalChange(value);
        }}
      >
        <SelectTrigger className="w-full py-6 md:w-[180px]">
          <SelectValue placeholder="Select" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>Fruits</SelectLabel>  */}

            <SelectItem
              className="text-base text-muted-foreground"
              value="morning"
            >
              Morning
            </SelectItem>
            <SelectItem
              className="text-base text-muted-foreground"
              value="afternoon"
            >
              Afternoon
            </SelectItem>
            <SelectItem
              className="text-base text-muted-foreground"
              value="evening"
            >
              Evening
            </SelectItem>
            <SelectItem
              className="text-base text-muted-foreground"
              value="night"
            >
              Night
            </SelectItem>
            <SelectItem className="text-base text-muted-foreground" value="day">
              Anytime of Day
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
