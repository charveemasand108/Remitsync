import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setSelectedTxId,
    setDemoStep,
    setNewTransferModalOpen
} from "../features/remitsyncSlice";
import { CORRIDOR_METRICS } from "../assets/mockDrunixData";
import {
    Activity,
    ShieldAlert,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    TrendingUp,
    Cpu,
    ExternalLink,
    Filter,
    Plus,
    AlertTriangle,
    Building2,
    RefreshCw
} from "lucide-react";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { transactions, rsxState } = useSelector((state) => state.remitsync);

    const [statusFilter, setStatusFilter] = useState("ALL");
    const [corridorFilter, setCorridorFilter] = useState("ALL");

    const filteredTransactions = transactions.filter((tx) => {
        if (statusFilter === "FAILED" && !tx.status.includes("FAILED")) return false;
        if (statusFilter === "SETTLED" && !tx.status.includes("SETTLED")) return false;
        if (statusFilter === "IN_FLIGHT" && tx.status !== "IN_FLIGHT") return false;
        if (corridorFilter !== "ALL" && tx.corridor !== corridorFilter) return false;
        return true;
    });

    const handleInspectTx = (txId) => {
        dispatch(setSelectedTxId(txId));
        if (txId === "RSX-928173") {
            dispatch(setDemoStep(2));
        }
        navigate(`/transaction/${txId}`);
    };

    return (
        <div className="space-y-6">
            {/* Top Operations Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
                            Cross-Border Liquidity & Settlement Command Center
                        </h1>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-950 text-blue-300 border border-blue-600">
                            LIVE TESTBED
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                        Continuous telemetry for UAE, Singapore, US, and UK corridors into NPCI clearing rails via Drunix DLT.
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        onClick={() => navigate("/drunix")}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
                    >
                        <Cpu className="size-3.5 text-blue-400" />
                        <span>Drunix Network</span>
                    </button>
                    <button
                        onClick={() => dispatch(setNewTransferModalOpen(true))}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition"
                    >
                        <Plus className="size-3.5" />
                        <span>Dispatch Remittance</span>
                    </button>
                </div>
            </div>

            {/* Institutional Metric KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
                        <span className="font-medium">24h Settlement Volume</span>
                        <TrendingUp className="size-3.5 text-emerald-400" />
                    </div>
                    <p className="text-lg font-bold text-white font-mono">₹412.80M</p>
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400">
                        <span>+14.2% vs 7d avg</span>
                        <span className="text-slate-500 font-mono">(1,420 txs)</span>
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
                        <span className="font-medium">STP Processing Rate</span>
                        <CheckCircle2 className="size-3.5 text-blue-400" />
                    </div>
                    <p className="text-lg font-bold text-white font-mono">99.84%</p>
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-blue-400">
                        <span>SLA Threshold: &gt; 99.5%</span>
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
                        <span className="font-medium">Drunix Finality Latency</span>
                        <Cpu className="size-3.5 text-purple-400" />
                    </div>
                    <p className="text-lg font-bold text-white font-mono">380ms</p>
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400 font-mono">
                        <span>Raft Block Interval</span>
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
                        <span className="font-medium">Nostro Float Protected</span>
                        <Building2 className="size-3.5 text-amber-400" />
                    </div>
                    <p className="text-lg font-bold text-white font-mono">₹84.25M</p>
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-400 font-mono">
                        <span>0 FX Slippage</span>
                    </div>
                </div>

                <div className={`p-4 rounded-xl border shadow-sm transition-all ${
                    rsxState === "recovered"
                        ? "bg-emerald-950/20 border-emerald-800/60"
                        : "bg-rose-950/30 border-rose-700/80 animate-pulse"
                }`}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-medium text-slate-300">Quarantined / Exceptions</span>
                        {rsxState === "recovered" ? (
                            <CheckCircle2 className="size-3.5 text-emerald-400" />
                        ) : (
                            <ShieldAlert className="size-3.5 text-rose-400" />
                        )}
                    </div>
                    <p className={`text-lg font-bold font-mono ${
                        rsxState === "recovered" ? "text-emerald-400" : "text-rose-400"
                    }`}>
                        {rsxState === "recovered" ? "0 Active" : "1 Flagged"}
                    </p>
                    <div className="mt-1 text-[11px]">
                        {rsxState === "recovered" ? (
                            <span className="text-emerald-400 font-medium">All corridors clear</span>
                        ) : (
                            <span className="text-rose-300 font-medium font-mono">RSX-928173 (UAE Corridor)</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Corridors Telemetry Strip */}
            <div>
                <div className="flex items-center justify-between mb-2.5">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                        Active Remittance Corridors & Rail Health
                    </h2>
                    <span className="text-xs text-slate-500">Auto-refresh: 5s</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {CORRIDOR_METRICS.map((corridor) => {
                        const isUae = corridor.id === "uae-inr";
                        const isResolved = isUae && rsxState === "recovered";
                        return (
                            <div
                                key={corridor.id}
                                className={`p-3.5 rounded-xl border bg-slate-900 transition ${
                                    isUae && !isResolved
                                        ? "border-rose-700/80 bg-rose-950/20 ring-1 ring-rose-500/30"
                                        : "border-slate-800 hover:border-slate-700"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-xs text-white">{corridor.corridor}</span>
                                    <span
                                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                                            isUae && !isResolved
                                                ? "bg-rose-950 text-rose-300 border-rose-600"
                                                : "bg-emerald-950 text-emerald-300 border-emerald-700"
                                        }`}
                                    >
                                        {isUae && !isResolved ? "1 ALERT" : "OPTIMAL"}
                                    </span>
                                </div>
                                <div className="space-y-1 text-[11px] text-slate-400">
                                    <div className="flex justify-between">
                                        <span>24h Volume:</span>
                                        <span className="text-slate-200 font-mono font-medium">{corridor.volume24h}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Avg Latency:</span>
                                        <span className="text-slate-200 font-mono">{corridor.avgLatency}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Primary Rail:</span>
                                        <span className="text-slate-300 truncate max-w-[130px]">{corridor.primaryRail}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Real-Time Remittance Ledger Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60">
                    <div>
                        <h2 className="font-semibold text-sm text-white font-mono">
                            Live Remittance Ledger & Drunix Endorsement Stream
                        </h2>
                        <p className="text-xs text-slate-400">
                            Real-time settlement status across domestic Indian destination switches.
                        </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto text-xs">
                        <select
                            value={corridorFilter}
                            onChange={(e) => setCorridorFilter(e.target.value)}
                            aria-label="Filter transactions by corridor"
                            className="bg-slate-800 text-slate-300 border border-slate-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                        >
                            <option value="ALL">All Corridors</option>
                            <option value="UAE_INDIA">UAE → India</option>
                            <option value="SGP_INDIA">Singapore → India</option>
                            <option value="USA_INDIA">USA → India</option>
                            <option value="GBR_INDIA">UK → India</option>
                            <option value="SAU_INDIA">Saudi → India</option>
                        </select>
                        <button
                            onClick={() => setStatusFilter("ALL")}
                            className={`px-2.5 py-1 rounded font-medium transition ${
                                statusFilter === "ALL" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            }`}
                        >
                            All ({transactions.length})
                        </button>
                        <button
                            onClick={() => setStatusFilter("FAILED")}
                            className={`px-2.5 py-1 rounded font-medium transition ${
                                statusFilter === "FAILED" ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            }`}
                        >
                            Exceptions
                        </button>
                        <button
                            onClick={() => setStatusFilter("SETTLED")}
                            className={`px-2.5 py-1 rounded font-medium transition ${
                                statusFilter === "SETTLED" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            }`}
                        >
                            Settled
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-950/90 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800 tracking-wider">
                            <tr>
                                <th className="px-4 py-3">Tx ID / UETR</th>
                                <th className="px-4 py-3">Corridor</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Originator → Beneficiary</th>
                                <th className="px-4 py-3">Clearing Rail</th>
                                <th className="px-4 py-3">Latency</th>
                                <th className="px-4 py-3">Drunix Block</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80">
                            {filteredTransactions.map((tx) => {
                                const isTarget = tx.id === "RSX-928173";
                                const isFailed = tx.status.includes("FAILED");
                                const isRecovered = tx.status === "SETTLED_RECOVERED";

                                return (
                                    <tr
                                        key={tx.id}
                                        onClick={() => handleInspectTx(tx.id)}
                                        className={`cursor-pointer transition-colors ${
                                            isTarget && isFailed
                                                ? "bg-rose-950/30 hover:bg-rose-950/50 ring-1 ring-rose-600/40"
                                                : isTarget && isRecovered
                                                ? "bg-emerald-950/20 hover:bg-emerald-950/40"
                                                : "hover:bg-slate-800/50"
                                        }`}
                                    >
                                        <td className="px-4 py-3">
                                            <div className="font-mono font-bold text-white flex items-center gap-1.5">
                                                <span>{tx.id}</span>
                                                {isTarget && (
                                                    <span className="size-2 rounded-full bg-rose-500 animate-ping" />
                                                )}
                                            </div>
                                            <p className="text-[10px] text-slate-400 font-mono truncate max-w-[130px]">
                                                {tx.uetr}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="font-medium text-slate-200">{tx.corridorLabel}</span>
                                        </td>
                                        <td className="px-4 py-3 font-mono">
                                            <div className="font-bold text-emerald-400">
                                                ₹{Number(tx.destAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                            </div>
                                            <div className="text-[10px] text-slate-400">
                                                {tx.originCurrency} {Number(tx.originAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-slate-200 font-medium truncate max-w-[180px]">{tx.beneficiary.name}</p>
                                            <p className="text-[10px] text-slate-400 truncate max-w-[180px]">From: {tx.originator.name}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-slate-300 font-mono text-[11px]">{tx.rail || tx.initialRoute?.destGateway}</span>
                                        </td>
                                        <td className="px-4 py-3 font-mono">
                                            <span className={isFailed ? "text-rose-400 font-semibold" : "text-slate-300"}>
                                                {tx.latency}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-mono">
                                            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-blue-300 text-[10px]">
                                                #{tx.drunixBlock || 481209}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {isFailed ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-950 border border-rose-600 text-rose-300">
                                                    <AlertTriangle className="size-3 text-rose-400" />
                                                    TIMEOUT / RECOVER
                                                </span>
                                            ) : isRecovered ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-950 border border-emerald-600 text-emerald-300">
                                                    <CheckCircle2 className="size-3 text-emerald-400" />
                                                    SETTLED (RECOVERED)
                                                </span>
                                            ) : tx.status === "IN_FLIGHT" ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-950 border border-amber-600 text-amber-300">
                                                    <Clock className="size-3 text-amber-400" />
                                                    IN FLIGHT
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-800 border border-slate-700 text-slate-300">
                                                    SETTLED
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleInspectTx(tx.id);
                                                }}
                                                className={`px-3 py-1 rounded text-xs font-semibold transition ${
                                                    isTarget && isFailed
                                                        ? "bg-rose-600 hover:bg-rose-500 text-white shadow-sm"
                                                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                                                }`}
                                            >
                                                {isTarget && isFailed ? "Inspect & Recover →" : "Inspect →"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
