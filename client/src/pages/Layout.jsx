import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTheme } from "../features/themeSlice";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DemoGuideBar from "../components/DemoGuideBar";
import IsoMessageModal from "../components/IsoMessageModal";
import NewTransferModal from "../components/NewTransferModal";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);

    useEffect(() => {
        dispatch(loadTheme());
    }, [dispatch]);

    return (
        <div className={`flex flex-col min-h-screen ${theme === "dark" ? "dark bg-slate-950 text-slate-100" : "bg-slate-900 text-slate-100"}`}>
            {/* Top Persistent Hackathon Demo Bar */}
            <DemoGuideBar />

            {/* Main Application Shell */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar Navigation */}
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-80px)] overflow-hidden">
                    <Navbar setIsSidebarOpen={setIsSidebarOpen} />

                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100">
                        <div className="max-w-7xl mx-auto">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>

            {/* Global Modals */}
            <IsoMessageModal />
            <NewTransferModal />
        </div>
    );
};

export default Layout;
