import React from "react";
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityConfig: Record<
  Severity,
  { badgeClass: string; stripeClass: string }
> = {
  "FATAL BUG": {
    badgeClass: "bg-[#D94826]/10 text-[#D94826] border-[#D94826]",
    stripeClass: "border-l-[#D94826]",
  },
  "CODE SMELL": {
    badgeClass: "bg-[#D97706]/10 text-[#D97706] border-[#D97706]",
    stripeClass: "border-l-[#D97706]",
  },
  "OPTIMIZATION": {
    badgeClass: "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]",
    stripeClass: "border-l-[#16A34A]",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index).padStart(2, "0");
  const config = severityConfig[issue.severity] || severityConfig["CODE SMELL"];

  return (
    <div className="border border-[var(--color-subtle)] bg-[var(--color-panel)] shadow-xs p-3.5 mb-3">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-subtle)]/70 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          {/* Black Index Chip */}
          <span className="bg-[var(--color-frame)] text-white font-mono text-[11px] font-bold px-1.5 py-0.5 leading-none select-none">
            {paddedIndex}
          </span>
          {/* Line Indicator */}
          <span className="font-mono text-xs font-bold text-[var(--color-frame)]">
            LINE {issue.line}
          </span>
          {/* Severity Badge */}
          <span
            className={`font-mono text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 border ${config.badgeClass}`}
          >
            {issue.severity}
          </span>
        </div>
        {/* Issue Title (wraps, never clips) */}
        <span className="font-mono text-xs text-[var(--color-frame)]/70 text-right flex-1 min-w-[120px] break-words">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet with Left Stripe */}
      {issue.codeSnippet && (
        <pre className={`bg-[var(--color-canvas)] border border-[var(--color-subtle)] border-l-4 ${config.stripeClass} p-2.5 mb-2.5 overflow-x-auto font-mono text-xs text-[var(--color-frame)]`}>
          <code>{issue.codeSnippet}</code>
        </pre>
      )}

      {/* Diagnosis & Expected Lines */}
      <div className="space-y-1 font-mono text-xs leading-relaxed">
        <div className="text-[var(--color-accent)] break-words">
          <span className="font-bold mr-1.5">✕</span>
          <span className="font-semibold">Diagnosis:</span> {issue.diagnosis}
        </div>
        <div className="text-[#16A34A] break-words">
          <span className="font-bold mr-1.5">✓</span>
          <span className="font-semibold">Expected:</span> {issue.expected}
        </div>
      </div>
    </div>
  );
}
