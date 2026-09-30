import React from "react";
import { useSelector } from "react-redux";
import { CORRIDOR_METRICS, CORRIDOR_TRANSACTIONS } from "../assets/mockDrunixData";
import {
    Globe2,
    Activity,
    ShieldAlert,
    CheckCircle2,
    ArrowUpRight,
    Zap,
    TrendingUp
} from "lucide-react";

const CorridorsView = () => {
    const { rsxState } = useSelector((state) => state.remitsync);

    const rails = [
        { name: "NPCI UPI-Direct International", status: "OPERATIONAL", latency: "110ms", availability: "99.98%", volume24h: "₹184.2M" },
        { name: "NPCI IMPS Fast Settlement Rail", status: "OPERATIONAL", latency: "95ms", availability: "99.99%", volume24h: "₹142.6M" },
        { name: "RBI RTGS Interbank Highway", status: "DEGRADED (HDFC HUB)", latency: "14,200ms", availability: "88.40%", volume24h: "₹62.1M" },
        { name: "RBI NEFT Hourly Net Clearing", status: "OPERATIONAL", latency: "1,800ms", availability: "99.80%", volume24h: "₹23.9M" }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white font-mono">
                        Global Inbound Corridors & Rail Health Matrix
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Monitoring liquidity gateways across UAE, Singapore, United States, and United Kingdom corridors into India.
                    </p>
                </div>
            </div>

            {/* Corridor Health Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {CORRIDOR_METRICS.map((corridor) => {
                    const isUae = corridor.id === "uae-inr";
                    const isResolved = isUae && rsxState === "recovered";
                    return (
                        <div
                            key={corridor.id}
                            className={`p-4 rounded-xl border bg-slate-900 space-y-3 ${
                                isUae && !isResolved
                                    ? "border-rose-600/80 bg-rose-950/20"
                                    : "border-slate-800"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm text-white">{corridor.corridor}</h3>
                                <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                                        isUae && !isResolved
                                            ? "bg-rose-950 text-rose-300 border-rose-600"
                                            : "bg-emerald-950 text-emerald-300 border-emerald-700"
                                    }`}
                                >
                                    {isUae && !isResolved ? "1 STALLED (RECOVERY READY)" : "OPTIMAL"}
                                </span>
                            </div>

                            <div className="space-y-1.5 text-xs text-slate-400">
                                <div className="flex justify-between">
                                    <span>24h Volume:</span>
                                    <span className="text-white font-mono font-semibold">{corridor.volume24h}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Avg Finality:</span>
                                    <span className="text-slate-200 font-mono">{corridor.avgLatency}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>STP Success Rate:</span>
                                    <span className="text-emerald-400 font-mono font-medium">{corridor.stpRate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Active Transactions:</span>
                                    <span className="text-slate-200 font-mono">{corridor.activeTxs} txs</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Destination Clearing Switch Performance */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Domestic Indian Destination Switches & Inbound Rail Telemetry
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {rails.map((rail, idx) => (
                        <div key={idx} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/90 space-y-1.5">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-white">{rail.name}</span>
                                <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold border ${
                                    rail.status.includes("DEGRADED")
                                        ? "bg-rose-950 text-rose-300 border-rose-600"
                                        : "bg-emerald-950 text-emerald-300 border-emerald-700"
                                }`}>
                                    {rail.status}
                                </span>
                            </div>
                            <div className="flex justify-between text-slate-400 text-[11px]">
                                <span>Latency: <strong className="text-slate-200 font-mono">{rail.latency}</strong></span>
                                <span>Availability: <strong className="text-slate-200 font-mono">{rail.availability}</strong></span>
                                <span>24h Flow: <strong className="text-slate-200 font-mono">{rail.volume24h}</strong></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CorridorsView;
