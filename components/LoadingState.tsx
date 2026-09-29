import React, { useEffect, useState } from "react";

const SPINNER_CHARS = ["/", "—", "\\", "|"];

export function LoadingState() {
  const [spinnerIndex, setSpinnerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpinnerIndex((prev) => (prev + 1) % SPINNER_CHARS.length);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full min-h-[360px]">
      <div className="w-16 h-16 border-2 border-[var(--color-frame)] flex items-center justify-center font-mono text-2xl font-bold text-[var(--color-frame)] mb-5 select-none animate-pulse">
        {SPINNER_CHARS[spinnerIndex]}
      </div>
      <h3 className="font-mono text-base font-bold uppercase tracking-wider text-[var(--color-frame)] mb-2 animate-pulse">
        Analyzing Code
      </h3>
      <p className="font-mono text-xs text-[var(--color-frame)]/60 max-w-sm leading-relaxed">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}
