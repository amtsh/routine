export type Habit = {
  id: string;
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
    id: "vitamin-d",
    name: "Vitamin D",
    icon: "💊",
    streak: 1,
    color: "yellow",
    completedOn: [],
    createdAt: Date.now(),
  },
  {
    id: "honey-water",
    name: "Honey water",
    icon: "🥃",
    streak: 2,
    color: "cyan",
    completedOn: [],
    createdAt: Date.now(),
  },
  {
    id: "face-moisturiser",
    name: "Face Moisturiser",
    icon: "🧴",
    streak: 1,
    color: "green",
    completedOn: [],
    createdAt: Date.now(),
  },
  {
    id: "wear-glasses",
    name: "Wear Glasses",
    icon: "😎",
    streak: 1,
    color: "yellow",
    completedOn: [],
    createdAt: Date.now(),
  },
  {
    id: "shower",
    name: "Shower",
    icon: "🚿",
    streak: 1,
    color: "yellow",
    completedOn: [],
    createdAt: Date.now(),
  },
];
