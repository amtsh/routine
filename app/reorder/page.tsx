import { Button } from "@/components/ui/button";
import Reorder from "./Reorder";
import Link from "next/link";
import { XIcon } from "lucide-react";

export default function ReorderPage() {
  return (
    <main>
      <div className="min-h-screen bg-black text-white p-4 font-sans">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <XIcon className="w-6 h-6 text-zinc-400" />
          </Link>

          <Link href="/home">
            <Button className="text-md px-0" variant="link">
              Done
            </Button>
          </Link>
        </div>
        <Reorder />
      </div>
    </main>
  );
}
