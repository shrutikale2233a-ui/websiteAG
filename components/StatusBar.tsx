import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t border-[var(--color-frame)] bg-[var(--color-panel)] px-4 py-2 sm:px-5 font-mono select-none">
      {/* Main Status Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--color-frame)]/70">
        {/* Left Side */}
        <div className="flex items-center gap-2">
          <span>STATUS:</span>
          {isRoasting ? (
            <span className="flex items-center gap-1.5 text-[#D97706] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse" />
              PROCESSING...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[#16A34A] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden sm:inline text-[var(--color-subtle)]">|</span>
          <span className="hidden sm:inline uppercase">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        {/* Right Side */}
        <div className="uppercase tracking-widest text-[10px] font-bold text-[var(--color-frame)]">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Sub-status attribution row (Always visible on all screens and states) */}
      <div className="mt-1 text-center text-[10px] text-[var(--color-frame)]/40 tracking-wider">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
