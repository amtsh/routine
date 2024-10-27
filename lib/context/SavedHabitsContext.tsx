"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

import { Habit } from "@/lib/types";

interface SavedHabitsContextType {
  savedHabits: Habit[];
  saveHabit: (habit: Habit) => void;
  removeHabit: (name: Habit) => void;
}

const SavedHabitsContext = createContext<SavedHabitsContextType | undefined>(
  undefined
);

export const SavedHabitsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const localStorageKey = "routinehabits.vercel.app:savedHabits";
  const [savedHabits, setSavedHabits] = useState<Habit[]>([]);

  useEffect(() => {
    console.log("getting from local storage");
    const savedHabits = JSON.parse(
      localStorage.getItem(localStorageKey) || "[]"
    );
    console.log(savedHabits);
    setSavedHabits(savedHabits);
  }, []);

  const saveHabit = (habit: Habit) => {
    setSavedHabits((prev) => {
      const updatedHabits = [...prev, habit];
      localStorage.setItem(localStorageKey, JSON.stringify(updatedHabits));
      return updatedHabits;
    });
  };

  const removeHabit = (habit: Habit) => {
    setSavedHabits((prev) => {
      const updatedHabits = prev.filter((h) => h.name !== habit.name);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedHabits));
      return updatedHabits;
    });
  };

  return (
    <SavedHabitsContext.Provider
      value={{ savedHabits, saveHabit, removeHabit }}
    >
      {children}
    </SavedHabitsContext.Provider>
  );
};

export const useSavedHabits = () => {
  const context = useContext(SavedHabitsContext);
  if (!context) {
    throw new Error("useSavedHabits must be used within a SavedHabitsProvider");
  }
  return context;
};
