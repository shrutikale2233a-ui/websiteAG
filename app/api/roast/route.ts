import { NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel } from "@/types/roast";

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body provided in request." },
      { status: 400 }
    );
  }

  const code = typeof body?.code === "string" ? body.code : "";
  const errorMessage =
    typeof body?.errorMessage === "string" ? body.errorMessage.trim() : "";

  // 1. Validate empty code
  if (!code.trim()) {
    return NextResponse.json(
      { error: "No code provided." },
      { status: 400 }
    );
  }

  // 2. Validate code length
  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // 3. Validate errorMessage length
  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Language fallback
  const validLanguageIds = LANGUAGES.map((lang) => lang.id);
  const language: LanguageId = validLanguageIds.includes(body?.language)
    ? body.language
    : DEFAULTS.language;

  // RoastLevel fallback
  const validRoastLevels = ROAST_LEVELS.map((level) => level.id);
  const roastLevel: RoastLevel = validRoastLevels.includes(body?.roastLevel)
    ? body.roastLevel
    : DEFAULTS.roastLevel;

  try {
    const result = await analyzeCode({
      language,
      code,
      roastLevel,
      errorMessage: errorMessage || undefined,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("[api/roast] Error analyzing code:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process code critique." },
      { status: 500 }
    );
  }
}
