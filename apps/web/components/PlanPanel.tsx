export default function PlanPanel() {
  return (
    <aside
      style={{
        width: 300,
        padding: 24,
        borderLeft: "1px solid #333",
      }}
    >
      <h3>Plan</h3>

      <ul style={{ marginTop: 24 }}>
        <li>World</li>
        <li>Landscape</li>
        <li>Architecture</li>
        <li>Story</li>
        <li>Review</li>
      </ul>
    </aside>
  );
}
