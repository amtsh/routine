import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  FeedbackButton,
  NewHabitButton,
  NewHabitSuggestionsButton,
  RefreshButton,
  ReorderIconButton,
  ShareButton,
} from "./Buttons";
import { Separator } from "@/components/ui/separator";

export function MenuDrawer({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      {/* <DrawerTrigger>
        <div>
          <EllipsisIcon />
        </div>
      </DrawerTrigger> */}
      <DrawerContent className="rounded-t-[20px] border border-zinc-600/650">
        <div className="mx-auto w-full max-w-sm my-8 font-sans">
          <DrawerHeader className="m-0 p-0">
            <DrawerTitle />
            <DrawerDescription />
          </DrawerHeader>

          <div className="space-y-2">
            <NewHabitButton />
            <NewHabitSuggestionsButton />
            <Separator />
            <RefreshButton />
            <ReorderIconButton />
            <Separator />
            <FeedbackButton />
            <ShareButton />
          </div>

          {/* <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="ghost">Close</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
