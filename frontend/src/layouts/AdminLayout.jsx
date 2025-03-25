import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import TopBar from "../components/Dashboard/TopBar";

export default function AdminLayout() {
    return (
        <main className="grid gap-4 p-4 grid-cols-[250px_1fr]">
            <Sidebar />
            <div className="bg-white rounded-lg shadow relative">
                <div className="sticky top-0 z-10 bg-white rounded-t-lg">
                    <TopBar />
                </div>
                <div className="overflow-y-auto max-h-[calc(100vh-2rem)]">
                     <main>
                            <Outlet />
                     </main>
                   
                </div>
            </div>
        </main>
    )
}
