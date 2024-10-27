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
    return date.toISOString().split("T")[0];
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
