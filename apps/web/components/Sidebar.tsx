"use client";

import { useEffect, useState } from "react";
import { templates, type BuildingTemplate } from "@/data/templates";
import type { ProjectData } from "@/types/project";

type SidebarProps = {
  onGenerate: (data: ProjectData) => void;
  initialProject?: ProjectData;
};

export default function Sidebar({
  onGenerate,
  initialProject,
}: SidebarProps) {
  const [theme, setTheme] = useState(initialProject?.theme ?? "");
  const [scale, setScale] = useState(initialProject?.scale ?? "Medium");
  const [prompt, setPrompt] = useState(initialProject?.prompt ?? "");

  useEffect(() => {
    if (!initialProject) {
      return;
    }

    setTheme(initialProject.theme);
    setScale(initialProject.scale);
    setPrompt(initialProject.prompt);
  }, [initialProject]);

  function selectTemplate(template: BuildingTemplate) {
    setTheme(template.data.theme);
    setScale(template.data.scale);
    setPrompt(template.data.prompt);
  }

  function handleGenerate() {
    onGenerate({
      theme,
      scale,
      prompt,
    });
  }

  return (
    <aside
      style={{
        width: 320,
        padding: 24,
        borderRight: "1px solid #333",
        overflowY: "auto",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Project Settings</h3>

      <p
        style={{
          marginTop: 24,
          marginBottom: 10,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Quick Templates
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        {templates.map((template) => (
          <button
            key={template.name}
            type="button"
            onClick={() => selectTemplate(template)}
            style={{
              padding: 10,
              border: "1px solid #444",
              borderRadius: 8,
              background:
                theme === template.data.theme ? "#2f6fed" : "transparent",
              color: "inherit",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span style={{ marginRight: 6 }}>{template.icon}</span>
            {template.name}
          </button>
        ))}
      </div>

      <label style={{ display: "block", marginTop: 24 }}>Theme</label>

      <input
        type="text"
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        placeholder="例如：埃及神殿"
        style={{
          width: "100%",
          marginTop: 8,
          padding: 10,
          boxSizing: "border-box",
        }}
      />

      <label style={{ display: "block", marginTop: 20 }}>Scale</label>

      <select
        value={scale}
        onChange={(event) => setScale(event.target.value)}
        style={{
          width: "100%",
          marginTop: 8,
          padding: 10,
        }}
      >
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>

      <label style={{ display: "block", marginTop: 20 }}>Prompt</label>

      <textarea
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="描述你想建造的世界……"
        rows={7}
        style={{
          width: "100%",
          marginTop: 8,
          padding: 10,
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <button
        type="button"
        onClick={handleGenerate}
        disabled={!theme.trim() || !prompt.trim()}
        style={{
          marginTop: 24,
          width: "100%",
          padding: 12,
          border: "none",
          borderRadius: 8,
          background:
            theme.trim() && prompt.trim() ? "#2f6fed" : "#555",
          color: "white",
          cursor:
            theme.trim() && prompt.trim() ? "pointer" : "not-allowed",
        }}
      >
        Generate Plan
      </button>
    </aside>
  );
}
