import {FiChevronDown, FiChevronUp} from "react-icons/fi";
import UserContext from "../../userContext";
import { useContext } from "react";

export default function AccountToggle() {
    const { user, loading } = useContext(UserContext);
    
    if (loading) {
        return (
            <div className="border-b border-stone-300 mt-2 mb-4 pb-4">
                <div className="flex p-0.5 items-center gap-2 w-full">
                    <div className="size-8 rounded shrink-0 bg-gray-200 animate-pulse"></div>
                    <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="border-b border-stone-300 mt-2 mb-4 pb-4">
            <button className="flex p-0.5 hover:bg-stone-200 rounded trasition-colors relative gap-2 w-full items-center">
                <img src={"https://github.com/shadcn.png"} alt="user" className="size-8 rounded shrink-0 bg-violet-500" />
                <div className="text-start">
                    <span className="text-sm font-bold block">
                        {user?.name || "Tài khoản"}
                    </span>
                    <span className="text-xs block text-stone-500">{user?.email || ""}</span>
                </div>
                <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" />
                <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />
            </button>
        </div>  
    )
}
