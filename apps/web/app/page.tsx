import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Workspace from "@/components/Workspace";
import PlanPanel from "@/components/PlanPanel";

export default function HomePage() {
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
        <Sidebar />
        <Workspace />
        <PlanPanel />
      </main>
    </div>
  );
}
