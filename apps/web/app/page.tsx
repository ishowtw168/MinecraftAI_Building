"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Workspace from "@/components/Workspace";
import PlanPanel from "@/components/PlanPanel";
import type { ProjectData } from "@/types/project";

export default function HomePage() {
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

  console.log(result);

  setProject(result.received);
}

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          display: "flex",
        }}
      >
        <Sidebar onGenerate={handleGenerate} />
        <Workspace />
        <PlanPanel project={project} />
      </main>
    </div>
  );
}
