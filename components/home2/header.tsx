"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FBFAF7]/80 backdrop-blur border-b border-black/10">
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between py-4">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-teal-deep text-white flex items-center justify-center font-serif italic">
            C
          </div>
          <span className="font-serif text-lg">Cadical</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm text-gray-600">
          <a href="#doors">Pharmacy</a>
          <a href="#doors">Institutional</a>
          <a href="#doors">Services</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="hidden md:block px-4 py-2 border rounded-full text-sm">
            Sign in
          </button>

          <button className="px-5 py-2 bg-teal-deep text-white rounded-full text-sm">
            Order supplies
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 border rounded-full flex items-center justify-center"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-5 pb-4 space-y-3 text-sm">
          <a href="#">Pharmacy</a>
          <a href="#">Institutional</a>
          <a href="#">Services</a>
        </div>
      )}
    </header>
  );
}