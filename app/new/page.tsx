import AddHabit from "./AddHabit";
import { SavedHabitsProvider } from "@/lib/context/SavedHabitsContext";

export default function AddHabitPage() {
  return (
    <main>
      <SavedHabitsProvider>
        <AddHabit />
      </SavedHabitsProvider>
    </main>
  );
}
