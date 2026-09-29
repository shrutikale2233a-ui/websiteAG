import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (language: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center gap-2">
        <span className="text-[var(--color-frame)]/60 text-[11px] uppercase tracking-wider font-semibold hidden md:inline">
          Roast Level:
        </span>
        <div className="flex items-center border border-[var(--color-subtle)] bg-white p-0.5">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <label
                key={level.id}
                title={level.description}
                className={`flex items-center gap-1.5 px-2.5 py-1 cursor-pointer select-none transition-colors ${
                  isSelected
                    ? "bg-[var(--color-frame)] text-white font-bold"
                    : "text-[var(--color-frame)] hover:bg-[var(--color-canvas)]"
                }`}
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={level.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(level.id)}
                  className="sr-only"
                />
                <span
                  className={`w-2 h-2 rounded-full border ${
                    isSelected
                      ? "border-white bg-white"
                      : "border-[var(--color-frame)]/40 bg-transparent"
                  }`}
                />
                <span className="text-[11px] uppercase">{level.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Language Dropdown */}
      <div className="flex items-center gap-1.5">
        <span className="text-[var(--color-frame)]/60 text-[11px] uppercase tracking-wider font-semibold hidden lg:inline">
          Language:
        </span>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none border border-[var(--color-subtle)] bg-white px-2.5 py-1.5 pr-6 font-mono text-xs text-[var(--color-frame)] outline-none focus:border-[var(--color-frame)] cursor-pointer"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[var(--color-frame)]/60">
            ▾
          </span>
        </div>
      </div>

      {/* 3. Error Drawer Toggle Button */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className={`border border-dashed font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 cursor-pointer transition-colors ${
          errorDrawerOpen
            ? "border-[var(--color-frame)] bg-[var(--color-frame)] text-white"
            : "border-[var(--color-frame)]/60 bg-transparent text-[var(--color-frame)] hover:bg-[var(--color-canvas)]"
        }`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* 4. Primary Action Button */}
      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className={`font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 flex items-center gap-2 border border-[var(--color-frame)] transition-colors select-none ${
          isRoasting
            ? "bg-[var(--color-frame)]/80 text-white cursor-not-allowed animate-pulse"
            : "bg-[var(--color-frame)] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] text-white cursor-pointer"
        }`}
      >
        {isRoasting ? (
          <span>ANALYZING...</span>
        ) : (
          <>
            <span>ROAST MY CODE</span>
            <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 border border-white/30 tracking-normal font-normal">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
}
