import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeIsoModal, openIsoModal } from "../features/remitsyncSlice";
import { ISO_20022_MESSAGES } from "../assets/mockDrunixData";
import { X, Copy, Check, FileCode, CheckCircle, AlertTriangle } from "lucide-react";

const IsoMessageModal = () => {
    const dispatch = useDispatch();
    const { isIsoModalOpen, activeIsoMessageType } = useSelector((state) => state.remitsync);
    const [copied, setCopied] = React.useState(false);

    if (!isIsoModalOpen) return null;

    const message = ISO_20022_MESSAGES[activeIsoMessageType] || ISO_20022_MESSAGES.pacs008;

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-3xl w-full flex flex-col max-h-[85vh] overflow-hidden text-slate-100">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
                            <FileCode className="size-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-base text-white">{message.name}</h3>
                                <span className="px-2 py-0.5 rounded font-mono text-xs bg-slate-800 text-blue-300 border border-slate-700">
                                    {message.type}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{message.description}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => dispatch(closeIsoModal())}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Tabs for switching message */}
                <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-900/90 border-b border-slate-800 overflow-x-auto text-xs">
                    <button
                        onClick={() => dispatch(openIsoModal("pacs008"))}
                        className={`px-3 py-1.5 rounded font-medium transition ${
                            activeIsoMessageType === "pacs008"
                                ? "bg-blue-600 text-white"
                                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                    >
                        pacs.008 (Transfer Initiation)
                    </button>
                    <button
                        onClick={() => dispatch(openIsoModal("pacs002_failure"))}
                        className={`px-3 py-1.5 rounded font-medium transition ${
                            activeIsoMessageType === "pacs002_failure"
                                ? "bg-rose-600 text-white"
                                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                    >
                        pacs.002 (Switch Timeout Alert)
                    </button>
                    <button
                        onClick={() => dispatch(openIsoModal("pacs004_recovery"))}
                        className={`px-3 py-1.5 rounded font-medium transition ${
                            activeIsoMessageType === "pacs004_recovery"
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                    >
                        pacs.004 (Drunix Reroute)
                    </button>
                    <button
                        onClick={() => dispatch(openIsoModal("camt053"))}
                        className={`px-3 py-1.5 rounded font-medium transition ${
                            activeIsoMessageType === "camt053"
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                    >
                        camt.053 (Nostro Statement)
                    </button>
                </div>

                {/* Body: XML Content */}
                <div className="flex-1 p-6 overflow-y-auto bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                    <pre className="whitespace-pre-wrap selection:bg-blue-900 selection:text-white">
                        {message.content}
                    </pre>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950/80 text-xs">
                    <span className="text-slate-400 font-mono">
                        ISO 20022 Compliance Validated • Drunix Payload Attached
                    </span>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                    >
                        {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                        <span>{copied ? "Copied" : "Copy Payload"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IsoMessageModal;
