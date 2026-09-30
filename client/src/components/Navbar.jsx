import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    toggleTheme
} from "../features/themeSlice";
import {
    setUserRole,
    openIsoModal,
    setNewTransferModalOpen,
    setSelectedTxId
} from "../features/remitsyncSlice";
import { useAuth } from "../features/useAuth";
import {
    Search,
    Sun,
    Moon,
    FileCode,
    Plus,
    Activity,
    ChevronDown,
    Shield,
    Menu,
    Check,
    Cpu
} from "lucide-react";

const Navbar = ({ setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.theme);
    const { activeUserRole, transactions } = useSelector((state) => state.remitsync);
    const { user } = useAuth();

    const [searchQuery, setSearchQuery] = useState("");
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        const found = transactions.find(
            (t) =>
                t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.uetr.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (found) {
            dispatch(setSelectedTxId(found.id));
            navigate(`/transaction/${found.id}`);
            setSearchQuery("");
        }
    };

    return (
        <header className="w-full bg-slate-900 border-b border-slate-800 text-slate-100 px-4 lg:px-6 py-2.5 shrink-0 z-30">
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
                {/* Left: Mobile Toggle & Brand */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSidebarOpen((prev) => !prev)}
                        className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    >
                        <Menu className="size-5" />
                    </button>

                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2.5 cursor-pointer group"
                    >
                        <div className="size-8 rounded-lg bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-900/30 group-hover:scale-105 transition-transform">
                            <span className="font-mono font-black text-white text-sm tracking-tighter">RS</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="font-bold text-sm tracking-tight text-white font-mono">REMITSYNC</span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-blue-950 border border-blue-600 text-blue-300">
                                    DRUNIX
                                </span>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-none">
                                Citi TTS × NPCI Settlement Engine
                            </p>
                        </div>
                    </div>
                </div>

                {/* Center: Live DLT Status & Quick Search */}
                <div className="hidden md:flex items-center gap-4 flex-1 max-w-lg mx-4">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search RSX ID (e.g. RSX-928173) or UETR..."
                            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono transition"
                        />
                    </form>

                    {/* Network Health Indicator */}
                    <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono">
                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Drunix Testbed:</span>
                        <span className="text-emerald-400 font-semibold">380ms SLA</span>
                    </div>
                </div>

                {/* Right: Actions, Role Selector & Theme */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Quick ISO Message Inspector */}
                    <button
                        onClick={() => dispatch(openIsoModal("pacs008"))}
                        className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
                        title="View ISO 20022 Messages"
                    >
                        <FileCode className="size-3.5 text-blue-400" />
                        <span>ISO 20022</span>
                    </button>

                    {/* New Transfer Button */}
                    <button
                        onClick={() => dispatch(setNewTransferModalOpen(true))}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition"
                    >
                        <Plus className="size-3.5" />
                        <span className="hidden sm:inline">New Transfer</span>
                    </button>

                    {/* Role Switcher Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition"
                        >
                            <div className="size-5 rounded-full bg-blue-700 flex items-center justify-center text-[10px] font-bold text-white font-mono">
                                {user.avatar}
                            </div>
                            <div className="hidden xl:block text-left leading-tight">
                                <p className="font-semibold text-white truncate max-w-[120px]">{user.fullName}</p>
                                <p className="text-[10px] text-slate-400 truncate max-w-[120px]">{user.title}</p>
                            </div>
                            <ChevronDown className="size-3 text-slate-400" />
                        </button>

                        {isRoleDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-2 z-50 text-xs text-slate-200">
                                <div className="px-3 py-1.5 border-b border-slate-800">
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                        Active Persona (Demo Mode)
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        dispatch(setUserRole("citi_ops"));
                                        setIsRoleDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-800 transition ${
                                        activeUserRole === "citi_ops" ? "bg-blue-950/60 text-blue-300 font-semibold" : ""
                                    }`}
                                >
                                    <div>
                                        <p className="font-medium">Vikramaditya Roy</p>
                                        <p className="text-[10px] text-slate-400">Citi TTS Ops Lead</p>
                                    </div>
                                    {activeUserRole === "citi_ops" && <Check className="size-3.5 text-blue-400" />}
                                </button>
                                <button
                                    onClick={() => {
                                        dispatch(setUserRole("npci_auditor"));
                                        setIsRoleDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-800 transition ${
                                        activeUserRole === "npci_auditor" ? "bg-blue-950/60 text-blue-300 font-semibold" : ""
                                    }`}
                                >
                                    <div>
                                        <p className="font-medium">Priya Sharma</p>
                                        <p className="text-[10px] text-slate-400">NPCI Settlement Auditor</p>
                                    </div>
                                    {activeUserRole === "npci_auditor" && <Check className="size-3.5 text-blue-400" />}
                                </button>
                                <button
                                    onClick={() => {
                                        dispatch(setUserRole("drunix_dev"));
                                        setIsRoleDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-800 transition ${
                                        activeUserRole === "drunix_dev" ? "bg-blue-950/60 text-blue-300 font-semibold" : ""
                                    }`}
                                >
                                    <div>
                                        <p className="font-medium">Alex Chen</p>
                                        <p className="text-[10px] text-slate-400">Drunix Core Infrastructure</p>
                                    </div>
                                    {activeUserRole === "drunix_dev" && <Check className="size-3.5 text-blue-400" />}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => dispatch(toggleTheme())}
                        className="size-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition"
                        title="Toggle theme"
                    >
                        {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4 text-amber-400" />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
