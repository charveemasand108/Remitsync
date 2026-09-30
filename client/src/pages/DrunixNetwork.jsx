import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setDemoStep,
    setSqlQuery,
    executeSqlQuery
} from "../features/remitsyncSlice";
import {
    DRUNIX_LIFECYCLE_STAGES,
    DRUNIX_PEERS_TOPOLOGY,
    DRUNIX_BLOCKS
} from "../assets/mockDrunixData";
import {
    Cpu,
    ArrowRight,
    CheckCircle2,
    Database,
    ShieldCheck,
    Layers,
    Server,
    Terminal,
    Play,
    GitBranch,
    Search,
    ExternalLink
} from "lucide-react";

const DrunixNetwork = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        drunixBlocks,
        sqlQuery,
        sqlExecutionResult
    } = useSelector((state) => state.remitsync);

    const [selectedStageId, setSelectedStageId] = useState("ENDORSED");
    const [selectedBlockNumber, setSelectedBlockNumber] = useState(481210);

    const activeStage =
        DRUNIX_LIFECYCLE_STAGES.find((s) => s.id === selectedStageId) ||
        DRUNIX_LIFECYCLE_STAGES[1];

    const activeBlock =
        drunixBlocks.find((b) => b.blockNumber === selectedBlockNumber) ||
        drunixBlocks[0];

    const handleRunSql = (e) => {
        e.preventDefault();
        dispatch(executeSqlQuery());
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl sm:text-2xl font-bold text-white font-mono">
                            Drunix Enterprise DLT Network Explorer
                        </h1>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-950 text-blue-300 border border-blue-600">
                            NPCI × CITI ARCHITECTURE
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                        High-throughput permissioned distributed ledger with segregated Lite Peers, Stateless Validation (SVS), and YugabyteDB Distributed SQL.
                    </p>
                </div>

                <button
                    onClick={() => {
                        dispatch(setDemoStep(8));
                        navigate("/reconciliation");
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition"
                >
                    <span>Proceed to Reconciliation (Step 8)</span>
                    <ArrowRight className="size-3.5" />
                </button>
            </div>

            {/* 5-STAGE DRUNIX TRANSACTION LIFECYCLE EXPLORER */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                            The 5-Stage Drunix Lifecycle: Proposed → Endorsed → Ordered → Validated → Committed
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Click any stage to inspect payload execution, cryptographic signatures, and architectural roles.
                        </p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">Endorsement: 2-of-2 Policy</span>
                </div>

                {/* Stage Stepper Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                    {DRUNIX_LIFECYCLE_STAGES.map((stage) => {
                        const isSelected = stage.id === selectedStageId;
                        return (
                            <button
                                key={stage.id}
                                onClick={() => setSelectedStageId(stage.id)}
                                className={`p-3 rounded-lg text-left transition-all border ${
                                    isSelected
                                        ? "bg-blue-950/70 border-blue-500 ring-1 ring-blue-400/50 shadow-md"
                                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-mono text-[10px] text-blue-400 font-bold">
                                        STAGE 0{stage.number}
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-mono">{stage.latency}</span>
                                </div>
                                <h3 className="font-bold text-sm text-white font-mono">{stage.title}</h3>
                                <p className="text-[10px] text-slate-400 truncate mt-0.5">{stage.nodeRole}</p>
                            </button>
                        );
                    })}
                </div>

                {/* Selected Stage Deep-Dive */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                        <div className="flex items-center gap-2">
                            <span className="size-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white font-mono">
                                {activeStage.number}
                            </span>
                            <div>
                                <h4 className="font-bold text-sm text-white font-mono">
                                    Stage {activeStage.number}: {activeStage.title} ({activeStage.subtitle})
                                </h4>
                                <p className="text-xs text-slate-400">Responsible Node: {activeStage.nodeRole}</p>
                            </div>
                        </div>
                        <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-blue-300 font-mono">
                            {activeStage.metric}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                                Architecture Specification
                            </span>
                            <p className="text-slate-300 leading-relaxed">{activeStage.description}</p>
                            <p className="text-slate-400 leading-relaxed">{activeStage.detail}</p>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-[11px] text-slate-300 space-y-1.5">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                                Technical Node Metadata:
                            </span>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Channel ID:</span>
                                <span className="text-white">citi-npci-crossborder-ch1</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Chaincode ID:</span>
                                <span className="text-emerald-400">remitsync-settlement-cc:v2.4</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Execution Mode:</span>
                                <span className="text-slate-300">
                                    {activeStage.id === "ENDORSED"
                                        ? "Lite Peer Sandbox (Stateless)"
                                        : activeStage.id === "VALIDATED"
                                        ? "Stateless Validation Worker (SVS)"
                                        : activeStage.id === "COMMITTED"
                                        ? "YugabyteDB SQL ACID Commit"
                                        : "Standard Drunix Gateway"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Latency:</span>
                                <span className="text-amber-400 font-bold">{activeStage.latency}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEGREGATED PEER ROLES & TOPOLOGY MONITOR */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                            Segregated Drunix Peer Topology & Roles
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Lite Peers (Simulate & Endorse) separated from Committing Peers (YugabyteDB State) & Stateless Validation Workers.
                        </p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700">
                        ALL 6 NODES HEALTHY
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {DRUNIX_PEERS_TOPOLOGY.map((peer) => (
                        <div
                            key={peer.id}
                            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 text-xs space-y-2 hover:border-slate-700 transition"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono font-bold text-white truncate max-w-[170px]">
                                    {peer.id}
                                </span>
                                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-semibold">
                                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    {peer.status}
                                </span>
                            </div>

                            <div>
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-700 font-medium">
                                    {peer.role}
                                </span>
                                <p className="text-[11px] text-slate-400 font-medium mt-1">{peer.organization}</p>
                            </div>

                            <p className="text-[11px] text-slate-400 leading-snug">{peer.roleDescription}</p>

                            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                <span>Loc: {peer.location}</span>
                                <span>Lat: {peer.latency}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* BLOCK EXPLORER & YUGABYTEDB SQL QUERY CONSOLE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left: Block Explorer */}
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Layers className="size-4 text-blue-400" />
                            <h3 className="font-bold text-sm text-white font-mono">
                                Live Drunix Block Explorer
                            </h3>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                            Latest Block: #{drunixBlocks[0]?.blockNumber}
                        </span>
                    </div>

                    {/* Block Picker */}
                    <div className="flex items-center gap-2 overflow-x-auto text-xs">
                        {drunixBlocks.map((blk) => (
                            <button
                                key={blk.blockNumber}
                                onClick={() => setSelectedBlockNumber(blk.blockNumber)}
                                className={`px-3 py-1.5 rounded-lg font-mono font-medium transition ${
                                    selectedBlockNumber === blk.blockNumber
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                                }`}
                            >
                                Block #{blk.blockNumber}
                                {blk.blockNumber === 481210 && " (Recovery)"}
                            </button>
                        ))}
                    </div>

                    {/* Block Details */}
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Block Number:</span>
                            <span className="text-white font-bold">#{activeBlock.blockNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Producer / Orderer:</span>
                            <span className="text-blue-300 truncate max-w-[200px]">{activeBlock.producer}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Transactions:</span>
                            <span className="text-emerald-400 font-bold">{activeBlock.txCount} txs</span>
                        </div>
                        <div>
                            <span className="text-slate-500 block mb-0.5">Block Hash:</span>
                            <span className="text-slate-300 text-[10px] break-all block">
                                {activeBlock.dataHash}
                            </span>
                        </div>
                        <div>
                            <span className="text-slate-500 block mb-0.5">Previous Block Hash:</span>
                            <span className="text-slate-400 text-[10px] break-all block">
                                {activeBlock.prevHash}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: Interactive YugabyteDB Distributed SQL Console */}
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                                <Database className="size-4 text-emerald-400" />
                                <h3 className="font-bold text-sm text-white font-mono">
                                    YugabyteDB SQL Ledger Query Console
                                </h3>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-400">
                                Port: 5433 (PostgreSQL / YSQL)
                            </span>
                        </div>

                        <p className="text-xs text-slate-400 mt-2">
                            Unlike traditional blockchains, Drunix stores world state in YugabyteDB distributed SQL tables.
                        </p>

                        <form onSubmit={handleRunSql} className="mt-3 space-y-2">
                            <textarea
                                value={sqlQuery}
                                onChange={(e) => dispatch(setSqlQuery(e.target.value))}
                                rows={3}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 font-mono text-xs text-blue-300 focus:outline-none focus:border-blue-500 resize-none"
                            />
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] text-slate-500 font-mono">
                                    Querying table: drunix_ledger.remit_settlement
                                </span>
                                <button
                                    type="submit"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition"
                                >
                                    <Play className="size-3.5 fill-white" />
                                    <span>Execute Query</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* SQL Execution Output */}
                    <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
                        <div className="flex items-center justify-between mb-1.5 text-[10px] text-slate-500">
                            <span>Query Result:</span>
                            <span>{sqlExecutionResult ? `${sqlExecutionResult.executionTimeMs}ms` : "Click 'Execute Query'"}</span>
                        </div>

                        {sqlExecutionResult ? (
                            <div className="overflow-x-auto text-[11px]">
                                <table className="w-full text-left">
                                    <thead className="text-slate-400 border-b border-slate-800 text-[10px]">
                                        <tr>
                                            {sqlExecutionResult.columns.map((c) => (
                                                <th key={c} className="p-1 font-bold">{c}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800 text-slate-200">
                                        {sqlExecutionResult.data.map((row, idx) => (
                                            <tr key={idx}>
                                                {row.map((cell, cIdx) => (
                                                    <td key={cIdx} className="p-1 font-medium text-emerald-400">
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-slate-500 text-[11px] italic">
                                Ready to query distributed state table. Click "Execute Query" above.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrunixNetwork;
