import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    toggleBreakSimulation,
    openIsoModal,
    resetDemoScenario
} from "../features/remitsyncSlice";
import { RECONCILIATION_DATA } from "../assets/mockDrunixData";
import {
    GitCompare,
    CheckCircle2,
    ShieldAlert,
    Download,
    FileCode,
    RotateCcw,
    Layers,
    Building2,
    Cpu,
    ArrowRight,
    Check,
    Zap,
    Scale
} from "lucide-react";

const Reconciliation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSimulatingBreak } = useSelector((state) => state.remitsync);

    const isBalanced = !isSimulatingBreak;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl sm:text-2xl font-bold text-white font-mono">
                            Autonomous Three-Way Reconciliation Engine
                        </h1>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-purple-950 text-purple-300 border border-purple-600">
                            STEP 8 OF DEMO
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                        Continuous cross-system consistency verification across Citi TTS Core, Drunix DLT, and NPCI National Clearing Switch.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => dispatch(openIsoModal("camt053"))}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs font-medium transition"
                    >
                        <FileCode className="size-3.5 text-blue-400" />
                        <span>Inspect camt.053</span>
                    </button>
                    <button
                        onClick={() => dispatch(toggleBreakSimulation())}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                            isSimulatingBreak
                                ? "bg-amber-600 text-white border-amber-500 shadow-md"
                                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                        }`}
                    >
                        <Zap className="size-3.5" />
                        <span>{isSimulatingBreak ? "Disable Break Simulation" : "Simulate Clearing Break"}</span>
                    </button>
                </div>
            </div>

            {/* Reconciliation KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-400 font-medium">Three-Way Match Rate</span>
                    <p className={`text-xl font-bold font-mono mt-1 ${isBalanced ? "text-emerald-400" : "text-amber-400"}`}>
                        {isBalanced ? "100.00%" : "99.28% (Break Flagged)"}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                        {isBalanced ? "All 1,420 transactions in sync" : "1 unacknowledged Nostro mismatch"}
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-400 font-medium">Net Nostro Variance</span>
                    <p className={`text-xl font-bold font-mono mt-1 ${isBalanced ? "text-white" : "text-rose-400"}`}>
                        {isBalanced ? "₹0.00 (Zero Drift)" : "₹75,000.00 (Suspense)"}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                        Pool: CITI-NOSTRO-INR-09
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-400 font-medium">Total Volume Reconciled</span>
                    <p className="text-xl font-bold font-mono text-white mt-1">₹412.80M</p>
                    <p className="text-[11px] text-emerald-400 mt-1">Daily settlement window balanced</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-400 font-medium">Drunix Ledger State</span>
                    <p className="text-xl font-bold font-mono text-blue-400 mt-1">IMMUTABLE</p>
                    <p className="text-[11px] text-slate-500 mt-1">Block #481210 Committed</p>
                </div>
            </div>

            {/* BREAK SIMULATION ALERT (IF ACTIVE) */}
            {isSimulatingBreak && (
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/70 text-slate-200 flex items-start gap-3 shadow-lg">
                    <div className="p-2 rounded-lg bg-amber-900/60 border border-amber-500 text-amber-300 shrink-0">
                        <ShieldAlert className="size-5" />
                    </div>
                    <div className="text-xs space-y-1">
                        <h4 className="font-bold text-white text-sm font-mono">
                            Simulation Alert: Nostro Ledger Mismatch Injected
                        </h4>
                        <p className="text-amber-200/90 leading-relaxed">
                            Simulating an unacknowledged debit on secondary clearing switch. RemitSync automatically queries Drunix YugabyteDB block #481210 and initiates automated auto-healing reconciliation protocol.
                        </p>
                    </div>
                </div>
            )}

            {/* THREE-SYSTEM CONSISTENCY COMPARISON MATRIX */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                            Three-Way System Consistency Audit: Transaction RSX-928173
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Real-time reconciliation of origin debit, Drunix immutable commit, and destination credit.
                        </p>
                    </div>

                    <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${
                        isBalanced
                            ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                            : "bg-rose-950 text-rose-300 border-rose-600"
                    }`}>
                        {isBalanced ? "3/3 MATCHED • ZERO VARIANCE" : "SUSPENSE RECORD DETECTED"}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {/* System 1: Citi TTS Core */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2.5">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-blue-400 font-bold uppercase">
                                System 1: Debtor Ledger
                            </span>
                            <Building2 className="size-4 text-blue-400" />
                        </div>
                        <h3 className="font-bold text-white text-sm">Citi TTS Core Banking</h3>
                        <p className="text-slate-400 text-[11px]">Nostro Account: CITI-NOSTRO-INR-09</p>

                        <div className="pt-2 border-t border-slate-800/80 space-y-1 font-mono text-[11px]">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Debit Amount:</span>
                                <span className="text-white font-bold">₹75,000.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Status:</span>
                                <span className="text-emerald-400">CLEARED_DEBIT</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Reference:</span>
                                <span className="text-slate-300 truncate max-w-[130px]">CITI-TTS-AE-928173</span>
                            </div>
                        </div>
                    </div>

                    {/* System 2: Drunix DLT */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-blue-900/60 text-xs space-y-2.5 ring-1 ring-blue-500/20">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase">
                                System 2: Truth Anchor
                            </span>
                            <Cpu className="size-4 text-emerald-400" />
                        </div>
                        <h3 className="font-bold text-white text-sm">Drunix Distributed Ledger</h3>
                        <p className="text-slate-400 text-[11px]">YugabyteDB Block #481210</p>

                        <div className="pt-2 border-t border-slate-800/80 space-y-1 font-mono text-[11px]">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Committed Amount:</span>
                                <span className="text-emerald-400 font-bold">₹75,000.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Consensus Status:</span>
                                <span className="text-emerald-400">COMMITTED_RECOVERED</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Tx Hash:</span>
                                <span className="text-slate-300 truncate max-w-[130px]">0x89f41b...bc2a</span>
                            </div>
                        </div>
                    </div>

                    {/* System 3: NPCI Clearing Gateway */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2.5">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-purple-400 font-bold uppercase">
                                System 3: Creditor Switch
                            </span>
                            <Scale className="size-4 text-purple-400" />
                        </div>
                        <h3 className="font-bold text-white text-sm">NPCI Clearing Gateway</h3>
                        <p className="text-slate-400 text-[11px]">National Switch IMPS Node</p>

                        <div className="pt-2 border-t border-slate-800/80 space-y-1 font-mono text-[11px]">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Credited Amount:</span>
                                <span className="text-white font-bold">
                                    {isBalanced ? "₹75,000.00" : "₹0.00 (Pending Ack)"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Switch Status:</span>
                                <span className={isBalanced ? "text-emerald-400" : "text-rose-400 font-bold"}>
                                    {isBalanced ? "CREDIT_CONFIRMED" : "HOLD_SUSPENSE"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">RRN:</span>
                                <span className="text-slate-300">429188201948</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DEMO COMPLETION CELEBRATION & NEXT STEPS */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-700/60 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mt-1">
                            <CheckCircle2 className="size-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-base sm:text-lg text-white font-mono">
                                REMITSYNC Hackathon Demo Complete (Steps 1 → 8 Verified)
                            </h3>
                            <p className="text-xs text-slate-300 mt-1 max-w-xl">
                                You have demonstrated the complete end-to-end lifecycle: Destination Switch Timeout → AI Operational Diagnosis → Autonomous Drunix Recovery → Drunix 5-Stage Consensus → Three-Way Balanced Reconciliation.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={() => {
                                dispatch(resetDemoScenario());
                                navigate("/");
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition"
                        >
                            <RotateCcw className="size-3.5" />
                            <span>Reset Demo Scenario</span>
                        </button>

                        <button
                            onClick={() => navigate("/integration")}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition"
                        >
                            <span>Drunix SDK Hub</span>
                            <ArrowRight className="size-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reconciliation;
