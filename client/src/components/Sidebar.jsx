import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openIsoModal, setNewTransferModalOpen } from "../features/remitsyncSlice";
import {
    LayoutDashboard,
    SearchCheck,
    Cpu,
    GitCompare,
    Globe2,
    Code2,
    ShieldAlert,
    CheckCircle2,
    FileCode,
    PlusCircle,
    ExternalLink
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const sidebarRef = useRef(null);
    const dispatch = useDispatch();
    const { rsxState } = useSelector((state) => state.remitsync);

    const navItems = [
        {
            name: "Overview",
            href: "/",
            icon: LayoutDashboard,
            badge: null
        },
        {
            name: "Transaction Inspector",
            href: "/transaction/RSX-928173",
            icon: SearchCheck,
            badge: rsxState === "recovered" ? "Settled" : "Alert",
            badgeColor: rsxState === "recovered" ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-rose-950 text-rose-300 border-rose-700"
        },
        {
            name: "Drunix Network",
            href: "/drunix",
            icon: Cpu,
            badge: "DLT v2.4",
            badgeColor: "bg-blue-950 text-blue-300 border-blue-700"
        },
        {
            name: "Reconciliation",
            href: "/reconciliation",
            icon: GitCompare,
            badge: "3-Way Match",
            badgeColor: "bg-purple-950 text-purple-300 border-purple-700"
        },
        {
            name: "Corridors & Rails",
            href: "/corridors",
            icon: Globe2,
            badge: "5 Corridors",
            badgeColor: "bg-slate-800 text-slate-300 border-slate-700"
        },
        {
            name: "Drunix SDK Hub",
            href: "/integration",
            icon: Code2,
            badge: "API / gRPC",
            badgeColor: "bg-amber-950 text-amber-300 border-amber-700"
        }
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsSidebarOpen]);

    return (
        <aside
            ref={sidebarRef}
            className={`z-40 bg-slate-900 border-r border-slate-800 w-64 flex flex-col h-screen max-lg:fixed max-lg:top-0 transition-all duration-300 ${
                isSidebarOpen ? "left-0" : "max-lg:-left-full"
            }`}
        >
            {/* Top Workspace Header */}
            <div className="p-4 border-b border-slate-800">
                <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="size-8 rounded bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white text-xs font-mono">
                        TTS
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">Citi TTS UAE Corridor</p>
                        <p className="text-[10px] text-slate-400 font-mono truncate">Org: citi-npci-ch1</p>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto no-scrollbar">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Platform Navigation
                </div>

                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                isActive
                                    ? "bg-blue-600/20 text-blue-300 border border-blue-500/40 font-semibold"
                                    : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                            }`
                        }
                    >
                        <div className="flex items-center gap-2.5">
                            <item.icon className="size-4 shrink-0" />
                            <span>{item.name}</span>
                        </div>
                        {item.badge && (
                            <span
                                className={`text-[10px] px-1.5 py-0.5 rounded border font-mono font-medium ${item.badgeColor}`}
                            >
                                {item.badge}
                            </span>
                        )}
                    </NavLink>
                ))}

                <div className="pt-4 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Quick Operations
                </div>

                <button
                    onClick={() => dispatch(setNewTransferModalOpen(true))}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 transition"
                >
                    <PlusCircle className="size-4 text-emerald-400" />
                    <span>Dispatch Remittance</span>
                </button>

                <button
                    onClick={() => dispatch(openIsoModal("pacs008"))}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 transition"
                >
                    <FileCode className="size-4 text-blue-400" />
                    <span>ISO 20022 Payloads</span>
                </button>
            </nav>

            {/* Bottom Status Card */}
            <div className="p-3 border-t border-slate-800 bg-slate-950/60">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-mono">Drunix State:</span>
                        <span className="text-emerald-400 font-semibold font-mono">SYNCHRONIZED</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-mono">YugabyteDB:</span>
                        <span className="text-blue-300 font-mono">3/3 Nodes</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-mono">Lite Peers:</span>
                        <span className="text-slate-200 font-mono">8 Active</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
