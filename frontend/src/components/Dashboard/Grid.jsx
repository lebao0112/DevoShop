import StatCard from "./StatCard";
import ActivityGraph from "./ActivityGraph";
import UsageRadar from "./UsageRadar";
import ProductTable from "../Products/ProductTable";
export default function Grid() {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <StatCard />
                <ActivityGraph />
                <UsageRadar />
            </div>
            <div className='flex-1 overflow-auto relative z-10'>
                <div className='mx-auto py-6 px-4'>
                    <ProductTable />
                </div>
            </div>
        </>
       
    )
}
