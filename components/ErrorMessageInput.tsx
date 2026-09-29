import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="border-b border-[var(--color-frame)] bg-[var(--color-canvas)] p-3 md:px-5">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="error-message-input"
          className="font-mono text-[10px] uppercase font-bold tracking-wider text-[var(--color-frame)]/70 select-none"
        >
          Attach Terminal Traceback / Compiler Error (Optional)
        </label>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-xs text-[var(--color-frame)]/60 hover:text-[var(--color-frame)] font-bold cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        id="error-message-input"
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="TypeError: unsupported operand type(s) for +=: 'int' and 'list'&#10;  File &quot;main.py&quot;, line 5, in calculate_average"
        className="w-full p-2.5 font-mono text-xs bg-white border border-[var(--color-subtle)] text-[var(--color-frame)] outline-none focus:border-[var(--color-frame)] resize-y"
      />
    </div>
  );
}
