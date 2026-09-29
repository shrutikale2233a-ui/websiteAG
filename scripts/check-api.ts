import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`[check-api] Testing connection to Gemini API (${AI.model})...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n--- API CHECK SUCCESSFUL ---");
    console.log(`Model: ${AI.model}`);
    console.log(`Issues detected: ${result.issues.length}`);
    console.log(`Roast: "${result.roast}"`);
    console.log(`Takeaway: "${result.takeaway}"\n`);
  } catch (error: any) {
    console.error("\n--- API CHECK FAILED ---");
    console.error(error?.message || error);
    console.error("Make sure your GEMINI_API_KEY is properly set in .env.local\n");
    process.exit(1);
  }
}

main();
