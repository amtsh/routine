import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DAYS_TO_SHOW = 5;

// [2024-10-27, 2024-10-26, 2024-10-25, 2024-10-24, 2024-10-23]
export function lastNDays(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString("en-US").split("/").join("-");
  }).sort();
}

export function getDayFromDate(date: string) {
  // 2024-10-27 -> Wed
  return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
}

// [true, false, false, true, false]
export function getLastNStatus(completedOn: number[]) {
  const convertedCompletedOn = completedOn.map(
    (d) => new Date(d * 1000).toISOString().split("T")[0]
  );

  return lastNDays(DAYS_TO_SHOW).map((day) =>
    convertedCompletedOn.includes(day)
  );
}
export function getEpochTimeFromDate(date: string) {
  return new Date(date).getTime() / 1000;
}

export function getDateFromEpochTime(epochTime: number) {
  return new Date(epochTime * 1000).toISOString().split("T")[0];
}

export function getBgColors() {
  return [
    "bg-zinc-400",
    "bg-stone-400",
    "bg-amber-400",
    "bg-yellow-400",
    "bg-lime-400",
    "bg-green-400",
    "bg-teal-400",
    "bg-cyan-400",
    "bg-sky-400",
    "bg-blue-400",
    "bg-indigo-400",
    "bg-violet-400",
    "bg-purple-400",
    "bg-fuchsia-400",
    "bg-pink-400",
    "bg-rose-400",
    "bg-red-400",
    "bg-orange-400",
  ];
}
