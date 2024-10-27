"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

import { Habit } from "@/lib/types";
import { getDateFromEpochTime, getEpochTimeFromDate } from "../utils";

interface SavedHabitsContextType {
  savedHabits: Habit[];
  saveHabit: (habit: Habit) => void;
  removeHabit: (name: Habit) => void;
  addCompletedEntry: (habit: Habit, date: string) => void;
  undoCompletedEntry: (habit: Habit, date: string) => void;
}

const SavedHabitsContext = createContext<SavedHabitsContextType | undefined>(
  undefined
);

export const SavedHabitsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const localStorageKey = "routinehabits.vercel.app:savedHabits";
  const [savedHabits, setSavedHabits] = useState<Habit[]>([]);

  const writeToLocalStorage = (habits: Habit[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(habits));
  };

  useEffect(() => {
    console.log("getting from local storage");
    const savedHabits = JSON.parse(
      localStorage.getItem(localStorageKey) || "[]"
    );

    setSavedHabits(savedHabits);
  }, []);

  const saveHabit = (habit: Habit) => {
    setSavedHabits((prev) => {
      const updatedHabits = [...prev, habit];
      writeToLocalStorage(updatedHabits);
      return updatedHabits;
    });
  };

  const removeHabit = (habit: Habit) => {
    setSavedHabits((prev) => {
      const updatedHabits = prev.filter((h) => h.name !== habit.name);
      writeToLocalStorage(updatedHabits);
      return updatedHabits;
    });
  };

  const addCompletedEntry = (habit: Habit, date: string) => {
    const epochTime = getEpochTimeFromDate(date);

    setSavedHabits((prev) => {
      const updatedHabits = prev.map((h) =>
        h.id === habit.id
          ? { ...h, completedOn: [...h.completedOn, epochTime] }
          : h
      );
      writeToLocalStorage(updatedHabits);
      return updatedHabits;
    });
  };

  const undoCompletedEntry = (habit: Habit, date: string) => {
    setSavedHabits((prev) => {
      const updatedHabits = prev.map((h) =>
        h.id === habit.id
          ? {
              ...h,
              completedOn: h.completedOn.filter(
                (d) => getDateFromEpochTime(d) !== date
              ),
            }
          : h
      );
      writeToLocalStorage(updatedHabits);
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
