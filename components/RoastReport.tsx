import React from "react";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { FixedCode } from "./FixedCode";
import { IssueCard } from "./IssueCard";
import { LoadingState } from "./LoadingState";
import { SectionHeader } from "./SectionHeader";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string | null;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const hasFixedCode = Boolean(result?.correctedCode && result.correctedCode.trim());
  const hasTakeaway = Boolean(result?.takeaway && result.takeaway.trim());
  const takeawaySectionNumber = hasFixedCode ? 4 : 3;

  return (
    <section className="flex flex-col flex-1 h-full min-h-0 bg-[var(--color-panel)] border-t md:border-t-0 md:border-l border-[var(--color-frame)] overflow-hidden">
      {/* 40px Header strip */}
      <div className="h-10 min-h-[40px] px-3.5 flex items-center justify-between border-b border-[var(--color-subtle)] bg-[var(--color-canvas)]/60 select-none">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-frame)]/60">
          AUDIT // REPORT
        </span>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-frame)]">
          Roast Report
        </span>
        <div className="w-12" aria-hidden="true" />
      </div>

      {/* Report Content States */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {state === "empty" && <EmptyState />}

        {state === "loading" && <LoadingState />}

        {state === "error" && (
          <ErrorState error={errorMsg} onRetry={onRetry} />
        )}

        {state === "results" && result && (
          <div className="p-4 md:p-5 space-y-5">
            {/* Section 1: Roast */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-[var(--color-frame)]/60">
                  STYLE: {roastLevel.toUpperCase()}
                </span>
              </SectionHeader>
              <div className="border border-[var(--color-subtle)] bg-[#D94826]/5 border-l-4 border-l-[var(--color-accent)] p-3.5 font-mono text-sm leading-relaxed text-[var(--color-frame)]">
                &ldquo;{result.roast}&rdquo;
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-[var(--color-frame)]/60">
                  {result.issues.length} {result.issues.length === 1 ? "ISSUE" : "ISSUES"}
                </span>
              </SectionHeader>

              {result.issues.length === 0 ? (
                <div className="border border-[#16A34A]/30 bg-[#16A34A]/10 p-3 font-mono text-xs text-[#16A34A] font-semibold">
                  No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={`${issue.line}-${idx}`} index={idx + 1} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix */}
            {hasFixedCode && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Section Takeaway */}
            {hasTakeaway && (
              <div>
                <SectionHeader number={takeawaySectionNumber} title="Takeaway" />
                <div className="border border-[var(--color-subtle)] bg-[var(--color-panel)] p-3.5 font-mono text-xs leading-relaxed text-[var(--color-frame)]">
                  {result.takeaway}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
