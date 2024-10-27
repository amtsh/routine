"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

import { Habit } from "@/lib/types";

interface SavedHabitsContextType {
  savedHabits: Habit[];
  saveHabit: (habit: Habit) => void;
  removeHabit: (name: Habit) => void;
  addCompletedEntry: (habit: Habit) => void;
  undoCompletedEntry: (habit: Habit, date: number) => void;
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

  // when savedHabits changes, save to local storage
  useEffect(() => {
    console.log("saving to local storage");
    if (savedHabits.length === 0) return;

    localStorage.setItem(localStorageKey, JSON.stringify(savedHabits));
  }, [savedHabits]);

  const saveHabit = (habit: Habit) => {
    setSavedHabits((prev) => {
      const updatedHabits = [...prev, habit];
      return updatedHabits;
    });
  };

  const removeHabit = (habit: Habit) => {
    setSavedHabits((prev) => {
      const updatedHabits = prev.filter((h) => h.name !== habit.name);
      return updatedHabits;
    });
  };

  const addCompletedEntry = (habit: Habit) => {
    setSavedHabits((prev) => {
      const updatedHabits = prev.map((h) =>
        h.name === habit.name
          ? { ...h, completedOn: [...h.completedOn, Date.now()] }
          : h
      );
      return updatedHabits;
    });
  };

  const undoCompletedEntry = (habit: Habit, date: number) => {
    setSavedHabits((prev) => {
      const updatedHabits = prev.map((h) =>
        h.name === habit.name
          ? { ...h, completedOn: h.completedOn.filter((d) => d !== date) }
          : h
      );
      return updatedHabits;
    });
  };

  return (
    <SavedHabitsContext.Provider
      value={{
        savedHabits,
        saveHabit,
        removeHabit,
        addCompletedEntry,
        undoCompletedEntry,
      }}
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
