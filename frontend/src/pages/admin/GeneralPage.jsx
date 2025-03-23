import Sidebar from "../../components/Sidebar/Sidebar";
import Dashboard from "../../components/Dashboard/Dashboard";

export default function GeneralPage() {
  return (
    <main className="grid gap-4 p-4 grid-cols-[250px_1fr]">
      <Sidebar />
      <Dashboard />
    </main>
  );
}
