export default function Header() {
  return (
    <header
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: "1px solid #333",
      }}
    >
      <h2>Minecraft AI Studio</h2>

      <span>Prototype v0.1</span>
    </header>
  );
}
