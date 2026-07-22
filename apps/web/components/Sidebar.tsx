"use client";

import { useState } from "react";
import type { ProjectData } from "@/types/project";

type SidebarProps = {
  onGenerate: (data: ProjectData) => void;
};

type BuildingTemplate = {
  name: string;
  icon: string;
  theme: string;
  scale: string;
  prompt: string;
};

const templates: BuildingTemplate[] = [
  {
    name: "中世紀城堡",
    icon: "🏰",
    theme: "中世紀城堡",
    scale: "Large",
    prompt:
      "建造一座位於山丘上的大型中世紀城堡，包含城牆、瞭望塔、吊橋、中央主堡和地下牢房。",
  },
  {
    name: "日式神社",
    icon: "⛩️",
    theme: "日式神社",
    scale: "Medium",
    prompt:
      "建造一座位於櫻花森林中的日式神社，包含鳥居、石燈籠、參道、主殿和小型池塘。",
  },
  {
    name: "精靈村莊",
    icon: "🧝",
    theme: "精靈村莊",
    scale: "Medium",
    prompt:
      "建造一座藏在巨大森林中的精靈村莊，房屋依附在樹木上，並使用吊橋、藤蔓和發光植物連接。",
  },
  {
    name: "埃及神殿",
    icon: "🏺",
    theme: "埃及神殿",
    scale: "Large",
    prompt:
      "建造一座被沙漠包圍的古埃及神殿，包含巨大石柱、法老雕像、密室、祭壇和地下墓穴。",
  },
  {
    name: "現代別墅",
    icon: "🏙️",
    theme: "現代別墅",
    scale: "Medium",
    prompt:
      "建造一座懸崖旁的現代豪華別墅，包含大片玻璃窗、無邊際泳池、花園和地下車庫。",
  },
  {
    name: "海盜港口",
    icon: "🏴‍☠️",
    theme: "海盜港口",
    scale: "Large",
    prompt:
      "建造一座熱鬧的海盜港口，包含木造碼頭、酒館、倉庫、燈塔、海盜船和隱藏寶藏洞穴。",
  },
];

export default function Sidebar({ onGenerate }: SidebarProps) {
  const [theme, setTheme] = useState("");
  const [scale, setScale] = useState("Medium");
  const [prompt, setPrompt] = useState("");

  function selectTemplate(template: BuildingTemplate) {
    setTheme(template.theme);
    setScale(template.scale);
    setPrompt(template.prompt);
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
              background: theme === template.theme ? "#2f6fed" : "transparent",
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
          boxSizing: "border-box",
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
