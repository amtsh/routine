export type Habit = {
  name: string;
  icon: string;
  streak: number;
  color: string;
  completedOn: number[]; // epoch time
  createdAt: number; // epoch time
};

// @typescript-eslint/no-unused-vars
export const suggestedHabits: Habit[] = [
  {
    name: "Vitamin D",
    icon: "💊",
    streak: 1,
    color: "yellow",
    completedOn: [],
    createdAt: Date.now(),
  },
  {
    name: "Honey water",
    icon: "🥃",
    streak: 2,
    color: "cyan",
    completedOn: [],
    createdAt: Date.now(),
  },
  {
    name: "Face Moisturiser",
    icon: "🧴",
    streak: 1,
    color: "green",
    completedOn: [],
    createdAt: Date.now(),
  },
  {
    name: "Wear Glasses",
    icon: "😎",
    streak: 1,
    color: "yellow",
    completedOn: [],
    createdAt: Date.now(),
  },
  {
    name: "Shower",
    icon: "🚿",
    streak: 1,
    color: "yellow",
    completedOn: [],
    createdAt: Date.now(),
  },
];
