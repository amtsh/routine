"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

import { Habit } from "@/lib/types";
import { getDateFromEpochTime, getEpochTimeFromDate } from "../utils";

interface SavedHabitsContextType {
  savedHabits: Habit[];
  getAllHabits: () => Habit[];
  addHabit: (habit: Habit) => void;
  removeHabit: (habit: Habit) => void;
  updateHabit: (habit: Habit) => void;
  addCompletedEntry: (habit: Habit, date: string) => void;
  undoCompletedEntry: (habit: Habit, date: string) => void;
  getHabitById: (habitId: string) => Habit | undefined;
  clearCache: () => void;
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
    let savedHabits: Habit[] = [];

    try {
      savedHabits = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    } catch (error) {
      console.error("Failed to parse saved habits from localStorage:", error);
      writeToLocalStorage([]);
    }

    setSavedHabits(savedHabits);
  }, []);

  const addHabit = (habit: Habit) => {
    setSavedHabits((prev) => {
      const updatedHabits = [...prev, habit];
      writeToLocalStorage(updatedHabits);
      return updatedHabits;
    });
  };

  const removeHabit = (habit: Habit) => {
    setSavedHabits((prev) => {
      const updatedHabits = prev.filter((h) => h.id !== habit.id);
      writeToLocalStorage(updatedHabits);
      return updatedHabits;
    });
  };

  const updateHabit = (habit: Habit) => {
    setSavedHabits((prev) => {
      const updatedHabits = prev.map((h) => (h.id === habit.id ? habit : h));
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

  const getHabitById = (habitId: string) => {
    return savedHabits.find((habit) => habit.id === habitId);
  };

  const clearCache = () => {
    localStorage.removeItem(localStorageKey);
    setSavedHabits([]);
  };

  return (
    <SavedHabitsContext.Provider
      value={{
        savedHabits,
        getAllHabits: () => savedHabits,
        addHabit,
        removeHabit,
        updateHabit,
        addCompletedEntry,
        undoCompletedEntry,
        getHabitById,
        clearCache,
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
