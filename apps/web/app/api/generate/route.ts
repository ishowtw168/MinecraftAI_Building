import { NextResponse } from "next/server";
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

    const scale = body.scale in sizeByScale
      ? body.scale
      : "Medium";

    const amounts = amountByScale[scale];

    const plan: BuildingPlan = {
      name: `${body.theme}建築計畫`,

      story: `這座建築以「${body.theme}」為核心主題。整體設計會根據你的構想「${body.prompt}」進行規劃，讓建築兼具清楚的視覺特色、探索動線與 Minecraft 世界中的實用性。`,

      size: sizeByScale[scale],

      palette:
        "主材料可依照主題選擇石材、木材或特殊方塊，並使用深淺不同的材料增加建築層次。",

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
          amount: "依實際設計調整",
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
            "先用主要結構方塊完成地基，再標示入口、主要房間與外牆位置。",
        },
        {
          title: "搭建立面與主要結構",
          description:
            "依照主題建立牆面、柱子、塔樓或屋頂，先完成大型輪廓，再處理細節。",
        },
        {
          title: "規劃內部空間",
          description:
            "加入大廳、走廊、樓梯與主題房間，確保玩家可以順暢移動與探索。",
        },
        {
          title: "加入主題裝飾",
          description: `根據「${body.prompt}」加入代表性的裝飾、場景與特殊設施。`,
        },
        {
          title: "完成照明與環境",
          description:
            "放置隱藏光源或主題燈具，並補上道路、植栽、水景及周邊地形。",
        },
        {
          title: "最後檢查",
          description:
            "從不同方向觀察建築比例，修正過於平坦的牆面並確認內部沒有怪物生成區域。",
        },
      ],
    };

    return NextResponse.json({
      success: true,

      // 暫時保留，避免目前的 page.tsx 失去原本資料
      received: body,

      // 新的建築規劃資料
      plan,
    });
  } catch (error) {
    console.error("Generate plan error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "產生建築規劃時發生錯誤，請稍後再試。",
      },
      {
        status: 500,
      }
    );
  }
}
