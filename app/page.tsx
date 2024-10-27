import Home from "./home";
import { SavedHabitsProvider } from "@/lib/context/SavedHabitsContext";

export default function Index() {
  return (
    <SavedHabitsProvider>
      <Home />
    </SavedHabitsProvider>
  );
}
