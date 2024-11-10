import React from "react";
import {
  ArrowUpDownIcon,
  EllipsisIcon,
  PlusIcon,
  RotateCw,
} from "lucide-react";
import Link from "next/link";

const PillMenu = ({ onMenuPress }: { onMenuPress: () => void }) => {
  const handleRefresh = () => {
    if (typeof window !== "undefined") {
      // refresh the PWA
      window.location.reload();
    }
  };

  return (
    <div className="fixed bottom-[3%] left-1/2 transform -translate-x-1/2 rounded-full shadow bg-black border py-3">
      <div className="flex">
        <Link href="/new" title="Add Habit">
          <PlusIcon className="w-12 p-1" />
        </Link>
        <button onClick={handleRefresh} title="Refresh App">
          <RotateCw className="w-12 p-1" />
        </button>
        <Link href="/reorder" title="Reorder Habits">
          <ArrowUpDownIcon className="w-12 p-1" />
        </Link>
        <button onClick={onMenuPress} title="Open Menu">
          <EllipsisIcon className="w-12 p-1" />
        </button>
      </div>
    </div>
  );
};

export default PillMenu;
