export default function Sidebar() {
  return (
    <aside
      style={{
        width: 280,
        padding: 24,
        borderRight: "1px solid #333",
      }}
    >
      <h3>Project</h3>

      <div style={{ marginTop: 24 }}>
        <p>Theme</p>
        <p>Scale</p>
        <p>Prompt</p>
      </div>

      <button
        style={{
          marginTop: 32,
          width: "100%",
          padding: 12,
          cursor: "pointer",
        }}
      >
        Generate
      </button>
    </aside>
  );
}
