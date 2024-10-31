import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";

export function HabitIntervalChoiceRadio({
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
      <Label className="text-base">Every</Label>
      <RadioGroup
        value={localIntervalValue}
        defaultValue="day"
        onValueChange={(value) => {
          setLocalIntervalValue(value);
          onHabitIntervalChange(value);
        }}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="morning" id="morning" />
          <Label
            className="text-base text-muted-foreground text pl-1"
            htmlFor="morning"
          >
            Morning
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="afternoon" id="afternoon" />
          <Label
            className="text-base text-muted-foreground text pl-1"
            htmlFor="afternoon"
          >
            Afternoon
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="evening" id="evening" />
          <Label
            className="text-base text-muted-foreground text pl-1"
            htmlFor="evening"
          >
            Evening
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="night" id="night" />
          <Label
            className="text-base text-muted-foreground pl-1"
            htmlFor="night"
          >
            Night
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="day" id="day" />
          <Label
            className="text-base text-muted-foreground text pl-1"
            htmlFor="day"
          >
            Anytime of day
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
