import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="text-stone-950 bg-stone-100">
            <Outlet />
        </div>
    )
}
