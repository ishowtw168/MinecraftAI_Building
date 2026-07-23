import { NextResponse } from "next/server";
import { runArchitect } from "@/lib/agents/architect";
import type { ProjectData } from "@/types/project";
import type { BuildingPlan } from "@/types/plan";

const sizeByScale: Record<string, string> = {
  Small: "寬 25 × 深 25 × 高 18 格",
  Medium: "寬 45 × 深 45 × 高 30 格",
  Large: "寬 75 × 深 75 × 高 50 格",
};

const amountByScale: Record<
  string,
  {
    main: string;
    secondary: string;
    detail: string;
    lighting: string;
  }
> = {
  Small: {
    main: "約 8 組",
    secondary: "約 4 組",
    detail: "約 2 組",
    lighting: "約 24 個",
  },
  Medium: {
    main: "約 20 組",
    secondary: "約 10 組",
    detail: "約 5 組",
    lighting: "約 48 個",
  },
  Large: {
    main: "約 40 組",
    secondary: "約 20 組",
    detail: "約 10 組",
    lighting: "約 96 個",
  },
};

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

    const scale = body.scale in sizeByScale ? body.scale : "Medium";
    const amounts = amountByScale[scale];

    const model = process.env.GEMINI_MODEL;

    if (!model) {
      throw new Error("缺少 GEMINI_MODEL 環境變數。");
    }

    const architectResult = await runArchitect(
      {
        theme: body.theme,
        scale,
        prompt: body.prompt,
      },
      model
    );

    const plan: BuildingPlan = {
      name: `${body.theme}建築計畫`,

      // 這裡已經改成真正的 Architect AI 回答
      story: architectResult,

      size: sizeByScale[scale],

      palette:
        "目前材料配色暫時沿用基礎規劃，之後會交由 Architect 與 Builder Agent 產生結構化結果。",

      materials: [
        {
          name: "主要結構方塊",
          amount: amounts.main,
        },
        {
          name: "次要裝飾方塊",
          amount: amounts.secondary,
        },
        {
          name: "樓梯、半磚與牆",
          amount: amounts.detail,
        },
        {
          name: "燈籠、火把或其他光源",
          amount: amounts.lighting,
        },
        {
          name: "玻璃、欄杆與細節材料",
          amount: "依 AI 設計調整",
        },
      ],

      steps: [
        {
          title: "整理建築基地",
          description:
            "選擇適合的位置，清除地面障礙物，並依照建築尺寸標示四個角落。",
        },
        {
          title: "建立地基與外框",
          description:
            "先完成主要地基，再根據 Architect 的設計標示入口、房間及外牆位置。",
        },
        {
          title: "搭建立面與主要結構",
          description:
            "依照 Architect 產生的建築風格完成牆面、屋頂、塔樓及主要輪廓。",
        },
        {
          title: "規劃內部空間",
          description:
            "加入大廳、走廊、樓梯與功能房間，確保玩家可以順暢移動。",
        },
        {
          title: "加入主題裝飾",
          description: `根據「${body.prompt}」及 Architect 的設計加入主題細節。`,
        },
        {
          title: "完成照明與環境",
          description:
            "放置光源並補充道路、植栽、水景及周邊地形。",
        },
        {
          title: "最後檢查",
          description:
            "檢查建築比例、玩家動線、照明及可能生成怪物的區域。",
        },
      ],
    };

    return NextResponse.json({
      success: true,
      received: body,
      agents: {
        architect: architectResult,
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
