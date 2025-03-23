import {FiChevronDown, FiChevronUp} from "react-icons/fi";

export default function AccountToggle() {
    return (
        <div className="border-b border-stone-300 mt-2 mb-4 pb-4">
            <button className="flex p-0.5 hover:bg-stone-200 rounded trasition-colors relative gap-2 w-full items-center">
                <img src={"https://github.com/shadcn.png"} alt="user" className="size-8 rounded shrink-0 bg-violet-500" />
                <div className="text-start">
                    <span className="text-sm font-bold block">
                        John Doe
                    </span>
                    <span className="text-xs block text-stone-500">john@doe.com </span>
                </div>
                <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" />
                <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />

            </button>
        </div>  
    )
}
