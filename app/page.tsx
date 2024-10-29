"use client";

import Link from "next/link";
import Home from "./home/home";
import { PlusIcon, EllipsisIcon, RotateCcwIcon } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function Index() {
  const handleRefresh = () => {
    if (typeof window !== "undefined") {
      // refresh the PWA
      window.location.reload();
    }
  };

  return (
    <main>
      <div className="min-h-screen bg-black text-white p-4 font-sans">
        <div className="flex justify-between items-center mb-6">
          <Link href="/new">
            <PlusIcon className="w-6 h-6 text-zinc-400" />
          </Link>

          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <EllipsisIcon className="w-6 h-6 text-zinc-400" />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={handleRefresh}>
                  Refresh
                  <MenubarShortcut>
                    <RotateCcwIcon className="w-4 h-4" />
                  </MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <Home />
      </div>
    </main>
  );
}
