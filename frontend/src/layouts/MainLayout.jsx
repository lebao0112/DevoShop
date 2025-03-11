import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout() {
    return (
        <div className="bg-white container mx-auto max-w-full ">
            <Header />
            <Navbar />
            <main className="flex-grow container max-w-4/6 mx-auto px-4 py-6">
                <Outlet /> 
            </main>
            <Footer />
        </div>
    );
}