import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PlusIcon,
  ArrowUpDown,
  ReplyIcon,
  RotateCwIcon,
  ShareIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CompletedStatus({ color }: { color: string }) {
  return <div className={cn("w-5 h-5 rounded", color)} />;
}

export function IncompleteStatus({ color }: { color: string }) {
  return <div className={cn("w-5 h-5 rounded opacity-20", color)} />;
}

export function NewHabitButton() {
  return (
    <div>
      <Link href="/new">
        <Button
          variant="ghost"
          className="text-md md:text-lg font-bold text-zinc-300"
        >
          <PlusIcon />
          New Habit
        </Button>
      </Link>
    </div>
  );
}

export function RefreshButton() {
  const handleRefresh = () => {
    if (typeof window !== "undefined") {
      // refresh the PWA
      window.location.reload();
    }
  };
  return (
    <div>
      <Button
        variant="ghost"
        className="text-md md:text-lg font-bold text-zinc-300"
        onClick={handleRefresh}
      >
        <RotateCwIcon />
        Refresh
      </Button>
    </div>
  );
}

export function NewHabitSuggestionsButton() {
  return (
    <div>
      <Link href="/suggestions">
        <Button
          variant="ghost"
          className="text-md md:text-lg font-bold text-zinc-300"
        >
          ✨ Habit Suggestions
        </Button>
      </Link>
    </div>
  );
}

export function ReorderIconButton() {
  return (
    <div>
      <Link href="/reorder" passHref>
        <Button
          variant={"ghost"}
          className="text-md md:text-lg font-bold text-zinc-300"
        >
          <ArrowUpDown /> Reorder
        </Button>
      </Link>
    </div>
  );
}

export function FeedbackButton() {
  return (
    <div>
      <Link
        href="mailto:amtsh@pm.me?subject=Regarding%20Routine%20app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant={"ghost"}
          className="text-md md:text-lg font-bold text-zinc-300"
        >
          <ReplyIcon />
          Feedback
        </Button>
      </Link>
    </div>
  );
}

export function ShareButton() {
  return (
    <div>
      <Button
        variant={"ghost"}
        className="text-md md:text-lg font-bold text-zinc-300"
      >
        <ShareIcon />
        Share App
      </Button>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="p-4 overflow-hidden rounded-md border-gray-800 flex justify-center items-center">
      {/* Mobile */}
      <div className="md:hidden">
        <Image
          src={"/meditate-portrait.jpg"}
          width={1350}
          height={1}
          alt={"Boy meditating"}
          className="object-cover transition-all hover:scale-105 rounded-md"
          priority
          quality={100}
        />
      </div>
      {/* Desktop */}
      <div className="hidden md:block">
        <Image
          src={"/meditate-landscape.jpg"}
          width={1600}
          height={1}
          alt={"Boy meditating"}
          className="object-scale-down transition-all hover:scale-105 rounded-md"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
