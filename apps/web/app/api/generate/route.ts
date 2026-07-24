import { NextResponse } from "next/server";
import { runArchitect } from "@/lib/agents/architect";
import type { ProjectData } from "@/types/project";
import type { BuildingPlan } from "@/types/plan";

const sizeByScale: Record<string, string> = {
  Small: "寬 25 × 深 25 × 高 18 格",
  Medium: "寬 45 × 深 45 × 高 30 格",
  Large: "寬 75 × 深 75 × 高 50 格",
};

type ArchitectMaterial = {
  name: string;
  amount: string;
};

type ArchitectStep = {
  title: string;
  description: string;
};

type ArchitectPlan = {
  story: string;
  palette: string;
  materials: ArchitectMaterial[];
  steps: ArchitectStep[];
};

function cleanJsonResponse(response: string): string {
  let cleaned = response.trim();

  cleaned = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("Architect 沒有回傳有效的 JSON 物件。");
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
}

function isArchitectPlan(value: unknown): value is ArchitectPlan {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  const plan = value as Record<string, unknown>;

  if (
    typeof plan.story !== "string" ||
    typeof plan.palette !== "string" ||
    !Array.isArray(plan.materials) ||
    !Array.isArray(plan.steps)
  ) {
    return false;
  }

  const materialsAreValid = plan.materials.every(
    (material) => {
      if (
        typeof material !== "object" ||
        material === null ||
        Array.isArray(material)
      ) {
        return false;
      }

      const item = material as Record<string, unknown>;

      return (
        typeof item.name === "string" &&
        typeof item.amount === "string"
      );
    }
  );

  const stepsAreValid = plan.steps.every((step) => {
    if (
      typeof step !== "object" ||
      step === null ||
      Array.isArray(step)
    ) {
      return false;
    }

    const item = step as Record<string, unknown>;

    return (
      typeof item.title === "string" &&
      typeof item.description === "string"
    );
  });

  return (
    materialsAreValid &&
    stepsAreValid &&
    plan.steps.length === 7
  );
}

function parseArchitectPlan(response: string): ArchitectPlan {
  const cleaned = cleanJsonResponse(response);

  let parsed: unknown;

  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(
      "Architect 回傳的內容不是有效 JSON，請重新產生一次。"
    );
  }

  if (!isArchitectPlan(parsed)) {
    throw new Error(
      "Architect 回傳格式不完整，必須包含 story、palette、materials 與 7 個 steps。"
    );
  }

  return parsed;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProjectData;

    if (
      !body.theme?.trim() ||
      !body.prompt?.trim() ||
      !body.scale?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "請完整填寫主題、規模與建築描述。",
        },
        {
          status: 400,
        }
      );
    }

    const scale =
      body.scale in sizeByScale ? body.scale : "Medium";

    const model = process.env.GEMINI_MODEL;

    if (!model) {
      throw new Error("缺少 GEMINI_MODEL 環境變數。");
    }

    const architectResult = await runArchitect(
      {
        theme: body.theme.trim(),
        scale,
        prompt: body.prompt.trim(),
      },
      model
    );

    const architectPlan =
      parseArchitectPlan(architectResult);

    const plan: BuildingPlan = {
      name: `${body.theme.trim()}建築計畫`,
      story: architectPlan.story,
      size: sizeByScale[scale],
      palette: architectPlan.palette,
      materials: architectPlan.materials,
      steps: architectPlan.steps,
    };

    return NextResponse.json({
      success: true,
      received: body,
      agents: {
        architect: architectPlan,
      },
      plan,
    });
  } catch (error) {
    console.error("Generate plan error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "產生建築規劃時發生未知錯誤。";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 500,
      }
    );
  }
}
