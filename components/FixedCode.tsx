"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import { SectionHeader } from "./SectionHeader";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (fixedCode: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const langObj = LANGUAGES.find((l) => l.id === language);
  const extension = langObj?.extension || "txt";
  const filename = `solution.${extension}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="mb-4">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-mono text-[11px] font-bold text-[#16A34A] tracking-wider uppercase bg-[#16A34A]/10 px-2 py-0.5 border border-[#16A34A]/30">
          CORRECTED CODE
        </span>
      </SectionHeader>

      {/* Code Card */}
      <div className="border border-[var(--color-subtle)] bg-[var(--color-panel)] mb-3">
        {/* Header strip */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--color-subtle)] bg-[var(--color-canvas)]/70">
          <span className="font-mono text-xs font-bold text-[var(--color-frame)]">
            {filename}
          </span>
          <span className="font-mono text-[10px] font-bold text-[#16A34A] tracking-wider uppercase">
            READY TO APPLY
          </span>
        </div>

        {/* Code Block */}
        <pre className="p-3 font-mono text-xs text-[var(--color-frame)] overflow-x-auto max-h-[300px] leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="font-mono text-xs font-bold uppercase tracking-wider border border-[var(--color-frame)] bg-[var(--color-panel)] text-[var(--color-frame)] px-3 py-2 hover:bg-[var(--color-frame)] hover:text-white transition-colors cursor-pointer"
        >
          {copyLabel}
        </button>
        <button
          type="button"
          onClick={() => onApply(code)}
          className="font-mono text-xs font-bold uppercase tracking-wider border border-[var(--color-frame)] bg-[var(--color-frame)] text-white px-3 py-2 hover:bg-white hover:text-[var(--color-frame)] transition-colors cursor-pointer"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
