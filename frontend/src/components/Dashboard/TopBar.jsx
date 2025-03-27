import { FiCalendar } from "react-icons/fi";
import UserContext from "../../contexts/userContext";
import { useContext } from "react";
export default function TopBar() {
    const { user, loading } = useContext(UserContext);
    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }
    return (
        <div className="border-b px-4 mt-2 pb-4 border-stone-200">
            <div className="flex items-center justify-between p-0.5">
                <div>
                    <span className="text-sm font-bold block">Xin chào, {user.name}!</span>
                    <span className="text-xs block text-stone-500"> {/* Ngày tháng năm */}
                        {new Date().toLocaleDateString()}
                    </span>
                </div>

                <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
                    <FiCalendar />
                    <span>Prev 6 Months</span>
                </button>
            </div>
        </div>
    )
}
