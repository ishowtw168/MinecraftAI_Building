import { readFile } from "node:fs/promises";
import path from "node:path";
import { ai } from "@/lib/ai/gemini";

export interface ArchitectInput {
  theme: string;
  scale: string;
  prompt: string;
}

const MAX_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [2000, 4000];

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function isTemporaryGeminiError(error: unknown): boolean {
  const message =
    error instanceof Error ? error.message : String(error);

  return (
    message.includes('"code":503') ||
    message.includes("503") ||
    message.includes("UNAVAILABLE") ||
    message.includes("high demand")
  );
}

async function generateWithRetry(
  model: string,
  systemInstruction: string,
  contents: string
): Promise<string> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const result = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
        },
      });

      const text = result.text?.trim();

      if (!text) {
        throw new Error("Architect Agent 沒有產生任何內容。");
      }

      return text;
    } catch (error) {
      lastError = error;

      const shouldRetry =
        isTemporaryGeminiError(error) && attempt < MAX_ATTEMPTS;

      if (!shouldRetry) {
        throw error;
      }

      const delay = RETRY_DELAYS_MS[attempt - 1];

      console.warn(
        `Gemini 暫時繁忙，第 ${attempt} 次呼叫失敗，${delay / 1000} 秒後重試。`
      );

      await sleep(delay);
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Gemini 呼叫失敗。");
}

export async function runArchitect(
  input: ArchitectInput,
  model: string
): Promise<string> {
  const rolePath = path.resolve(
    process.cwd(),
    "../../studio/roles/architect.md"
  );

  const rolePrompt = await readFile(rolePath, "utf-8");

  const userRequest = `
請根據以下 Minecraft 建築需求進行設計。

主題：${input.theme}
規模：${input.scale}
使用者描述：${input.prompt}

請遵守 Architect 角色文件中的職責、流程與輸出規範。
請使用繁體中文回答。
`;

  return generateWithRetry(
    model,
    rolePrompt,
    userRequest
  );
}
