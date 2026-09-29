"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { requestRoast } from "@/lib/api";
import {
  LanguageId,
  ReportState,
  RoastLevel,
  RoastResult,
} from "@/types/roast";
import { CodeEditor } from "./CodeEditor";
import { ErrorMessageInput } from "./ErrorMessageInput";
import { RoastControls } from "./RoastControls";
import { RoastReport } from "./RoastReport";
import { StatusBar } from "./StatusBar";
import { TopBar } from "./TopBar";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string | null>(null);

  const isRoasting = reportState === "loading";

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code.trim()) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError(null);
    setRoastResult(null);

    try {
      const result = await requestRoast({
        code,
        language,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err: any) {
      setApiError(err?.message || "Failed to analyze code.");
      setReportState("error");
    }
  }, [code, language, roastLevel, errorMessage, isRoasting]);

  const handleLoadSample = () => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  };

  const handleApplyFix = (fixedCode: string) => {
    setCode(fixedCode);
  };

  const handleToggleErrorDrawer = () => {
    setErrorDrawerOpen((prev) => !prev);
  };

  // Keyboard shortcut Ctrl+Enter / Cmd+Enter from anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  // errorLine is only defined when results match the exact code roasted
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  return (
    <main className="w-full max-w-[1360px] h-[92vh] min-h-[640px] max-h-[960px] border-2 border-[var(--color-frame)] bg-[var(--color-panel)] shadow-xl flex flex-col overflow-hidden my-auto">
      {/* TopBar with RoastControls */}
      <TopBar>
        <RoastControls
          roastLevel={roastLevel}
          onRoastLevelChange={setRoastLevel}
          language={language}
          onLanguageChange={setLanguage}
          onRoast={handleRoast}
          isRoasting={isRoasting}
          errorDrawerOpen={errorDrawerOpen}
          onToggleErrorDrawer={handleToggleErrorDrawer}
        />
      </TopBar>

      {/* Conditionally rendered ErrorMessageInput drawer */}
      {errorDrawerOpen && (
        <ErrorMessageInput
          value={errorMessage}
          onChange={setErrorMessage}
          onClose={() => setErrorDrawerOpen(false)}
        />
      )}

      {/* Body: Two columns */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Left Column: CodeEditor (~54-55%) */}
        <div className="flex-1 md:flex-[55] flex flex-col min-h-0 overflow-hidden">
          <CodeEditor
            code={code}
            onChange={setCode}
            language={language}
            errorLine={errorLine}
            onLoadSample={handleLoadSample}
          />
        </div>

        {/* Right Column: RoastReport (~46-45%) */}
        <div className="flex-1 md:flex-[45] flex flex-col min-h-0 overflow-hidden">
          <RoastReport
            state={reportState}
            roastLevel={roastLevel}
            language={language}
            result={roastResult}
            errorMsg={apiError}
            onRetry={handleRoast}
            onApplyFix={handleApplyFix}
          />
        </div>
      </div>

      {/* Footer StatusBar */}
      <StatusBar isRoasting={isRoasting} />
    </main>
  );
}
