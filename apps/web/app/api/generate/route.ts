import { NextResponse } from "next/server";
import { runArchitect } from "@/lib/agents/architect";
import type { ProjectData } from "@/types/project";
import type { BuildingPlan } from "@/types/plan";

interface ArchitectPlan {
  story: string;
  palette: string;
  materials: Array<{
    name: string;
    amount: string;
  }>;
  steps: Array<{
    title: string;
    description: string;
  }>;
}

const sizeByScale: Record<string, string> = {
  Small: "寬 25 × 深 25 × 高 18 格",
  Medium: "寬 45 × 深 45 × 高 30 格",
  Large: "寬 75 × 深 75 × 高 50 格",
};

function cleanJsonResponse(response: string): string {
  return response
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function isArchitectPlan(value: unknown): value is ArchitectPlan {
  if (!value || typeof value !== "object") {
    return false;
  }

  const plan = value as Partial<ArchitectPlan>;

  const materialsAreValid =
    Array.isArray(plan.materials) &&
    plan.materials.length > 0 &&
    plan.materials.every(
      (material) =>
        material &&
        typeof material.name === "string" &&
        material.name.trim().length > 0 &&
        typeof material.amount === "string" &&
        material.amount.trim().length > 0
    );

  const stepsAreValid =
    Array.isArray(plan.steps) &&
    plan.steps.length === 7 &&
    plan.steps.every(
      (step) =>
        step &&
        typeof step.title === "string" &&
        step.title.trim().length > 0 &&
        typeof step.description === "string" &&
        step.description.trim().length > 0
    );

  return (
    typeof plan.story === "string" &&
    plan.story.trim().length > 0 &&
    typeof plan.palette === "string" &&
    plan.palette.trim().length > 0 &&
    materialsAreValid &&
    stepsAreValid
  );
}

function parseArchitectPlan(response: string): ArchitectPlan {
  const cleanedResponse = cleanJsonResponse(response);

  let parsed: unknown;

  try {
    parsed = JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Architect JSON parse error:", error);
    console.error("Architect raw response:", response);

    throw new Error(
      "Architect 回傳的資料格式不正確，請重新產生建築規劃。"
    );
  }

  if (!isArchitectPlan(parsed)) {
    console.error("Architect invalid plan:", parsed);

    throw new Error(
      "Architect 回傳的建築規劃缺少必要欄位，請重新產生。"
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

    const architectPlan = parseArchitectPlan(architectResult);

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
