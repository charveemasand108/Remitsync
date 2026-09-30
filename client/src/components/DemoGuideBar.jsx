import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setDemoStep,
    nextDemoStep,
    prevDemoStep,
    resetDemoScenario
} from "../features/remitsyncSlice";
import { DEMO_STEPS } from "../assets/mockDrunixData";
import {
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    Play,
    Pause,
    CheckCircle2,
    ShieldAlert,
    Cpu,
    ExternalLink,
    Sparkles
} from "lucide-react";

const DemoGuideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { demoStep, rsxState } = useSelector((state) => state.remitsync);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    const currentStepInfo = DEMO_STEPS.find((s) => s.step === demoStep) || DEMO_STEPS[0];

    // Handle auto-navigation when step changes
    const handleStepClick = (step) => {
        dispatch(setDemoStep(step));
        const target = DEMO_STEPS.find((s) => s.step === step);
        if (target) {
            navigate(target.targetRoute);
        }
    };

    const handleNext = () => {
        if (demoStep < 8) {
            const nextStep = demoStep + 1;
            dispatch(nextDemoStep());
            const target = DEMO_STEPS.find((s) => s.step === nextStep);
            if (target) {
                navigate(target.targetRoute);
            }
        }
    };

    const handlePrev = () => {
        if (demoStep > 1) {
            const prevStep = demoStep - 1;
            dispatch(prevDemoStep());
            const target = DEMO_STEPS.find((s) => s.step === prevStep);
            if (target) {
                navigate(target.targetRoute);
            }
        }
    };

    const handleReset = () => {
        setIsAutoPlaying(false);
        dispatch(resetDemoScenario());
        navigate("/");
    };

    // Auto Play mode timer
    useEffect(() => {
        let timer;
        if (isAutoPlaying) {
            timer = setTimeout(() => {
                if (demoStep < 8) {
                    if (demoStep === 4 && rsxState === "initial") {
                        // In step 5, trigger recovery
                        dispatch(nextDemoStep());
                        navigate("/transaction/RSX-928173");
                    } else {
                        handleNext();
                    }
                } else {
                    setIsAutoPlaying(false);
                }
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [isAutoPlaying, demoStep, rsxState]);

    return (
        <div className="w-full bg-slate-900 border-b border-slate-800 text-slate-100 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-2.5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    {/* Left: Hackathon Header & Scenario Badge */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-950/80 border border-blue-700/60 text-blue-300 text-xs font-semibold uppercase tracking-wider">
                            <Cpu className="size-3.5 text-blue-400" />
                            <span>Citi × NPCI Drunix Hackathon</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 font-mono">
                            <span className="font-semibold text-slate-200">Demo Scenario:</span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 font-medium">
                                UAE 🇦🇪 → India 🇮🇳 (₹75,000)
                            </span>
                        </div>
                    </div>

                    {/* Center: 8-Step Interactive Pills */}
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                        {DEMO_STEPS.map((s) => {
                            const isActive = s.step === demoStep;
                            const isPassed = s.step < demoStep;
                            return (
                                <button
                                    key={s.step}
                                    onClick={() => handleStepClick(s.step)}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-all whitespace-nowrap ${
                                        isActive
                                            ? "bg-blue-600 text-white font-medium shadow-sm ring-1 ring-blue-400"
                                            : isPassed
                                            ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                            : "bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                    }`}
                                >
                                    <span
                                        className={`size-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                            isActive
                                                ? "bg-white text-blue-700"
                                                : isPassed
                                                ? "bg-emerald-500/20 text-emerald-400"
                                                : "bg-slate-700 text-slate-300"
                                        }`}
                                    >
                                        {isPassed ? "✓" : s.step}
                                    </span>
                                    <span>{s.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: Controls (Prev, Next, AutoPlay, Reset) */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={handlePrev}
                            disabled={demoStep === 1}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition"
                            title="Previous Step"
                        >
                            <ChevronLeft className="size-4" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={demoStep === 8}
                            className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-white transition shadow-sm"
                            title="Next Step"
                        >
                            <span>Next</span>
                            <ChevronRight className="size-3.5" />
                        </button>
                        <button
                            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border transition ${
                                isAutoPlaying
                                    ? "bg-amber-950/60 border-amber-600 text-amber-300"
                                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                            }`}
                            title="Auto-advance walkthrough"
                        >
                            {isAutoPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
                            <span>{isAutoPlaying ? "Pause" : "Auto"}</span>
                        </button>
                        <button
                            onClick={handleReset}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                            title="Reset Demo Scenario"
                        >
                            <RotateCcw className="size-3.5 text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Sub-bar: Active Step Action Instruction */}
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 gap-4">
                    <div className="flex items-center gap-2 truncate">
                        <span className="font-semibold text-blue-400 font-mono">Step {demoStep}/8:</span>
                        <span className="font-medium text-slate-200">{currentStepInfo.description}</span>
                        <span className="hidden md:inline text-slate-400">— {currentStepInfo.actionHint}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        {rsxState === "recovered" ? (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-[11px] font-medium">
                                <CheckCircle2 className="size-3 text-emerald-400" />
                                RSX-928173 Settled on Drunix Block #481210
                            </span>
                        ) : rsxState === "recovering" ? (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-600 text-amber-300 text-[11px] font-medium animate-pulse">
                                <Cpu className="size-3 text-amber-400" />
                                Rerouting over Drunix Lite Peers...
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950/80 border border-rose-600/70 text-rose-300 text-[11px] font-medium">
                                <ShieldAlert className="size-3 text-rose-400" />
                                Deliberate Failure: Destination Gateway Timeout
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoGuideBar;
