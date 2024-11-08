"use client";

import Link from "next/link";
import Home from "./home/home";
import { PlusIcon } from "lucide-react";

import { MenuDrawer } from "./home/MenuDrawer";

export default function Index() {
  return (
    <main>
      <div className="min-h-screen bg-black text-white p-4 font-sans">
        <div className="flex justify-between items-center mb-6">
          <Link href="/new">
            <PlusIcon className="w-6 h-6 text-zinc-400" />
          </Link>

          <MenuDrawer />
        </div>
        <Home />
      </div>
    </main>
  );
}
