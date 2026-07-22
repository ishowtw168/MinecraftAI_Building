"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Workspace from "@/components/Workspace";
import PlanPanel from "@/components/PlanPanel";
import type { ProjectData } from "@/types/project";
import { templates } from "@/data/templates";

export default function HomePage() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<ProjectData | undefined>();
  const [project, setProject] = useState<ProjectData | null>(null);

  async function handleGenerate(data: ProjectData) {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    setProject(result.received);
  }

  function openEmptyEditor() {
    setSelectedTemplate(undefined);
    setProject(null);
    setIsEditorOpen(true);
  }

  function openTemplateEditor(templateData: ProjectData) {
    setSelectedTemplate(templateData);
    setProject(null);
    setIsEditorOpen(true);
  }

  if (isEditorOpen) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#0d0f0e",
        }}
      >
        <Header />

        <main
          style={{
            flex: 1,
            display: "flex",
            minHeight: 0,
          }}
        >
          <Sidebar
            onGenerate={handleGenerate}
            initialProject={selectedTemplate}
          />

          <Workspace />

          <PlanPanel project={project} />
        </main>
      </div>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #26382c 0%, #111713 45%, #080a09 100%)",
        color: "white",
      }}
    >
      <nav
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontWeight: 800,
            fontSize: 20,
          }}
        >
          <span style={{ fontSize: 30 }}>⛏️</span>
          Minecraft AI Building
        </div>

        <button
          type="button"
          onClick={openEmptyEditor}
          style={{
            padding: "11px 18px",
            border: "1px solid #5e8d68",
            borderRadius: 10,
            background: "rgba(55, 105, 66, 0.25)",
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          開啟編輯器
        </button>
      </nav>

      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "100px 28px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            marginBottom: 22,
            padding: "8px 14px",
            borderRadius: 999,
            background: "rgba(89, 148, 101, 0.16)",
            border: "1px solid rgba(116, 177, 127, 0.35)",
            color: "#a9d8b1",
            fontSize: 14,
          }}
        >
          Minecraft 建築規劃工具
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(44px, 8vw, 82px)",
            lineHeight: 1.05,
            letterSpacing: -3,
          }}
        >
          把你的想像
          <br />
          變成 Minecraft 建築
        </h1>

        <p
          style={{
            maxWidth: 700,
            margin: "28px auto 0",
            color: "#b7beb9",
            fontSize: 20,
            lineHeight: 1.8,
          }}
        >
          選擇主題、建築規模並描述你的構想，
          系統會協助整理成清楚的 Minecraft 建築計畫。
        </p>

        <button
          type="button"
          onClick={openEmptyEditor}
          style={{
            marginTop: 38,
            padding: "16px 30px",
            border: "none",
            borderRadius: 12,
            background: "#63a66f",
            color: "#081009",
            fontSize: 18,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 12px 35px rgba(71, 139, 84, 0.3)",
          }}
        >
          開始建造 →
        </button>
      </section>

      <section
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "30px 28px 100px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 34 }}>
          <p
            style={{
              margin: 0,
              color: "#83b88d",
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: 13,
            }}
          >
            BUILDING IDEAS
          </p>

          <h2
            style={{
              margin: "10px 0 0",
              fontSize: 34,
            }}
          >
            從熱門建築靈感開始
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 18,
          }}
        >
          {templates.map((template) => (
            <button
              key={template.name}
              type="button"
              onClick={() => openTemplateEditor(template.data)}
              style={{
                minHeight: 170,
                padding: 24,
                textAlign: "left",
                border: "1px solid #303a33",
                borderRadius: 18,
                background: "rgba(18, 23, 20, 0.85)",
                color: "white",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: 36 }}>{template.icon}</div>

              <h3
                style={{
                  margin: "18px 0 8px",
                  fontSize: 20,
                }}
              >
                {template.name}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#9da7a0",
                  lineHeight: 1.6,
                }}
              >
                {template.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section
        style={{
          borderTop: "1px solid #252c27",
          borderBottom: "1px solid #252c27",
          background: "rgba(10, 13, 11, 0.75)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "70px 28px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
          }}
        >
          {[
            {
              icon: "💡",
              title: "輸入建築構想",
              text: "描述主題、場景、設施與希望呈現的氣氛。",
            },
            {
              icon: "📐",
              title: "設定規模",
              text: "選擇小型、中型或大型建築計畫。",
            },
            {
              icon: "🧱",
              title: "取得建築規劃",
              text: "整理你的需求，逐步建立 Minecraft 建築方案。",
            },
          ].map((feature) => (
            <div key={feature.title}>
              <div style={{ fontSize: 32 }}>{feature.icon}</div>

              <h3 style={{ marginBottom: 8 }}>{feature.title}</h3>

              <p
                style={{
                  margin: 0,
                  color: "#9da7a0",
                  lineHeight: 1.7,
                }}
              >
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer
        style={{
          padding: "30px 24px",
          textAlign: "center",
          color: "#747e77",
          fontSize: 14,
        }}
      >
        Minecraft AI Building Studio
      </footer>
    </main>
  );
}
