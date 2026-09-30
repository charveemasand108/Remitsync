import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    startRecovery,
    advanceRecoveryStep,
    completeRecovery,
    setDemoStep,
    openIsoModal
} from "../features/remitsyncSlice";
import { INITIAL_TRANSACTION_RSX928173 } from "../assets/mockDrunixData";
import {
    ArrowLeft,
    ShieldAlert,
    CheckCircle2,
    Clock,
    Cpu,
    ArrowRight,
    Building2,
    FileCode,
    Zap,
    AlertTriangle,
    Terminal,
    Lock,
    ExternalLink,
    Check,
    RefreshCw,
    ShieldCheck
} from "lucide-react";

const TransactionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        rsxState,
        recoveryLog,
        demoStep
    } = useSelector((state) => state.remitsync);

    const tx = INITIAL_TRANSACTION_RSX928173;
    const isTarget = tx.id === (id || "RSX-928173");
    const [isExecutingRecovery, setIsExecutingRecovery] = useState(false);

    // Update demo step when entering page
    useEffect(() => {
        if (isTarget) {
            if (rsxState === "initial" && demoStep < 3) {
                dispatch(setDemoStep(3));
            } else if (rsxState === "recovered" && demoStep < 6) {
                dispatch(setDemoStep(6));
            }
        }
    }, [isTarget, rsxState, demoStep, dispatch]);

    // Handle "Run Recovery" execution sequence
    const handleRunRecovery = () => {
        setIsExecutingRecovery(true);
        dispatch(setDemoStep(5));
        dispatch(startRecovery());

        const steps = [
            {
                delay: 600,
                index: 2,
                msg: "Requesting 2-of-2 multisig endorsements from Drunix Lite Peers (lite-peer0.citi.ae + lite-peer1.npci.in)..."
            },
            {
                delay: 1300,
                index: 3,
                msg: "Endorsements verified. Submitting proposal to Raft Orderer (orderer0.drunix.citigroup.com) for Block #481210 assembly..."
            },
            {
                delay: 2000,
                index: 4,
                msg: "Stateless Validation Service (SVS) cluster verified read-write versions. Anti-double-spend lock: PASS."
            },
            {
                delay: 2700,
                index: 5,
                msg: "Autonomous failover triggered: Dispatching instant payment to NPCI IMPS Switch via Citi Direct Node..."
            },
            {
                delay: 3400,
                index: 6,
                msg: "NPCI RRN 429188201948 acknowledged. Committing peer written to YugabyteDB SQL table drunix_ledger.remit_settlement."
            }
        ];

        steps.forEach(({ delay, index, msg }) => {
            setTimeout(() => {
                dispatch(advanceRecoveryStep({ stepIndex: index, logMessage: msg }));
            }, delay);
        });

        setTimeout(() => {
            dispatch(completeRecovery());
            setIsExecutingRecovery(false);
            dispatch(setDemoStep(6));
        }, 4000);
    };

    return (
        <div className="space-y-6">
            {/* Top Navigation & Transaction Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/")}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                    >
                        <ArrowLeft className="size-4" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-xl sm:text-2xl font-bold text-white font-mono">{tx.id}</h1>
                            {rsxState === "recovered" ? (
                                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-emerald-950 border border-emerald-600 text-emerald-300">
                                    <CheckCircle2 className="size-3.5 text-emerald-400" />
                                    SETTLED (RECOVERED)
                                </span>
                            ) : rsxState === "recovering" ? (
                                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-amber-950 border border-amber-600 text-amber-300 animate-pulse">
                                    <Cpu className="size-3.5 text-amber-400" />
                                    RECOVERY IN PROGRESS
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-rose-950 border border-rose-600 text-rose-300">
                                    <AlertTriangle className="size-3.5 text-rose-400" />
                                    DESTINATION TIMEOUT / RECOVERY REQUIRED
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                            UETR: {tx.uetr} • Channel: {tx.drunixState.channel}
                        </p>
                    </div>
                </div>

                {/* ISO Payload Inspector Button */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => dispatch(openIsoModal("pacs008"))}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs font-medium transition"
                    >
                        <FileCode className="size-3.5 text-blue-400" />
                        <span>Inspect ISO 20022</span>
                    </button>
                    {rsxState === "recovered" && (
                        <button
                            onClick={() => {
                                dispatch(setDemoStep(7));
                                navigate("/drunix");
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition"
                        >
                            <span>Drunix Network (Step 7)</span>
                            <ArrowRight className="size-3.5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Core 6-Stage Flow Pipeline */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                        Core Remittance Flow Pipeline (6 Stages)
                    </h2>
                    <span className="text-[11px] text-slate-500 font-mono">
                        Validate → Route → Monitor → Diagnose → Recover → Reconcile
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                    {/* Stage 1: Validate */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-emerald-900/60 text-xs">
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[10px] text-emerald-400 font-bold">STAGE 01</span>
                            <CheckCircle2 className="size-3.5 text-emerald-400" />
                        </div>
                        <p className="font-semibold text-white">Validate</p>
                        <p className="text-[10px] text-slate-400 mt-1">AML Risk 0.02 • KYC Passed</p>
                        <div className="mt-2 text-[10px] font-mono text-emerald-300">COMPLETED</div>
                    </div>

                    {/* Stage 2: Route */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-blue-900/60 text-xs">
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[10px] text-blue-400 font-bold">STAGE 02</span>
                            <CheckCircle2 className="size-3.5 text-blue-400" />
                        </div>
                        <p className="font-semibold text-white">Route</p>
                        <p className="text-[10px] text-slate-400 mt-1">
                            {rsxState === "recovered" ? "NPCI IMPS Switch" : "HDFC RTGS Hub"}
                        </p>
                        <div className="mt-2 text-[10px] font-mono text-blue-300">
                            {rsxState === "recovered" ? "REROUTED" : "INITIATED"}
                        </div>
                    </div>

                    {/* Stage 3: Monitor */}
                    <div className={`p-3 rounded-lg bg-slate-950 border text-xs ${
                        rsxState === "recovered"
                            ? "border-emerald-900/60"
                            : "border-rose-700/80 bg-rose-950/20 ring-1 ring-rose-500/30"
                    }`}>
                        <div className="flex items-center justify-between mb-1">
                            <span className={`font-mono text-[10px] font-bold ${
                                rsxState === "recovered" ? "text-emerald-400" : "text-rose-400"
                            }`}>STAGE 03</span>
                            {rsxState === "recovered" ? (
                                <CheckCircle2 className="size-3.5 text-emerald-400" />
                            ) : (
                                <AlertTriangle className="size-3.5 text-rose-400" />
                            )}
                        </div>
                        <p className="font-semibold text-white">Monitor</p>
                        <p className="text-[10px] text-slate-400 mt-1">
                            {rsxState === "recovered" ? "Latency: 180ms" : "Latency: 14,200ms (Drop)"}
                        </p>
                        <div className={`mt-2 text-[10px] font-mono ${
                            rsxState === "recovered" ? "text-emerald-300" : "text-rose-400 font-bold"
                        }`}>
                            {rsxState === "recovered" ? "HEALTHY" : "DEST_TIMEOUT"}
                        </div>
                    </div>

                    {/* Stage 4: Diagnose */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-purple-900/60 text-xs">
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[10px] text-purple-400 font-bold">STAGE 04</span>
                            <CheckCircle2 className="size-3.5 text-purple-400" />
                        </div>
                        <p className="font-semibold text-white">Diagnose</p>
                        <p className="text-[10px] text-slate-400 mt-1">Switch Down • 0 FX Risk</p>
                        <div className="mt-2 text-[10px] font-mono text-purple-300">CONFIRMED (99.4%)</div>
                    </div>

                    {/* Stage 5: Recover */}
                    <div className={`p-3 rounded-lg bg-slate-950 border text-xs ${
                        rsxState === "recovered"
                            ? "border-emerald-700 bg-emerald-950/20"
                            : rsxState === "recovering"
                            ? "border-amber-600 bg-amber-950/20 animate-pulse"
                            : "border-slate-800"
                    }`}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[10px] text-amber-400 font-bold">STAGE 05</span>
                            {rsxState === "recovered" ? (
                                <CheckCircle2 className="size-3.5 text-emerald-400" />
                            ) : (
                                <Zap className="size-3.5 text-amber-400" />
                            )}
                        </div>
                        <p className="font-semibold text-white">Recover</p>
                        <p className="text-[10px] text-slate-400 mt-1">
                            {rsxState === "recovered" ? "Drunix Block #481210" : "Ready to Trigger"}
                        </p>
                        <div className={`mt-2 text-[10px] font-mono ${
                            rsxState === "recovered"
                                ? "text-emerald-300 font-bold"
                                : rsxState === "recovering"
                                ? "text-amber-300 font-bold"
                                : "text-slate-400"
                        }`}>
                            {rsxState === "recovered" ? "SETTLED" : rsxState === "recovering" ? "RUNNING..." : "ACTION REQUIRED"}
                        </div>
                    </div>

                    {/* Stage 6: Reconcile */}
                    <div className={`p-3 rounded-lg bg-slate-950 border text-xs ${
                        rsxState === "recovered"
                            ? "border-emerald-700 bg-emerald-950/20"
                            : "border-slate-800"
                    }`}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[10px] text-blue-400 font-bold">STAGE 06</span>
                            {rsxState === "recovered" && <CheckCircle2 className="size-3.5 text-emerald-400" />}
                        </div>
                        <p className="font-semibold text-white">Reconcile</p>
                        <p className="text-[10px] text-slate-400 mt-1">3-Way Match vs Nostro</p>
                        <div className={`mt-2 text-[10px] font-mono ${
                            rsxState === "recovered" ? "text-emerald-300 font-bold" : "text-slate-400"
                        }`}>
                            {rsxState === "recovered" ? "100% MATCHED (₹0)" : "PENDING RECOVERY"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Overview & Participants */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left: Originator & Route */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                            Originator (Debtor)
                        </span>
                        <span className="text-xs font-bold text-slate-300">UAE 🇦🇪</span>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">{tx.originator.name}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{tx.originator.bank}</p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">{tx.originator.accountNumber}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Debit Amount:</span>
                            <span className="font-mono font-semibold text-white">
                                AED {tx.originAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Locked FX Rate:</span>
                            <span className="font-mono text-emerald-400">22.8275 INR/AED</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Origin Clearing Rail:</span>
                            <span className="text-slate-300 font-mono text-[11px]">{tx.initialRoute.originRail}</span>
                        </div>
                    </div>
                </div>

                {/* Center: Conversion & Core Settlement Amount */}
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-cyan-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                        Settlement Payout (Beneficiary Credit)
                    </span>

                    <div className="my-3">
                        <p className="text-3xl font-extrabold text-emerald-400 font-mono">
                            ₹{tx.destAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 font-mono">
                            = AED {tx.originAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })} @ 22.8275
                        </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] space-y-1 text-slate-400">
                        <div className="flex justify-between">
                            <span>Drunix Smart Contract:</span>
                            <span className="font-mono text-blue-300">remitsync-settlement-cc</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Nostro Guarantee Pool:</span>
                            <span className="font-mono text-emerald-300">CITI-NOSTRO-INR-09</span>
                        </div>
                    </div>
                </div>

                {/* Right: Beneficiary (Creditor) */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                            Beneficiary (Creditor)
                        </span>
                        <span className="text-xs font-bold text-slate-300">India 🇮🇳</span>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">{tx.beneficiary.name}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{tx.beneficiary.bank}</p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                            A/C: {tx.beneficiary.accountNumber} • IFSC: {tx.beneficiary.ifsc}
                        </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                            <span>Payout Rail:</span>
                            <span className="font-mono text-slate-200">
                                {rsxState === "recovered"
                                    ? "NPCI IMPS (Citi Direct Node)"
                                    : "HDFC RTGS Hub (Stalled)"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Beneficiary City:</span>
                            <span className="text-slate-300">{tx.beneficiary.city}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Beneficiary VPA:</span>
                            <span className="text-slate-300 font-mono text-[11px]">{tx.beneficiary.upiId}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAILURE DIAGNOSTIC OR RECOVERY SUCCEEDED BANNER */}
            {rsxState === "initial" && (
                <div className="p-4 sm:p-5 rounded-xl bg-rose-950/30 border border-rose-600/70 shadow-lg text-slate-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-rose-900/60 border border-rose-500 text-rose-300 mt-0.5">
                                <AlertTriangle className="size-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-white text-sm sm:text-base font-mono">
                                        Deliberate Failure Alert: Destination Gateway Timeout
                                    </h3>
                                    <span className="px-2 py-0.5 rounded font-mono text-[11px] bg-rose-900/80 border border-rose-500 text-rose-200 font-bold">
                                        {tx.failureDetails.errorCode}
                                    </span>
                                </div>
                                <p className="text-xs text-rose-200/90 mt-1">
                                    {tx.failureDetails.failingNode} exceeded response SLA: recorded latency{" "}
                                    <span className="font-mono font-bold text-white">{tx.failureDetails.latencyRecorded}</span> (SLA limit: {tx.failureDetails.slaThreshold}).
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => dispatch(openIsoModal("pacs002_failure"))}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-900/50 hover:bg-rose-900 border border-rose-600 text-rose-200 text-xs font-semibold shrink-0 transition"
                        >
                            <FileCode className="size-3.5 text-rose-300" />
                            <span>Inspect pacs.002 Rejection</span>
                        </button>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/80 border border-rose-900/60 text-xs font-mono text-rose-300">
                        <code>{tx.failureDetails.rawStatusReason}</code>
                    </div>
                </div>
            )}

            {/* AI OPERATIONAL DIAGNOSIS CARD */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
                            <Cpu className="size-4" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-sm text-white font-mono">
                                    Operational AI Diagnostician & Root Cause Telemetry
                                </h3>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-700">
                                    Confidence: 99.4%
                                </span>
                            </div>
                            <p className="text-xs text-slate-400">
                                Real-time clearing rail heartbeat analysis & Nostro liquidity telemetry
                            </p>
                        </div>
                    </div>

                    <span className="text-[11px] text-slate-400 font-mono">Engine: remitsync-ai-v3</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                            Root Cause Analysis
                        </span>
                        <p className="text-slate-200 font-medium mt-1">
                            {tx.aiDiagnosis.primaryIssue}
                        </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                            Nostro Liquidity Status
                        </span>
                        <p className="text-emerald-300 font-medium mt-1">
                            {tx.aiDiagnosis.liquidityStatus}
                        </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                            FX Rate Protection
                        </span>
                        <p className="text-slate-200 font-medium mt-1">
                            {tx.aiDiagnosis.fxRisk}
                        </p>
                    </div>
                </div>

                {/* Available Alternate Rails Comparison Table */}
                <div>
                    <h4 className="text-xs font-semibold text-slate-300 mb-2 font-mono">
                        Available Destination Rails Evaluation:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        {tx.aiDiagnosis.alternativeRails.map((rail, idx) => (
                            <div
                                key={idx}
                                className={`p-3 rounded-lg border text-xs ${
                                    rail.recommended
                                        ? "bg-blue-950/30 border-blue-600 ring-1 ring-blue-500/30"
                                        : "bg-slate-950 border-slate-800"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-white">{rail.name}</span>
                                    {rail.recommended && (
                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-600 text-white font-bold">
                                            RECOMMENDED
                                        </span>
                                    )}
                                </div>
                                <div className="space-y-0.5 text-[11px] text-slate-400">
                                    <div className="flex justify-between">
                                        <span>Status:</span>
                                        <span className={rail.status === "OPTIMAL" ? "text-emerald-400 font-mono font-medium" : "text-amber-400 font-mono"}>
                                            {rail.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Latency:</span>
                                        <span className="text-slate-200 font-mono">{rail.latency}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Success Rate:</span>
                                        <span className="text-slate-200 font-mono">{rail.successRate}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ACTION TRIGGER BUTTON: RUN RECOVERY */}
                {rsxState === "initial" && (
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-blue-950/50 border border-blue-600/70">
                        <div>
                            <h4 className="font-bold text-white text-sm">
                                Autonomous Recovery Plan Ready (Step 5 of Demo)
                            </h4>
                            <p className="text-xs text-blue-200/80 mt-0.5">
                                Re-route via NPCI IMPS Clearing Rail (Citi Direct Gateway Node). Signs 2-of-2 Drunix Lite Peer multisig.
                            </p>
                        </div>

                        <button
                            onClick={handleRunRecovery}
                            disabled={isExecutingRecovery}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold shadow-lg shadow-blue-900/50 transition shrink-0 animate-bounce"
                        >
                            <Zap className="size-4 fill-white" />
                            <span>Run Recovery</span>
                        </button>
                    </div>
                )}
            </div>

            {/* LIVE RECOVERY EXECUTION TERMINAL (WHEN RECOVERING OR RECOVERED) */}
            {(rsxState === "recovering" || rsxState === "recovered") && (
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <Terminal className="size-4 text-emerald-400" />
                            <h3 className="font-mono text-sm font-semibold text-white">
                                Drunix Autonomous Recovery Execution Terminal
                            </h3>
                        </div>
                        <span className="font-mono text-xs text-emerald-400">
                            {rsxState === "recovered" ? "STATUS: COMMITTED" : "EXECUTING..."}
                        </span>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 space-y-2 border border-slate-800/80 max-h-64 overflow-y-auto">
                        {recoveryLog.map((log) => (
                            <div key={log.id} className="flex items-start gap-2">
                                <span className="text-emerald-400 font-bold">▶</span>
                                <span className="text-slate-200">{log.text}</span>
                            </div>
                        ))}
                        {isExecutingRecovery && (
                            <div className="flex items-center gap-2 text-amber-400 animate-pulse">
                                <span className="size-2 rounded-full bg-amber-400" />
                                <span>Awaiting Drunix consensus endorsement & block sequencing...</span>
                            </div>
                        )}
                    </div>

                    {rsxState === "recovered" && (
                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <CheckCircle2 className="size-4" />
                                <span className="font-semibold">
                                    Recovery Succeeded. Drunix Block #481210 Committed.
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => dispatch(openIsoModal("pacs004_recovery"))}
                                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition"
                                >
                                    View pacs.004
                                </button>
                                <button
                                    onClick={() => {
                                        dispatch(setDemoStep(7));
                                        navigate("/drunix");
                                    }}
                                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition flex items-center gap-1.5 shadow-sm"
                                >
                                    <span>Open Drunix Network (Step 7)</span>
                                    <ArrowRight className="size-3.5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* DRUNIX CRYPTOGRAPHIC PROOF CARD (WHEN RECOVERED) */}
            {rsxState === "recovered" && (
                <div className="p-5 rounded-xl bg-slate-900 border border-emerald-800/60 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="size-5 text-emerald-400" />
                            <div>
                                <h3 className="font-bold text-sm text-white font-mono">
                                    Drunix Cryptographic Proof & Consensus Record
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Immutable proof logged on NPCI Drunix distributed ledger
                                </p>
                            </div>
                        </div>
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600">
                            VERIFIED (2/2 SIGNATURES)
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                            <span className="text-slate-400 text-[10px] uppercase">Committed Block Number:</span>
                            <p className="text-blue-300 font-bold text-sm">#481210</p>
                            <span className="text-slate-500 text-[10px] truncate block">
                                Merkle Root: 0x7f3c9a18d99e0481b7e012984ac73910eb672901a8ef109284729104829104bc
                            </span>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                            <span className="text-slate-400 text-[10px] uppercase">Transaction Hash (TxID):</span>
                            <p className="text-emerald-300 font-bold truncate">
                                0x89f41b9c24018e6a17b049382104d8ef2718903c5b81a2e9471f40294716bc2a
                            </p>
                            <span className="text-slate-500 text-[10px] block">
                                SVS Validation Time: 14ms • YugabyteDB Commit: 22ms
                            </span>
                        </div>
                    </div>

                    {/* Endorsement Peers */}
                    <div>
                        <h4 className="text-xs font-semibold text-slate-300 mb-2 font-mono">
                            Multi-Signature Endorsements:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                            {tx.drunixState.endorsements.map((peer, idx) => (
                                <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-200 font-medium">{peer.peer}</p>
                                        <p className="text-[10px] text-slate-400">{peer.org}</p>
                                    </div>
                                    <span className="text-emerald-400 font-semibold text-[11px]">SIGNED ✓</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionDetail;
