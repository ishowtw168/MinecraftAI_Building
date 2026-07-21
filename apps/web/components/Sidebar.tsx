"use client";

import { useState } from "react";
import type { ProjectData } from "@/types/project";

type SidebarProps = {
  onGenerate: (data: ProjectData) => void;
};

export default function Sidebar({ onGenerate }: SidebarProps) {
  const [theme, setTheme] = useState("");
  const [scale, setScale] = useState("Medium");
  const [prompt, setPrompt] = useState("");

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
        width: 280,
        padding: 24,
        borderRight: "1px solid #333",
      }}
    >
      <h3>Project Settings</h3>

      <label style={{ display: "block", marginTop: 24 }}>
        Theme
      </label>

      <input
        type="text"
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        placeholder="例如：埃及神殿"
        style={{
          width: "100%",
          marginTop: 8,
          padding: 10,
        }}
      />

      <label style={{ display: "block", marginTop: 20 }}>
        Scale
      </label>

      <select
        value={scale}
        onChange={(event) => setScale(event.target.value)}
        style={{
          width: "100%",
          marginTop: 8,
          padding: 10,
        }}
      >
        <option>Small</option>
        <option>Medium</option>
        <option>Large</option>
      </select>

      <label style={{ display: "block", marginTop: 20 }}>
        Prompt
      </label>

      <textarea
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="描述你想建造的世界……"
        rows={6}
        style={{
          width: "100%",
          marginTop: 8,
          padding: 10,
          resize: "vertical",
        }}
      />

      <button
        type="button"
        onClick={handleGenerate}
        style={{
          marginTop: 24,
          width: "100%",
          padding: 12,
          cursor: "pointer",
        }}
      >
        Generate Plan
      </button>
    </aside>
  );
}
