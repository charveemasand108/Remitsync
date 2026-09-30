import { createSlice } from "@reduxjs/toolkit";
import {
    INITIAL_TRANSACTION_RSX928173,
    CORRIDOR_TRANSACTIONS,
    DRUNIX_BLOCKS
} from "../assets/mockDrunixData";

const initialState = {
    demoStep: 1, // 1 to 8
    rsxState: "initial", // "initial" (failed at dest) | "recovering" | "recovered"
    recoveryStepIndex: 0,
    recoveryLog: [],
    transactions: CORRIDOR_TRANSACTIONS.map(tx => {
        if (tx.id === "RSX-928173") {
            return {
                ...tx,
                status: "DEST_TIMEOUT_FAILED",
                latency: "14,200ms (ALERT)"
            };
        }
        return tx;
    }),
    selectedTxId: "RSX-928173",
    drunixBlocks: DRUNIX_BLOCKS,
    isSimulatingBreak: false,
    activeUserRole: "citi_ops", // "citi_ops" | "npci_auditor" | "drunix_dev"
    sqlQuery: "SELECT tx_id, uetr, amount_inr, rail, status, committing_node FROM drunix_ledger.remit_settlement WHERE uetr = 'e8f47c92-6a10-4e3b-9a8c-2891b7d5410a';",
    sqlExecutionResult: null,
    isIsoModalOpen: false,
    activeIsoMessageType: "pacs008",
    isNewTransferModalOpen: false
};

const remitsyncSlice = createSlice({
    name: "remitsync",
    initialState,
    reducers: {
        setDemoStep: (state, action) => {
            const step = action.payload;
            state.demoStep = Math.max(1, Math.min(8, step));
        },
        nextDemoStep: (state) => {
            if (state.demoStep < 8) {
                state.demoStep += 1;
            }
        },
        prevDemoStep: (state) => {
            if (state.demoStep > 1) {
                state.demoStep -= 1;
            }
        },
        setSelectedTxId: (state, action) => {
            state.selectedTxId = action.payload;
        },
        startRecovery: (state) => {
            state.rsxState = "recovering";
            state.recoveryStepIndex = 1;
            state.recoveryLog = [
                { id: 1, text: "Broadcasting ISO 20022 pacs.004 cancellation notice to stalled HDFC RTGS route...", done: true }
            ];
        },
        advanceRecoveryStep: (state, action) => {
            const { stepIndex, logMessage } = action.payload;
            state.recoveryStepIndex = stepIndex;
            if (logMessage) {
                state.recoveryLog.push({ id: Date.now(), text: logMessage, done: true });
            }
        },
        completeRecovery: (state) => {
            state.rsxState = "recovered";
            state.recoveryStepIndex = 6;
            state.recoveryLog.push({
                id: Date.now(),
                text: "Recovery Complete: SETTLED via NPCI IMPS Clearing Rail (Citi Direct Node). Drunix Block #481210 committed to YugabyteDB SQL.",
                done: true
            });
            // Update transaction list
            state.transactions = state.transactions.map(tx => {
                if (tx.id === "RSX-928173") {
                    return {
                        ...tx,
                        status: "SETTLED_RECOVERED",
                        latency: "180ms (POST-RECOVERY)",
                        rail: "NPCI IMPS (Citi Direct Node)",
                        drunixBlock: 481210
                    };
                }
                return tx;
            });
        },
        resetDemoScenario: (state) => {
            state.demoStep = 1;
            state.rsxState = "initial";
            state.recoveryStepIndex = 0;
            state.recoveryLog = [];
            state.isSimulatingBreak = false;
            state.selectedTxId = "RSX-928173";
            state.transactions = CORRIDOR_TRANSACTIONS.map(tx => {
                if (tx.id === "RSX-928173") {
                    return {
                        ...tx,
                        status: "DEST_TIMEOUT_FAILED",
                        latency: "14,200ms (ALERT)",
                        rail: "HDFC RTGS Hub (IN-MUM-GW-04)",
                        drunixBlock: 481209
                    };
                }
                return tx;
            });
        },
        toggleBreakSimulation: (state) => {
            state.isSimulatingBreak = !state.isSimulatingBreak;
        },
        setUserRole: (state, action) => {
            state.activeUserRole = action.payload;
        },
        setSqlQuery: (state, action) => {
            state.sqlQuery = action.payload;
        },
        executeSqlQuery: (state) => {
            const isRecovered = state.rsxState === "recovered";
            state.sqlExecutionResult = {
                rowsAffected: 1,
                executionTimeMs: 4.8,
                columns: ["tx_id", "uetr", "amount_inr", "rail", "status", "committing_node", "block_number"],
                data: [
                    [
                        isRecovered ? "0x89f41b...bc2a" : "0x12a991...0482",
                        "e8f47c92-6a10-4e3b-9a8c-2891b7d5410a",
                        "75000.00",
                        isRecovered ? "NPCI_IMPS_CITI_DIRECT" : "HDFC_RTGS_PRIMARY",
                        isRecovered ? "COMMITTED_RECOVERED" : "STALLED_DESTINATION",
                        "committing-peer0.citi.in",
                        isRecovered ? 481210 : 481209
                    ]
                ]
            };
        },
        openIsoModal: (state, action) => {
            state.activeIsoMessageType = action.payload || "pacs008";
            state.isIsoModalOpen = true;
        },
        closeIsoModal: (state) => {
            state.isIsoModalOpen = false;
        },
        setNewTransferModalOpen: (state, action) => {
            state.isNewTransferModalOpen = action.payload;
        },
        addNewTransfer: (state, action) => {
            const newTx = action.payload;
            state.transactions.unshift(newTx);
            state.drunixBlocks[0].txCount += 1;
        }
    }
});

export const {
    setDemoStep,
    nextDemoStep,
    prevDemoStep,
    setSelectedTxId,
    startRecovery,
    advanceRecoveryStep,
    completeRecovery,
    resetDemoScenario,
    toggleBreakSimulation,
    setUserRole,
    setSqlQuery,
    executeSqlQuery,
    openIsoModal,
    closeIsoModal,
    setNewTransferModalOpen,
    addNewTransfer
} = remitsyncSlice.actions;

export default remitsyncSlice.reducer;
