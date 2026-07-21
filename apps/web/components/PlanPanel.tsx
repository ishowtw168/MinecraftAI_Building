import type { ProjectData } from "@/types/project";

type PlanPanelProps = {
  project: ProjectData | null;
};

export default function PlanPanel({ project }: PlanPanelProps) {
  return (
    <aside
      style={{
        width: 300,
        padding: 24,
        borderLeft: "1px solid #333",
      }}
    >
      <h3>Plan</h3>

      {!project ? (
        <p style={{ marginTop: 24 }}>
          尚未產生建築計畫。
        </p>
      ) : (
        <div style={{ marginTop: 24 }}>
          <p>
            <strong>Theme</strong>
          </p>
          <p>{project.theme || "未填寫"}</p>

          <p style={{ marginTop: 20 }}>
            <strong>Scale</strong>
          </p>
          <p>{project.scale}</p>

          <p style={{ marginTop: 20 }}>
            <strong>Prompt</strong>
          </p>
          <p
            style={{
              marginTop: 8,
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
            }}
          >
            {project.prompt || "未填寫"}
          </p>
        </div>
      )}
    </aside>
  );
}
