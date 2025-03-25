import AccountToggle from "./AccountToggle";
import SearchBar from "./SearchBar";
import RouteSelect from "./RouteSelect";
import "./sidebar.css";
export default function Sidebar() {
    return (
        <div>
            <div className="custom-scrollbar sticky top-4 h-[calc(100vh-32px-48px)]">
                <AccountToggle />
                <SearchBar />
                <RouteSelect />
            </div>
        </div>
    )
}
