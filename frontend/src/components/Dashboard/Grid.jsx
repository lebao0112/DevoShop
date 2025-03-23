import StatCard from "./StatCard";
import ActivityGraph from "./ActivityGraph";
import UsageRadar from "./UsageRadar";
export default function Grid() {
    return (
        <div className="px-4 grid gap-3 grid-cols-12">
            <StatCard />
            <ActivityGraph />
            <UsageRadar />      
        </div>
    )
}
