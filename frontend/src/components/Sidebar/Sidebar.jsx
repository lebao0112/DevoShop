import AccountToggle from "./AccountToggle";
import SearchBar from "./SearchBar";
import RouteSelect from "./RouteSelect";
import Plan from "./Plan";
import "./sidebar.css";
export default function Sidebar() {
    return (
        <div>
            <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
                <AccountToggle />
                <SearchBar />
                <RouteSelect />
            </div>

            <Plan />
        </div>
    )
}
