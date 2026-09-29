import React from "react";

interface ErrorStateProps {
  error?: string | null;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full min-h-[360px]">
      <div className="w-16 h-16 border-2 border-[var(--color-accent)] flex items-center justify-center font-mono text-3xl font-bold text-[var(--color-accent)] mb-5 select-none">
        !
      </div>
      <h3 className="font-mono text-base font-bold uppercase tracking-wider text-[var(--color-accent)] mb-2">
        Analysis Failed
      </h3>
      <p className="font-mono text-xs text-[var(--color-frame)]/70 max-w-md leading-relaxed mb-6 break-words">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="font-mono text-xs font-bold uppercase tracking-wider border border-[var(--color-frame)] bg-[var(--color-frame)] text-white px-4 py-2 hover:bg-white hover:text-[var(--color-frame)] transition-colors cursor-pointer"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
