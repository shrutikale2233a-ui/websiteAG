"use client";

import React, { useRef, useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const langObj = LANGUAGES.find((l) => l.id === language);
  const languageLabel = langObj?.label || language;

  const lineCount = Math.max(code.split("\n").length, 10);
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const updateCursor = (target: HTMLTextAreaElement) => {
    const selStart = target.selectionStart;
    const textBefore = target.value.slice(0, selStart);
    const splitLines = textBefore.split("\n");
    const currentLine = splitLines.length;
    const currentCol = splitLines[splitLines.length - 1].length + 1;
    setCursorPos({ line: currentLine, col: currentCol });
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    updateCursor(e.currentTarget);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    updateCursor(e.currentTarget);
  };

  const handleClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    updateCursor(e.currentTarget);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      if (typeof textarea.setRangeText === "function") {
        textarea.setRangeText("    ", start, end, "end");
        onChange(textarea.value);
      } else {
        const nextValue =
          textarea.value.substring(0, start) +
          "    " +
          textarea.value.substring(end);
        onChange(nextValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 4;
        }, 0);
      }
      updateCursor(textarea);
    }
  };

  return (
    <section className="flex flex-col flex-1 h-full min-h-0 bg-[var(--color-panel)] overflow-hidden">
      {/* 40px Header strip */}
      <div className="h-10 min-h-[40px] px-3.5 flex items-center justify-between border-b border-[var(--color-subtle)] bg-[var(--color-canvas)]/60 select-none">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-frame)]/60">
          INPUT // SRC
        </span>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-frame)]">
          Your Code
        </span>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-[var(--color-accent)] hover:underline font-bold uppercase cursor-pointer"
          >
            SAMPLE BUG
          </button>
          <span className="text-[var(--color-subtle)]">|</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[var(--color-frame)]/60 hover:text-[var(--color-frame)] uppercase cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor & Gutter Row */}
      <div className="relative flex-1 flex min-h-0 bg-white">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 py-3 bg-[var(--color-canvas)]/50 border-r border-[var(--color-subtle)] select-none overflow-hidden font-mono text-xs text-right leading-6 pr-2.5 shrink-0"
        >
          {lines.map((num) => {
            const isError = errorLine === num;
            return (
              <div
                key={num}
                className={
                  isError
                    ? "bg-[#D94826]/15 text-[#D94826] font-bold border-l-2 border-[#D94826] -ml-2.5 pl-2"
                    : "text-[var(--color-frame)]/35"
                }
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onSelect={handleSelect}
          onKeyUp={handleKeyUp}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          wrap="off"
          placeholder="// Paste your code here..."
          className="flex-1 p-3 font-mono text-xs leading-6 text-[var(--color-frame)] bg-transparent resize-none outline-none border-none overflow-auto whitespace-pre font-normal"
        />
      </div>

      {/* Bottom Status Strip */}
      <div className="h-7 min-h-[28px] px-3.5 flex items-center justify-between border-t border-[var(--color-subtle)] bg-[var(--color-canvas)]/60 font-mono text-[10px] text-[var(--color-frame)]/60 select-none">
        <div>
          Ln {cursorPos.line}, Col {cursorPos.col} · {languageLabel}
        </div>
        <div className="hidden sm:block">UTF-8 · Tab Size: 4</div>
      </div>
    </section>
  );
}
