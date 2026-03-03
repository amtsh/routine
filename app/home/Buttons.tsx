import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PlusIcon,
  ArrowUpDown,
  ReplyIcon,
  RotateCwIcon,
  ShareIcon,
  ChevronLeft,
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
        <Button variant="ghost" className="text-base font-sans rounded-full">
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
        className="text-base font-sans rounded-full"
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
        <Button variant="ghost" className="text-base font-sans rounded-full">
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
        <Button variant={"ghost"} className="text-base font-sans rounded-full">
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
        href="https://x.com/amiitshiinde"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant={"ghost"} className="text-base font-sans rounded-full">
          <ReplyIcon />
          Post feedback on X
        </Button>
      </Link>
    </div>
  );
}

export function ShareButton({
  onAfterShare,
}: {
  onAfterShare?: () => void;
} = {}) {
  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const shareData = {
      title: "Routine",
      text: "Check out Routine — habit tracking app",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        onAfterShare?.();
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          fallbackCopy(shareData.url);
        }
      }
    } else {
      fallbackCopy(shareData.url);
      onAfterShare?.();
    }
  };

  return (
    <div>
      <Button
        variant={"ghost"}
        className="text-base font-sans rounded-full"
        onClick={handleShare}
      >
        <ShareIcon />
        Share App
      </Button>
    </div>
  );
}

function fallbackCopy(url: string) {
  navigator.clipboard?.writeText(url);
}

export function BackButton() {
  return (
    <Button variant="outline" size="icon" className="rounded-full">
      <ChevronLeft />
    </Button>
  );
}

export function EmptyState() {
  return (
    <>
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
    </>
  );
}
