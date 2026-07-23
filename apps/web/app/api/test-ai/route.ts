import { NextResponse } from "next/server";
import { ai } from "@/lib/ai/gemini";

export async function GET() {
  try {
    const model = process.env.GEMINI_MODEL;

    if (!model) {
      throw new Error("缺少 GEMINI_MODEL 環境變數。");
    }

    const result = await ai.models.generateContent({
      model,
      contents: "請只回答：Gemini 連線成功！",
    });

    return NextResponse.json({
      success: true,
      model,
      text: result.text,
    });
  } catch (error) {
    console.error("Test AI error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      }
    );
  }
}
