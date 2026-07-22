import type { BuildingPlan } from "@/types/plan";

type PlanPanelProps = {
  project: BuildingPlan | null;
};

export default function PlanPanel({
  project,
}: PlanPanelProps) {
  return (
    <aside
      style={{
        width: 360,
        padding: 24,
        borderLeft: "1px solid #333",
        overflowY: "auto",
        background: "#101312",
        color: "white",
      }}
    >
      <h2
        style={{
          margin: 0,
          marginBottom: 20,
        }}
      >
        🏗️ 建築規劃
      </h2>

      {!project ? (
        <p
          style={{
            color: "#9aa39d",
            lineHeight: 1.8,
          }}
        >
          尚未產生建築計畫。
          <br />
          填寫左側資料後按下
          <strong> Generate Plan </strong>
          即可查看 AI 建議。
        </p>
      ) : (
        <>
          <h2
            style={{
              marginTop: 0,
            }}
          >
            {project.name}
          </h2>

          <section
            style={{
              marginTop: 24,
            }}
          >
            <h3>📖 建築故事</h3>

            <p
              style={{
                lineHeight: 1.8,
                color: "#cfcfcf",
              }}
            >
              {project.story}
            </p>
          </section>

          <section
            style={{
              marginTop: 24,
            }}
          >
            <h3>📏 建築尺寸</h3>

            <p>{project.size}</p>
          </section>

          <section
            style={{
              marginTop: 24,
            }}
          >
            <h3>🎨 建材建議</h3>

            <p
              style={{
                lineHeight: 1.7,
                color: "#cfcfcf",
              }}
            >
              {project.palette}
            </p>
          </section>

          <section
            style={{
              marginTop: 28,
            }}
          >
            <h3>📦 材料清單</h3>

            <ul
              style={{
                paddingLeft: 20,
                lineHeight: 2,
              }}
            >
              {project.materials.map((material) => (
                <li key={material.name}>
                  <strong>{material.name}</strong>
                  {" - "}
                  {material.amount}
                </li>
              ))}
            </ul>
          </section>

          <section
            style={{
              marginTop: 28,
            }}
          >
            <h3>🛠️ 建造步驟</h3>

            <ol
              style={{
                paddingLeft: 22,
              }}
            >
              {project.steps.map((step) => (
                <li
                  key={step.title}
                  style={{
                    marginBottom: 18,
                  }}
                >
                  <strong>{step.title}</strong>

                  <p
                    style={{
                      marginTop: 6,
                      lineHeight: 1.7,
                      color: "#cfcfcf",
                    }}
                  >
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </>
      )}
    </aside>
  );
}
