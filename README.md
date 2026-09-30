# REMITSYNC | Drunix-Powered Cross-Border Settlement & Autonomous Reconciliation

Built for the **Citi × NPCI Drunix Hackathon 2026**

A high-performance cross-border payment reliability and distributed ledger orchestration platform bridging institutional banking corridors (Citi Treasury and Trade Solutions) with national retail clearing switches (NPCI UPI / IMPS) over **Drunix** — the permissioned enterprise blockchain framework released by NPCI.

---

## 🏛️ Executive Summary

Cross-border remittances into India (such as UAE → India, Singapore → India, USA → India) face systemic operational failure risks:
1. **Destination Switch Timeouts**: When an inbound domestic clearing switch (e.g. RTGS/NEFT gateway) experiences latency or reaches its batch cut-off, transactions stall in an ambiguous "in-flight" limbo.
2. **Nostro Liquidity Trapping**: Originating institutions hold pre-funded Nostro reserves, but lack real-time decentralized state visibility to safely reroute funds without risking double-debit or FX slippage.
3. **Reconciliation Lags (T+1/T+2)**: Traditional batch reconciliation relies on end-of-day file exchanges (MT940/camt.053), delaying exception resolution by 24–48 hours.

**REMITSYNC solves this by integrating NPCI's Drunix enterprise blockchain**:
- **Segregated Lite Peers**: Perform rapid smart contract simulation and 2-of-2 multisig endorsements (Citi UAE + NPCI Gateway) without disk state bottlenecks.
- **Stateless Validation Service (SVS)**: Decoupled workers execute parallel read-write conflict checks with sub-20ms latency.
- **YugabyteDB Distributed SQL**: Replaces legacy key-value stores with distributed SQL ledger tables, enabling standard SQL queries and instant three-way reconciliation.
- **Operational AI Diagnostician**: Continuously monitors switch heartbeats, detects root causes (e.g., RTGS 14,200ms timeout), verifies Nostro liquidity, and triggers autonomous failover to alternative rails (NPCI IMPS via Citi Direct Node) with zero FX slippage.

---

## 🔁 Core Remittance Flow

$$\text{Validate} \longrightarrow \text{Route} \longrightarrow \text{Monitor} \longrightarrow \text{Diagnose} \longrightarrow \text{Recover} \longrightarrow \text{Reconcile}$$

1. **Validate**: Inbound customer credit transfer validated (ISO 20022 `pacs.008`), originator KYC checked, AML risk score computed (0.02), and Nostro liquidity reserved.
2. **Route**: Initial payment routed via primary corridor rail (e.g. CIB-UAE-FTS → Citi UAE → HDFC Bank RTGS India).
3. **Monitor**: Continuous heartbeat telemetry tracks transit latency and SLA compliance.
4. **Diagnose**: Operational AI Diagnostician analyzes root causes when down-stream switches fail (e.g. `RJCT / AC04` at 14,200ms latency), assesses Nostro buffer availability, and evaluates alternative rails.
5. **Recover**: Autonomous Drunix recovery protocol broadcasts `pacs.004` cancellation, collects 2-of-2 Lite Peer multisig endorsements, sequences into Raft Block #481210, and dynamically dispatches payment via NPCI IMPS Clearing Rail.
6. **Reconcile**: Autonomous Three-Way Match Engine verifies parity across Citi TTS Core Ledger, Drunix Distributed Ledger, and NPCI Settlement Switch with zero net variance.

---

## 🎬 8-Step Hackathon Demo Scenario

> **Scenario**: UAE 🇦🇪 → India 🇮🇳 (AED 3,285.50 → ₹75,000.00 @ FX Rate 22.8275)

The application includes an interactive **Guided Hackathon Demo Controller** at the top of the interface:

1. **Step 1: Open Overview (`/`)**
   - Inspect cross-border corridor telemetry, STP rates (99.84%), Drunix 380ms consensus finality, and the active transaction ledger.
   - Observe that corridor `UAE 🇦🇪 → India 🇮🇳` has 1 alert flagged.
2. **Step 2: Click Transaction `RSX-928173`**
   - Click the highlighted transaction row in the ledger to open the Transaction Detail Inspector.
3. **Step 3: Show Lifecycle & Deliberate Destination Failure**
   - Observe the 6-stage core pipeline and the deliberate destination failure alert: HDFC Bank RTGS Hub timed out at 14,200ms (`RJCT / AC04: Inbound RTGS settlement window closed`).
4. **Step 4: Explain the AI Operational Diagnosis**
   - Inspect the root-cause analysis: Downstream switch failure, verified ₹24.5M Nostro surplus, zero FX slippage, and rail evaluation favoring NPCI IMPS (92ms latency, 99.98% reliability).
5. **Step 5: Click "Run Recovery"**
   - Trigger the multi-step Drunix recovery engine. Watch the live terminal sequence: `pacs.004` broadcast → Lite Peer multisig endorsement → Raft orderer sequencing → Stateless Validation (SVS) → NPCI IMPS dispatch → YugabyteDB SQL commit.
6. **Step 6: Show Recovered / Settled State**
   - Transaction transitions to `SETTLED (RECOVERED)`. Review cryptographic Drunix proof, Block #481210 hash, 2/2 peer digital signatures, and ISO 20022 message trail.
7. **Step 7: Open Drunix Network (`/drunix`)**
   - Walk through the 5-stage DLT lifecycle: `Proposed → Endorsed → Ordered → Validated → Committed`.
   - Inspect segregated peer topology (Lite Peers vs Committing Peers vs SVS), the live Block Explorer, and execute queries in the **YugabyteDB SQL Console**.
8. **Step 8: Open Reconciliation (`/reconciliation`)**
   - Validate 3-way cross-system consistency: Citi TTS Core Banking vs Drunix Distributed Ledger vs NPCI Settlement Gateway.
   - Verify 100% match rate and ₹0 Nostro variance.
   - Test the interactive **Break Simulator** to show automated discrepancy detection.

---

## ⚡ Drunix Distributed Ledger Architecture

```
                    ┌──────────────────────────────────────────────┐
                    │            REMITSYNC Client Gateway          │
                    │      (ISO 20022 pacs.008 / pacs.004)        │
                    └──────────────────────┬───────────────────────┘
                                           │
                        1. PROPOSE (gRPC)  │
                                           ▼
                    ┌──────────────────────────────────────────────┐
                    │             DRUNIX LITE PEERS                │
                    │   lite-peer0.citi.ae  │  lite-peer1.npci.in  │
                    │      (Smart Contract Simulation Sandbox)     │
                    └──────────────────────┬───────────────────────┘
                                           │
                    2. 2-OF-2 MULTISIG     │
                                           ▼
                    ┌──────────────────────────────────────────────┐
                    │            RAFT ORDERER CLUSTER              │
                    │         orderer0.drunix.citigroup.com        │
                    │          (Block Assembly & Merkle Root)      │
                    └──────────────────────┬───────────────────────┘
                                           │
                         3. BATCH BLOCK    │
                                           ▼
                    ┌──────────────────────────────────────────────┐
                    │      STATELESS VALIDATION SERVICE (SVS)      │
                    │   Parallel Read-Write Verification Workers   │
                    └──────────────────────┬───────────────────────┘
                                           │
                         4. VALIDATED      │
                                           ▼
                    ┌──────────────────────────────────────────────┐
                    │          DRUNIX COMMITTING PEERS             │
                    │   committing-peer0.citi  │  committing-npci  │
                    │                      ▼                       │
                    │      YugabyteDB Distributed SQL Ledger       │
                    │    (Table: drunix_ledger.remit_settlement)   │
                    └──────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19, React Router v7, Redux Toolkit, Tailwind CSS v4
- **Institutional Design**: Custom institutional financial palette (Slate/Navy), JetBrains Mono typography, dense tabular metrics, ISO 20022 syntax inspector
- **DLT Simulation & Telemetry**: Drunix consensus engine simulator, Raft block generator, YugabyteDB SQL emulator
- **Icons & Tooling**: Lucide React, Recharts, Date-fns

---

## 🚀 Running the Prototype

```bash
# 1. Install dependencies
cd client
npm install

# 2. Start the development server
npm run dev

# 3. Build for production verification
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The application loads in **Institutional Demo Mode** with pre-configured operator personas (*Vikramaditya Roy — Citi TTS Lead*, *Priya Sharma — NPCI Auditor*, *Alex Chen — Drunix Core Dev*).

---

## 📄 Note for Hackathon Evaluators

This UI is an end-to-end simulation built for the **Citi × NPCI Drunix Hackathon 2026**. It demonstrates cross-border payment reliability, AI operational diagnosis, Drunix consensus lifecycle, and autonomous three-way reconciliation. The integration points (`/integration`) are structured with standard gRPC contracts, endorsement policies, and YugabyteDB SQL schemas so production teams can directly connect the official Drunix SDK when deployed.
