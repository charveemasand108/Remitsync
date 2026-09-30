import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewTransferModalOpen, addNewTransfer } from "../features/remitsyncSlice";
import { X, Send, ArrowRight, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";

const NewTransferModal = () => {
    const dispatch = useDispatch();
    const { isNewTransferModalOpen } = useSelector((state) => state.remitsync);

    const [originCurrency, setOriginCurrency] = useState("AED");
    const [originAmount, setOriginAmount] = useState("4500.00");
    const [beneficiaryName, setBeneficiaryName] = useState("Tata Advanced Systems Ltd");
    const [beneficiaryBank, setBeneficiaryBank] = useState("Citi India Institutional (CITI0000003)");
    const [preferredRail, setPreferredRail] = useState("NPCI_IMPS");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    if (!isNewTransferModalOpen) return null;

    const rate = originCurrency === "AED" ? 22.8275 : originCurrency === "SGD" ? 62.00 : 83.00;
    const destAmount = (parseFloat(originAmount || 0) * rate).toFixed(2);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            const randomId = `RSX-${Math.floor(100000 + Math.random() * 900000)}`;
            const newTx = {
                id: randomId,
                uetr: `${Math.random().toString(16).substring(2, 10)}-4910-4829-94bc-${Math.random().toString(16).substring(2, 14)}`,
                corridor: `${originCurrency}_INDIA`,
                corridorLabel: `${originCurrency} → India (INR)`,
                originCountry: originCurrency === "AED" ? "United Arab Emirates" : originCurrency === "SGD" ? "Singapore" : "United States",
                originCurrency,
                originAmount: parseFloat(originAmount),
                destCountry: "India",
                destCurrency: "INR",
                destAmount: parseFloat(destAmount),
                fxRate: rate,
                status: "SETTLED",
                rail: preferredRail === "NPCI_IMPS" ? "NPCI IMPS (Citi Direct)" : "NPCI UPI-Direct Linkage",
                originator: { name: "Emirates Corporate Treasury", bank: "Mashreq Bank Dubai" },
                beneficiary: { name: beneficiaryName, bank: beneficiaryBank },
                timestamp: new Date().toISOString(),
                latency: "385ms",
                drunixBlock: 481211
            };

            dispatch(addNewTransfer(newTx));
            setIsSubmitting(false);
            setSuccessMessage(`Transfer ${randomId} committed to Drunix Block #481211!`);

            setTimeout(() => {
                setSuccessMessage(null);
                dispatch(setNewTransferModalOpen(false));
            }, 1800);
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-lg w-full p-6 text-slate-100">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
                            <Send className="size-4" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-base text-white">Dispatch Live Remittance</h3>
                            <p className="text-xs text-slate-400">Test Drunix Lite Peer endorsement & consensus</p>
                        </div>
                    </div>
                    <button
                        onClick={() => dispatch(setNewTransferModalOpen(false))}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {successMessage ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                        <CheckCircle2 className="size-12 text-emerald-400 animate-bounce mb-3" />
                        <h4 className="text-lg font-semibold text-white">Settlement Succeeded</h4>
                        <p className="text-xs text-slate-300 mt-1 max-w-xs">{successMessage}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-slate-300 font-medium mb-1">Origin Currency</label>
                                <select
                                    value={originCurrency}
                                    onChange={(e) => setOriginCurrency(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="AED">AED - UAE Dirham</option>
                                    <option value="SGD">SGD - Singapore Dollar</option>
                                    <option value="USD">USD - US Dollar</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-300 font-medium mb-1">Send Amount</label>
                                <input
                                    type="number"
                                    value={originAmount}
                                    onChange={(e) => setOriginAmount(e.target.value)}
                                    required
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Conversion banner */}
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                            <span className="text-slate-400">Converted INR Payout</span>
                            <span className="font-mono text-sm font-semibold text-emerald-400">
                                ₹{Number(destAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                            </span>
                        </div>

                        <div>
                            <label className="block text-slate-300 font-medium mb-1">Beneficiary Name (India)</label>
                            <input
                                type="text"
                                value={beneficiaryName}
                                onChange={(e) => setBeneficiaryName(e.target.value)}
                                required
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 font-medium mb-1">Beneficiary Bank & IFSC</label>
                            <input
                                type="text"
                                value={beneficiaryBank}
                                onChange={(e) => setBeneficiaryBank(e.target.value)}
                                required
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 font-mono"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 font-medium mb-1">Drunix Endorsement Rail</label>
                            <select
                                value={preferredRail}
                                onChange={(e) => setPreferredRail(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="NPCI_IMPS">NPCI IMPS (Citi Direct Gateway Node)</option>
                                <option value="NPCI_UPI">NPCI UPI-Direct Linkage</option>
                            </select>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                                <ShieldCheck className="size-3.5 text-blue-400" />
                                <span>2-of-2 Lite Peer Endorsement</span>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium transition shadow-sm"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Cpu className="size-3.5 animate-spin" />
                                        <span>Proposing to Drunix...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Submit Transfer</span>
                                        <ArrowRight className="size-3.5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default NewTransferModal;
