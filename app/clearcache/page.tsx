"use client";

import { useSavedHabits } from "@/lib/context/SavedHabitsContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// This page is used to clear local storage and redirect to the home page
export default function ClearCache() {
  const router = useRouter();
  const { clearCache } = useSavedHabits();

  useEffect(() => {
    clearCache();
    router.push("/");
  }, []);

  return <></>;
}
