import { NextResponse } from "next/server";
import { ai } from "@/lib/ai/gemini";

export async function GET() {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "請只回答：Gemini 連線成功！",
    });

    return NextResponse.json({
      success: true,
      text: result.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}
