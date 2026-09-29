import { Schema, Type } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A witty, deadpan critique written in Hinglish with emojis.",
    },
    issues: {
      type: Type.ARRAY,
      description: "Structured list of detected issues ordered from most to least severe.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue appears.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level.",
          },
          title: {
            type: Type.STRING,
            description: "Brief issue title in Hinglish.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact problematic code from the submission.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Explanation of what is wrong in Hinglish.",
          },
          expected: {
            type: Type.STRING,
            description: "Expected behavior or corrected approach in Hinglish.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The complete fixed program without markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "Key takeaway and advice in Hinglish.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
