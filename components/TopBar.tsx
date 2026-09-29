import React from "react";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children?: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b border-[var(--color-frame)] bg-[var(--color-panel)] px-4 py-3 sm:px-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* Left: App Title + Version Tag */}
      <div className="flex items-center gap-2.5">
        <h1 className="font-display font-bold text-lg sm:text-xl uppercase tracking-wider text-[var(--color-frame)]">
          {APP.name}
        </h1>
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 border border-[var(--color-frame)] text-[var(--color-frame)]">
          {APP.version}
        </span>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center">{children}</div>
    </header>
  );
}
