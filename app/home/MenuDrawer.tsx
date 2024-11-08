import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  FeedbackButton,
  NewHabitButton,
  NewHabitSuggestionsButton,
  RefreshButton,
  ReorderIconButton,
  ShareButton,
} from "./Buttons";
import { EllipsisIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function MenuDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <div>
          <EllipsisIcon />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm my-8">
          <DrawerHeader className="m-0 p-0">
            <DrawerTitle />
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
