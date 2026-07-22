import type { BuildingPlan } from "@/types/plan";

type PlanPanelProps = {
  project: BuildingPlan | null;
  isGenerating?: boolean;
};

const sectionStyle = {
  padding: 18,
  border: "1px solid #303832",
  borderRadius: 14,
  background: "#171b18",
};

export default function PlanPanel({
  project,
  isGenerating = false,
}: PlanPanelProps) {
  return (
    <aside
      style={{
        width: 380,
        minWidth: 320,
        height: "100%",
        padding: 22,
        borderLeft: "1px solid #303832",
        overflowY: "auto",
        background: "#101311",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingBottom: 18,
          borderBottom: "1px solid #303832",
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            display: "grid",
            placeItems: "center",
            borderRadius: 12,
            background: "#26382b",
            fontSize: 22,
          }}
        >
          🏗️
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
            }}
          >
            建築規劃
          </h2>

          <p
            style={{
              margin: "4px 0 0",
              color: "#8e9991",
              fontSize: 13,
            }}
          >
            Minecraft AI Building Plan
          </p>
        </div>
      </div>

      {isGenerating ? (
        <div
          style={{
            marginTop: 24,
            padding: 24,
            border: "1px solid #344239",
            borderRadius: 14,
            background: "#171d19",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 36,
              marginBottom: 14,
            }}
          >
            ⛏️
          </div>

          <h3
            style={{
              margin: 0,
            }}
          >
            正在產生建築計畫
          </h3>

          <p
            style={{
              margin: "10px 0 0",
              color: "#9aa49d",
              lineHeight: 1.7,
            }}
          >
            系統正在整理建築尺寸、材料與施工步驟……
          </p>
        </div>
      ) : !project ? (
        <div
          style={{
            marginTop: 24,
            padding: 24,
            border: "1px dashed #3b463f",
            borderRadius: 14,
            background: "#151916",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 38,
              marginBottom: 14,
            }}
          >
            🧱
          </div>

          <h3
            style={{
              margin: 0,
              fontSize: 18,
            }}
          >
            尚未產生建築計畫
          </h3>

          <p
            style={{
              margin: "12px 0 0",
              color: "#9aa39d",
              lineHeight: 1.8,
              fontSize: 14,
            }}
          >
            在左側選擇建築主題、規模並輸入構想，
            接著按下 Generate Plan。
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 18,
            marginTop: 22,
          }}
        >
          <section
            style={{
              ...sectionStyle,
              background:
                "linear-gradient(145deg, #213328, #171c18)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#81bb8d",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1.5,
              }}
            >
              BUILDING PLAN
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                fontSize: 24,
                lineHeight: 1.35,
              }}
            >
              {project.name}
            </h2>
          </section>

          <section style={sectionStyle}>
            <h3
              style={{
                margin: "0 0 12px",
                fontSize: 16,
              }}
            >
              📖 建築故事
            </h3>

            <p
              style={{
                margin: 0,
                lineHeight: 1.8,
                color: "#c3cbc5",
                fontSize: 14,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {project.story}
            </p>
          </section>

          <section style={sectionStyle}>
            <h3
              style={{
                margin: "0 0 12px",
                fontSize: 16,
              }}
            >
              📏 建築尺寸
            </h3>

            <div
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                background: "#0f1210",
                color: "#b9d9c0",
                fontWeight: 700,
                lineHeight: 1.6,
              }}
            >
              {project.size}
            </div>
          </section>

          <section style={sectionStyle}>
            <h3
              style={{
                margin: "0 0 12px",
                fontSize: 16,
              }}
            >
              🎨 建材風格
            </h3>

            <p
              style={{
                margin: 0,
                lineHeight: 1.8,
                color: "#c3cbc5",
                fontSize: 14,
              }}
            >
              {project.palette}
            </p>
          </section>

          <section style={sectionStyle}>
            <h3
              style={{
                margin: "0 0 14px",
                fontSize: 16,
              }}
            >
              📦 材料清單
            </h3>

            <div
              style={{
                display: "grid",
                gap: 10,
              }}
            >
              {project.materials.map(
                (material, index) => (
                  <div
                    key={`${material.name}-${index}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 14,
                      padding: "11px 12px",
                      borderRadius: 10,
                      background: "#0f1210",
                    }}
                  >
                    <span
                      style={{
                        color: "#d5ddd7",
                        fontSize: 14,
                        lineHeight: 1.5,
                      }}
                    >
                      {material.name}
                    </span>

                    <strong
                      style={{
                        flexShrink: 0,
                        color: "#86bf91",
                        fontSize: 13,
                      }}
                    >
                      {material.amount}
                    </strong>
                  </div>
                )
              )}
            </div>
          </section>

          <section style={sectionStyle}>
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: 16,
              }}
            >
              🛠️ 建造步驟
            </h3>

            <div
              style={{
                display: "grid",
                gap: 18,
              }}
            >
              {project.steps.map((step, index) => (
                <div
                  key={`${step.title}-${index}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "34px 1fr",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 10,
                      background: "#2b4431",
                      color: "#b8dec0",
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: 15,
                        lineHeight: 1.5,
                      }}
                    >
                      {step.title}
                    </h4>

                    <p
                      style={{
                        margin: "6px 0 0",
                        lineHeight: 1.75,
                        color: "#aeb7b0",
                        fontSize: 14,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </aside>
  );
}
