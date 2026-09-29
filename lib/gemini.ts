import { GoogleGenAI, ApiError } from "@google/genai";
import { AI } from "@/config/app.config";
import { buildUserPrompt, ROAST_SYSTEM_INSTRUCTION } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status: number | string | undefined, error: any): string {
  const numStatus = Number(status);
  switch (numStatus) {
    case 400:
      return "Invalid request sent to Gemini API. Please review the code or inputs.";
    case 403:
      return "Invalid or unauthorized Gemini API key. Verify your GEMINI_API_KEY in .env.local.";
    case 404:
      return `Model not found (${AI.model}). Check AI.model configuration in config/app.config.ts.`;
    case 429:
      return "Gemini API rate limit exceeded. Please wait a few seconds and try again.";
    case 503:
      return "Gemini service is currently overloaded (503). Retries were exhausted. Please try again shortly.";
    default:
      return error?.message || `Gemini API communication failed (Status ${status || "unknown"}).`;
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || !responseText.trim()) {
        throw new Error("Gemini returned an empty response.");
      }

      let parsed: any;
      try {
        parsed = JSON.parse(responseText);
      } catch (parseErr: any) {
        throw new Error(
          `Failed to parse response as JSON: ${parseErr?.message || "Invalid JSON syntax"}`
        );
      }

      return {
        roast: typeof parsed.roast === "string" ? parsed.roast : "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode:
          typeof parsed.correctedCode === "string" ? parsed.correctedCode : "",
        takeaway: typeof parsed.takeaway === "string" ? parsed.takeaway : "",
      };
    } catch (error: any) {
      const isApiError = error instanceof ApiError || error?.status;
      const status = error?.status;

      if (isApiError && status === 503 && attempt < AI.maxAttempts) {
        await sleep(attempt * 1000);
        continue;
      }

      throw new Error(friendlyErrorMessage(status, error));
    }
  }

  throw new Error("Failed to analyze code after maximum attempts.");
}
