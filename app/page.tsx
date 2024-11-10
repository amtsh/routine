"use client";

import Link from "next/link";
import Home from "./home/home";
import { PlusIcon } from "lucide-react";

import { MenuDrawer } from "./home/MenuDrawer";
import PillMenu from "@/components/PillMenu";
import { useState } from "react";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <div className="min-h-screen bg-black text-white px-4 py-6 font-sans">
        <div className="flex justify-between items-center mb-6 align-middle">
          <Link href="/new">
            <PlusIcon className="text-zinc-400" />
          </Link>
        </div>
        <Home />
      </div>

      <PillMenu onMenuPress={() => setMenuOpen(true)} />

      <MenuDrawer
        isOpen={menuOpen}
        onOpenChange={() => setMenuOpen(!menuOpen)}
      />

      <div className="my-24" />
    </main>
  );
}
