import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";

export function HabitIntervalChoice({
  habitInterval,
  onHabitIntervalChange,
}: {
  habitInterval?: string;
  onHabitIntervalChange: (interval: string) => void;
}) {
  const [localIntervalValue, setLocalIntervalValue] = useState<
    string | undefined
  >();

  useEffect(() => {
    setLocalIntervalValue(habitInterval);
  }, [habitInterval]);

  return (
    <div className="space-y-4">
      <Label className="">Every</Label>
      <RadioGroup
        value={localIntervalValue}
        defaultValue="day"
        onValueChange={(value) => {
          setLocalIntervalValue(value);
          onHabitIntervalChange(value);
        }}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="day" id="day" />
          <Label htmlFor="day">Day</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="morning" id="morning" />
          <Label htmlFor="morning">Morning</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="afternoon" id="afternoon" />
          <Label htmlFor="afternoon">Afternoon</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="evening" id="evening" />
          <Label htmlFor="evening">Evening</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="night" id="night" />
          <Label htmlFor="night">Night</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
