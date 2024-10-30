export type Habit = {
  id: string;
  name: string;
  icon: string;
  color: string;
  completedOn: number[]; // epoch time
  createdAt: number; // epoch time
  interval?: string;
};

// @typescript-eslint/no-unused-vars
export const suggestedHabits: Habit[] = [
  {
    id: "vitamin-d",
    name: "Vitamin D",
    icon: "💊",
    color: "yellow",
    completedOn: [],
    createdAt: Date.now(),
  },
  {
    id: "honey-water",
    name: "Honey water",
    icon: "🥃",
    color: "cyan",
    completedOn: [],
    createdAt: Date.now(),
  },
  {
    id: "face-moisturiser",
    name: "Face Moisturiser",
    icon: "🧴",
    color: "green",
    completedOn: [],
    createdAt: Date.now(),
  },
  {
    id: "wear-glasses",
    name: "Wear Glasses",
    icon: "😎",
    color: "yellow",
    completedOn: [],
    createdAt: Date.now(),
  },
  {
    id: "shower",
    name: "Shower",
    icon: "🚿",
    color: "yellow",
    completedOn: [],
    createdAt: Date.now(),
  },
];
