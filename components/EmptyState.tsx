import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full min-h-[360px]">
      <div className="w-16 h-16 border-2 border-dashed border-[var(--color-subtle)] flex items-center justify-center font-mono text-2xl text-[var(--color-frame)]/40 mb-5 select-none">
        {"{}"}
      </div>
      <h3 className="font-mono text-base font-bold uppercase tracking-wider text-[var(--color-frame)] mb-2">
        Awaiting Code Submission
      </h3>
      <p className="font-mono text-xs text-[var(--color-frame)]/60 max-w-sm leading-relaxed">
        Paste your code on the left, then click &quot;ROAST MY CODE&quot; or press Ctrl+Enter (⌘+Enter on Mac).
      </p>
    </div>
  );
}
