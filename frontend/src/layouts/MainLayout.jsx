import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout() {
    return (
        <div className="bg-white container mx-auto max-w-full ">
            <div className="sticky top-0 z-50 bg-white shadow-md">
                <Header />
                <Navbar />
            </div>
           
            <main className="flex-grow container max-w-5/6 mx-auto py-6">
                <Outlet /> 
            </main>
            <Footer />
        </div>
    );
}