import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Habit } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lastNDays(n: number): string[] {
  // run in browser only
  if (typeof window === "undefined") {
    return [];
  }

  return Array.from({ length: n }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);

    return date.toISOString().split("T")[0];
  }).sort();
}

export const DAYS_TO_SHOW = 5;
export const lastNDates = lastNDays(DAYS_TO_SHOW);

export function getDayFromDate(date: string) {
  // 2024-10-27 -> Wed
  return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
}

// [true, false, false, true, false]
export function getLastNStatus(completedOn: number[]) {
  const convertedCompletedOn = completedOn.map(
    (d) => new Date(d * 1000).toISOString().split("T")[0]
  );

  return lastNDates.map((day) => convertedCompletedOn.includes(day));
}
export function getEpochTimeFromDate(date: string) {
  return new Date(date).getTime() / 1000;
}

export function getDateFromEpochTime(epochTime: number): string {
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

export function getSuggestionHabits(): { title: string; habits: Habit[] }[] {
  const physicalHealthHabits: Habit[] = [
    {
      id: "exercise",
      name: "Exercise",
      icon: "🏋️‍♀️",
      color: "bg-blue-400",
      completedOn: [],
      createdAt: 0,
      interval: "morning",
    },
    {
      id: "balanced-diet",
      name: "Eat Balanced Diet",
      icon: "🥗",
      color: "bg-green-400",
      completedOn: [],
      createdAt: 0,
      interval: "day",
    },
    {
      id: "skincare-routine",
      name: "Skincare Routine",
      icon: "🧴",
      color: "bg-pink-400",
      completedOn: [],
      createdAt: 0,
      interval: "day",
    },
    {
      id: "vitamins",
      name: "Take Vitamins",
      icon: "💊",
      color: "bg-yellow-400",
      completedOn: [],
      createdAt: 0,
      interval: "morning",
    },
  ];

  const mentalHealthHabits: Habit[] = [
    {
      id: "meditate",
      name: "Meditate",
      icon: "🧘",
      color: "bg-purple-400",
      completedOn: [],
      createdAt: 0,
      interval: "morning",
    },
    {
      id: "walk-in-nature",
      name: "Walk in Nature",
      icon: "🌳",
      color: "bg-green-400",
      completedOn: [],
      createdAt: 0,
      interval: "evening",
    },
    {
      id: "speak-with-a-friend",
      name: "Talk to a Friend",
      icon: "🗣️",
      color: "bg-blue-400",
      completedOn: [],
      createdAt: 0,
      interval: "evening",
    },
    {
      id: "gratitude-journal",
      name: "Gratitude Journal",
      icon: "🙏",
      color: "bg-amber-400",
      completedOn: [],
      createdAt: 0,
      interval: "night",
    },
  ];

  const knowledgeHabits: Habit[] = [
    {
      id: "read",
      name: "Read",
      icon: "📖",
      color: "bg-orange-400",
      completedOn: [],
      createdAt: 0,
      interval: "evening",
    },
  ];

  return [
    {
      title: "Improve Physical Health",
      habits: physicalHealthHabits,
    },
    {
      title: "Improve Mental Health",
      habits: mentalHealthHabits,
    },
    {
      title: "Improve Knowledge",
      habits: knowledgeHabits,
    },
  ];
}
export const INTERVAL_ORDER = {
  morning: 0,
  afternoon: 1,
  evening: 2,
  night: 3,
  day: 4,
};

export function orderHabits(habits: Habit[]) {
  return habits.sort((a, b) => {
    return (
      INTERVAL_ORDER[a.interval as keyof typeof INTERVAL_ORDER] -
      INTERVAL_ORDER[b.interval as keyof typeof INTERVAL_ORDER]
    );
  });
}

export function getStreaksCount(status: boolean[]) {
  let currentStreak = 0;
  for (let i = status.length - 1; i >= 0; i--) {
    if (status[i]) {
      currentStreak++;
    } else {
      break;
    }
  }
  return currentStreak;
}
