<div align="center">

# 🌐 REMITSYNC - 

### Cross-Border Settlement Reliability · Intelligent Recovery · Autonomous Reconciliation

*Make cross-border settlement failures **observable, diagnosable, recoverable and reconcilable**.*

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Inngest](https://img.shields.io/badge/Inngest-Workflows-000000?style=for-the-badge)
![ISO 20022](https://img.shields.io/badge/ISO-20022-0A66C2?style=for-the-badge)
![Hackathon](https://img.shields.io/badge/Citi_×_NPCI-Drunix_Hackathon_2026-E11D48?style=for-the-badge)

</div>

----

## 📑 Table of Contents

1. [Overview](#-overview)
2. [The Problem](#-the-problem)
3. [The Solution](#-the-solution)
4. [Key Features](#-key-features)
5. [System Architecture](#-system-architecture)
6. [End-to-End Workflow](#-end-to-end-workflow)
7. [Recovery Orchestration Sequence](#-recovery-orchestration-sequence)
8. [Transaction State Machine](#-transaction-state-machine)
9. [Drunix Ledger Lifecycle](#-drunix-ledger-lifecycle)
10. [Drunix Network Topology](#-drunix-network-topology)
11. [Three-Way Reconciliation](#-three-way-reconciliation)
12. [Frontend Architecture](#-frontend-architecture)
13. [Data Flow](#-data-flow)
14. [Data Model (ER Diagram)](#-data-model-er-diagram)
15. [ISO 20022 Messages](#-iso-20022-messages)
16. [Application Pages](#-application-pages)
17. [Guided Demo Script](#-guided-demo-script)
18. [Tech Stack](#-tech-stack)
19. [Project Structure](#-project-structure)
20. [Getting Started](#-getting-started)
21. [Environment Variables](#-environment-variables)
22. [Current Status & Roadmap](#-current-status--roadmap)



---

## 🔎 Overview

**REMITSYNC** is an operational orchestration platform for cross-border payments, built for the **Citi × NPCI Drunix Hackathon 2026**.

It sits on top of the payment rails and the distributed ledger and gives operations teams one place to **see** a transaction's true state, **understand** why it stalled, **fix** it automatically over an alternative rail, and **prove** that all systems agree afterwards.

```text
VALIDATE  →  ROUTE  →  MONITOR  →  DIAGNOSE  →  RECOVER  →  RECONCILE
```

> ⚠️ **Prototype note:** the current build is a high-fidelity, **front-end simulation** driven by realistic mock data (ISO 20022 payloads, Drunix blocks, corridor metrics). No real money moves and no real bank/NPCI/Drunix endpoints are called. See [Current Status & Roadmap](#-current-status--roadmap) for exactly what is real and what is simulated.

---

## 🚨 The Problem

> **What happens when a cross-border transaction is accepted by the originating institution, but fails or times out at the destination settlement layer?**

Today the payment often sits in an ambiguous **`IN-FLIGHT`** state:

| Pain point | Consequence |
|---|---|
| Nobody knows if the money is lost, stuck or delivered | Customer support escalations |
| Root cause is buried across bank, switch and gateway logs | Slow manual diagnosis |
| Recovery means manual re-initiation or return-to-sender | Extra fees, FX risk, delays |
| Ledgers at each party drift apart | Nostro breaks and suspense items |
| Reconciliation happens end-of-day, in spreadsheets | Late detection of errors |

---

## 💡 The Solution

REMITSYNC turns that ambiguity into a structured, auditable workflow:

```mermaid
flowchart LR
    A["⏳ Ambiguous<br/>IN-FLIGHT payment"] --> B["🔍 Detect<br/>SLA breach / RJCT"]
    B --> C["🧠 Diagnose<br/>root cause + liquidity + FX risk"]
    C --> D["🔁 Recover<br/>autonomous failover"]
    D --> E["⚖️ Reconcile<br/>3-way match"]
    E --> F["✅ Verified<br/>SETTLED state"]

    style A fill:#7f1d1d,stroke:#ef4444,color:#fff
    style B fill:#78350f,stroke:#f59e0b,color:#fff
    style C fill:#1e3a8a,stroke:#3b82f6,color:#fff
    style D fill:#4c1d95,stroke:#8b5cf6,color:#fff
    style E fill:#134e4a,stroke:#14b8a6,color:#fff
    style F fill:#14532d,stroke:#22c55e,color:#fff
```

---

## ✨ Key Features

### 🛰️ Observability
- **Live corridor dashboard** with health, volume, latency and STP rate for UAE, Singapore, USA, UK and Saudi Arabia → India corridors
- **Transaction Inspector** with UETR, parties, FX, route, lifecycle stages and full audit trail
- **Rail health matrix** (NPCI IMPS, RTGS, UPI-Direct, NEFT and more) with latency, availability and 24h volume

### 🧠 Intelligent Diagnosis
- **AI Diagnostician** card with confidence score (99.4% in the demo scenario)
- Identifies the failing node, SLA breach ratio and ISO reason code (`RJCT / AC04`, `DS04`)
- Pre-checks **Nostro liquidity** and **FX-rate lock** before recommending action
- Ranks **alternative rails** by latency, success rate and cost delta

### 🔁 Autonomous Recovery
- One-click **Run Recovery** executes a multi-step failover sequence with a live log
- Fails over from a stalled RTGS gateway to the **NPCI IMPS rail via Citi Direct Node**
- Zero FX slippage: the rate stays locked on the Drunix smart contract
- Issues an ISO 20022 **`pacs.004`** reroute notice

### ⛓️ Drunix Ledger Integration (simulated)
- Full **5-stage lifecycle**: Proposed → Endorsed → Ordered → Validated → Committed
- Segregated **Lite Peers / Committing Peers / SVS / Raft Orderers** topology view
- **YugabyteDB SQL console**: query the ledger with plain SQL and see the state change after recovery
- Block explorer with hashes, previous-hash chain and validation codes

### ⚖️ Autonomous Reconciliation
- **Three-way match** across Citi TTS Core, Drunix DLT and NPCI Clearing Gateway
- **Break simulator** injects a Nostro mismatch and shows auto-healing
- Exports/inspects a **`camt.053`** statement

### 🎭 Role-Based Views
| Role | Persona | Focus |
|---|---|---|
| `citi_ops` | Citi TTS Cross-Border Ops Lead | Monitor and recover payments |
| `npci_auditor` | NPCI Chief Settlement Auditor | Audit and reconciliation |
| `drunix_dev` | Drunix Core Infrastructure Engineer | Ledger internals and SDK |

### 🧭 Judge-Friendly Demo Mode
- Persistent **8-step Demo Guide Bar** with next/previous and reset
- **Zero-login mode**: if no Clerk key is set, the app runs directly, with no sign-in friction

---

## 🏗️ System Architecture

```mermaid
flowchart TB
    subgraph USERS["👥 Users"]
        U1["Citi Ops Lead"]
        U2["NPCI Auditor"]
        U3["Drunix Engineer"]
    end

    subgraph FE["🖥️ REMITSYNC Frontend  ·  React 19 + Vite + Tailwind 4"]
        direction TB
        UI["Pages: Dashboard · Transaction Inspector<br/>Drunix Network · Reconciliation<br/>Corridors · SDK Hub"]
        STATE["Redux Toolkit Store<br/>remitsync · theme · workspace"]
        MOCK["Mock Data Engine<br/>transactions · blocks · ISO 20022 · metrics"]
        AUTHFE["Clerk React (optional)<br/>or Demo Mode"]
        UI <--> STATE
        STATE --> MOCK
        UI --> AUTHFE
    end

    subgraph BE["⚙️ Backend  ·  Node + Express 5"]
        direction TB
        API["Express API<br/>CORS · JSON · Clerk middleware"]
        INN["Inngest Functions<br/>clerk/user.created · clerk/user.updated"]
        ORM["Prisma 7 Client"]
        API --> ORM
        INN --> ORM
    end

    subgraph DATA["🗄️ Persistence"]
        PG[("PostgreSQL")]
    end

    subgraph EXT["🌍 External Services"]
        CLERK["Clerk<br/>Identity"]
        INNG["Inngest Cloud<br/>Event Bus"]
    end

    subgraph TARGET["🔮 Target Integration Layer  (roadmap)"]
        direction TB
        ISO["ISO 20022 Gateway<br/>pacs.008 · pacs.002 · pacs.004 · camt.053"]
        DRX["Drunix DLT<br/>Lite Peers · Raft Orderers · SVS · Committing Peers"]
        YUG[("YugabyteDB<br/>Distributed SQL")]
        RAILS["Payment Rails<br/>NPCI IMPS · UPI · RTGS · NEFT · Fedwire · CHAPS · SARIE"]
        DRX --> YUG
    end

    U1 & U2 & U3 --> UI
    AUTHFE -. "sign-in" .-> CLERK
    CLERK -- "webhooks" --> INNG
    INNG -- "events" --> INN
    ORM --> PG
    FE -. "REST /api" .-> API
    API -. "future" .-> ISO
    API -. "future" .-> DRX
    ISO --> RAILS

    style FE fill:#0f172a,stroke:#3b82f6,color:#e2e8f0
    style BE fill:#0f172a,stroke:#22c55e,color:#e2e8f0
    style DATA fill:#0f172a,stroke:#f59e0b,color:#e2e8f0
    style EXT fill:#0f172a,stroke:#a78bfa,color:#e2e8f0
    style TARGET fill:#111827,stroke:#ef4444,stroke-dasharray: 5 5,color:#e2e8f0
    style USERS fill:#0f172a,stroke:#64748b,color:#e2e8f0
```

**Solid lines** are implemented today. **Dashed lines** are planned or optional integrations.

### Layered View

```mermaid
flowchart LR
    subgraph L1["Payment Layer"]
        P1["ISO 20022 messaging"]
        P2["Rail routing"]
        P3["Settlement"]
    end
    subgraph L2["Intelligence Layer"]
        I1["AI diagnosis"]
        I2["SLA monitoring"]
        I3["Liquidity analysis"]
    end
    subgraph L3["Ledger Layer"]
        D1["Drunix consensus"]
        D2["Stateless validation"]
        D3["SQL commitment"]
    end
    L1 --> RO["🎛️ Recovery Orchestration"]
    L2 --> RO
    L3 --> RO
    RO --> ALT["Alternative Rail"] --> REC["Three-Way Reconciliation"] --> VS["✅ Verified State"]
```

---

## 🔄 End-to-End Workflow

```mermaid
flowchart TD
    START(["🟢 Remittance request<br/>e.g. AED 3,285.50 → ₹75,000"]) --> V{"1. VALIDATE<br/>KYC · AML · limits"}
    V -- "fail" --> REJ["❌ Rejected"]
    V -- "pass" --> R["2. ROUTE<br/>select best rail + lock FX"]
    R --> DL1["Propose → Endorse → Order → Validate → Commit<br/>on Drunix"]
    DL1 --> M{"3. MONITOR<br/>latency vs SLA"}
    M -- "within SLA" --> S1["✅ SETTLED"]
    M -- "timeout / RJCT" --> DG["4. DIAGNOSE<br/>AI root-cause analysis"]
    DG --> LQ{"Liquidity<br/>available?"}
    LQ -- "no" --> RET["↩️ Reverse to originator<br/>Nostro return"]
    LQ -- "yes" --> ALT{"Alternative<br/>rail healthy?"}
    ALT -- "no" --> RET
    ALT -- "yes" --> RC["5. RECOVER<br/>pacs.004 + failover"]
    RC --> DL2["Re-commit on Drunix<br/>new block"]
    DL2 --> RCN["6. RECONCILE<br/>Citi TTS · Drunix · NPCI"]
    RCN --> MATCH{"3-way<br/>match?"}
    MATCH -- "yes" --> VER(["✅ VERIFIED<br/>SETTLED_RECOVERED"])
    MATCH -- "no" --> BRK["⚠️ Break flagged<br/>auto-heal from Drunix state"]
    BRK --> RCN
    S1 --> RCN

    style START fill:#14532d,stroke:#22c55e,color:#fff
    style VER fill:#14532d,stroke:#22c55e,color:#fff
    style REJ fill:#7f1d1d,stroke:#ef4444,color:#fff
    style RET fill:#78350f,stroke:#f59e0b,color:#fff
    style BRK fill:#78350f,stroke:#f59e0b,color:#fff
    style DG fill:#1e3a8a,stroke:#3b82f6,color:#fff
    style RC fill:#4c1d95,stroke:#8b5cf6,color:#fff
```

---

## 🎬 Recovery Orchestration Sequence

This is the exact sequence executed when an operator clicks **Run Recovery** on transaction `RSX-928173`.

```mermaid
sequenceDiagram
    autonumber
    actor Ops as Citi Ops
    participant UI as RemitSync UI
    participant RS as Recovery Orchestrator
    participant LP as Drunix Lite Peers<br/>(Citi UAE + NPCI)
    participant OR as Raft Orderer
    participant SVS as Stateless Validation
    participant NPCI as NPCI IMPS Switch<br/>(Citi Direct Node)
    participant YB as YugabyteDB

    Note over UI: Status: DEST_TIMEOUT_FAILED<br/>HDFC RTGS 14,200ms vs 2,500ms SLA
    Ops->>UI: Click "Run Recovery"
    UI->>RS: startRecovery()
    RS->>RS: Broadcast pacs.004 cancellation to stalled RTGS route
    RS->>LP: Request 2-of-2 multisig endorsement
    LP-->>RS: Signed endorsements
    RS->>OR: Submit proposal for Block #481210
    OR-->>RS: Ordered block
    RS->>SVS: Validate read-write set versions
    SVS-->>RS: Conflict check PASS · anti-double-spend OK
    RS->>NPCI: Dispatch ₹75,000 via IMPS
    NPCI-->>RS: ACK · RRN 429188201948
    RS->>YB: Commit to drunix_ledger.remit_settlement
    YB-->>RS: COMMITTED_RECOVERED
    RS-->>UI: completeRecovery()
    UI-->>Ops: ✅ SETTLED (RECOVERED) · 180ms
```

---

## 🔀 Transaction State Machine

```mermaid
stateDiagram-v2
    [*] --> INITIATED
    INITIATED --> VALIDATED: KYC / AML pass
    INITIATED --> REJECTED: KYC / AML fail
    VALIDATED --> IN_FLIGHT: routed and committed to Drunix
    IN_FLIGHT --> SETTLED: destination ACK within SLA
    IN_FLIGHT --> DEST_TIMEOUT_FAILED: RJCT / AC04 or SLA breach
    DEST_TIMEOUT_FAILED --> RECOVERING: Run Recovery
    RECOVERING --> SETTLED_RECOVERED: alternative rail ACK
    RECOVERING --> RETURNED: no viable rail, Nostro return
    SETTLED --> RECONCILED
    SETTLED_RECOVERED --> RECONCILED
    RECONCILED --> [*]
    REJECTED --> [*]
    RETURNED --> [*]
```

---

## ⛓️ Drunix Ledger Lifecycle

Every transaction passes through five stages before it is final.

```mermaid
flowchart LR
    S1["① PROPOSED<br/>Client gateway<br/>pacs.008 + UETR hash<br/>⏱ 8 ms"] -->
    S2["② ENDORSED<br/>Lite Peers simulate chaincode<br/>2-of-2 multisig<br/>⏱ 42 ms"] -->
    S3["③ ORDERED<br/>Raft consensus<br/>250 tx / 250 ms batch<br/>⏱ 68 ms"] -->
    S4["④ VALIDATED<br/>Stateless Validation Service<br/>16 parallel workers<br/>⏱ 14 ms"] -->
    S5["⑤ COMMITTED<br/>Committing peers → YugabyteDB<br/>ACID SQL write<br/>⏱ 22 ms"]

    style S1 fill:#1e293b,stroke:#38bdf8,color:#e2e8f0
    style S2 fill:#1e293b,stroke:#a78bfa,color:#e2e8f0
    style S3 fill:#1e293b,stroke:#f59e0b,color:#e2e8f0
    style S4 fill:#1e293b,stroke:#14b8a6,color:#e2e8f0
    style S5 fill:#1e293b,stroke:#22c55e,color:#e2e8f0
```

| # | Stage | Responsible node | What happens | Latency |
|---|---|---|---|---|
| 1 | **Proposed** | RemitSync Client Gateway | Proposal packaged with ISO 20022 metadata, signed with the participant's X.509 certificate | 8 ms |
| 2 | **Endorsed** | Lite Peers (Citi UAE + NPCI Gateway) | Chaincode simulated in sandbox; 2-of-2 endorsement policy | 42 ms |
| 3 | **Ordered** | Raft Orderer cluster | Strict total order, Merkle state roots, chained block headers | 68 ms |
| 4 | **Validated** | Stateless Validation Service | Parallel read-write set, signature and double-spend checks | 14 ms |
| 5 | **Committed** | Committing Peers + YugabyteDB | ACID commit to distributed SQL, so ledger state is directly queryable | 22 ms |

---

## 🕸️ Drunix Network Topology

```mermaid
flowchart TB
    CL["📱 RemitSync Client Gateway"]

    subgraph ENDORSE["Endorsement Tier"]
        LP0["lite-peer0.citi.ae<br/>Citi UAE · DIFC Dubai"]
        LP1["lite-peer1.npci.in<br/>NPCI Gateway · BKC Mumbai"]
    end

    subgraph ORDER["Ordering Tier"]
        OR0["orderer0.drunix.citigroup.com<br/>Raft · London"]
        OR1["orderer1.npci.org.in<br/>Raft"]
    end

    subgraph VALID["Validation Tier"]
        SVS["svs-cluster-01.drunix.org<br/>Stateless · Multi-zone"]
    end

    subgraph COMMIT["Commit Tier"]
        CP0["committing-peer0.citi.in<br/>Mumbai"]
        CP1["committing-peer1.npci.in<br/>Hyderabad DR"]
    end

    YB[("YugabyteDB<br/>drunix_ledger.remit_settlement")]

    CL --> LP0 & LP1
    LP0 & LP1 --> OR0
    OR0 <-. "Raft" .-> OR1
    OR0 --> SVS
    SVS --> CP0 & CP1
    CP0 & CP1 --> YB

    style ENDORSE fill:#0f172a,stroke:#a78bfa,color:#e2e8f0
    style ORDER fill:#0f172a,stroke:#f59e0b,color:#e2e8f0
    style VALID fill:#0f172a,stroke:#14b8a6,color:#e2e8f0
    style COMMIT fill:#0f172a,stroke:#22c55e,color:#e2e8f0
```

Unlike a classic Hyperledger Fabric setup with LevelDB/CouchDB key-value state, the Drunix model shown here commits to **distributed SQL**, so operations and audit teams can run ordinary SQL against the ledger.

---

## ⚖️ Three-Way Reconciliation

```mermaid
flowchart LR
    subgraph A["🏦 Citi TTS Core Banking"]
        A1["Debtor + Nostro ledger<br/>CITI-NOSTRO-INR-09<br/>₹75,000 · CLEARED_DEBIT"]
    end
    subgraph B["⛓️ Drunix Distributed Ledger"]
        B1["Single source of truth<br/>Block #481210<br/>₹75,000 · COMMITTED_RECOVERED"]
    end
    subgraph C["🏛️ NPCI Clearing Gateway"]
        C1["Creditor settlement switch<br/>RRN 429188201948<br/>₹75,000 · CREDIT_CONFIRMED"]
    end

    A1 --> ENG{{"⚖️ Reconciliation Engine<br/>amount · UETR · status · timestamp"}}
    B1 --> ENG
    C1 --> ENG
    ENG -- "all equal" --> OK["✅ BALANCED_ZERO_VARIANCE<br/>camt.053 statement"]
    ENG -- "mismatch" --> BR["⚠️ Break flagged<br/>₹ suspense"]
    BR --> HEAL["🩹 Auto-heal<br/>query Drunix state → correct Nostro"]
    HEAL --> ENG

    style OK fill:#14532d,stroke:#22c55e,color:#fff
    style BR fill:#78350f,stroke:#f59e0b,color:#fff
```

**Demo figures:** 1,420 transactions · ₹412.8M volume · 100.00% match rate · ₹0.00 net Nostro variance. Clicking **Simulate Clearing Break** drops the match rate to 99.28% and shows a ₹75,000 suspense item.

---

## 🧩 Frontend Architecture

```mermaid
flowchart TB
    MAIN["main.jsx<br/>BrowserRouter · Redux Provider"] --> KEY{"Clerk key<br/>starts with pk_ ?"}
    KEY -- "yes" --> CP["ClerkProvider wrapper"]
    KEY -- "no" --> DEMO["Institutional Demo Mode<br/>no login"]
    CP --> APP
    DEMO --> APP

    APP["App.jsx · Routes"] --> LAY["Layout.jsx"]
    LAY --> DGB["DemoGuideBar"]
    LAY --> SB["Sidebar"]
    LAY --> NB["Navbar<br/>role switcher · theme · new transfer"]
    LAY --> OUT["Outlet"]
    LAY --> MOD["Global modals<br/>IsoMessageModal · NewTransferModal"]

    OUT --> P1["/ Dashboard"]
    OUT --> P2["/transaction/:id<br/>TransactionDetail"]
    OUT --> P3["/drunix<br/>DrunixNetwork"]
    OUT --> P4["/reconciliation"]
    OUT --> P5["/corridors<br/>CorridorsView"]
    OUT --> P6["/integration<br/>IntegrationHub"]

    subgraph REDUX["Redux Store"]
        RS["remitsyncSlice<br/>demoStep · rsxState · recoveryLog<br/>transactions · blocks · role · SQL result"]
        TS["themeSlice"]
        WS["workspaceSlice<br/>(legacy template)"]
    end

    P1 & P2 & P3 & P4 & P5 & P6 <--> RS
    NB <--> TS
    RS --> MD["assets/mockDrunixData.js"]
```

### Redux `remitsync` slice

| State | Purpose |
|---|---|
| `demoStep` (1-8) | Position in the guided demo |
| `rsxState` | `initial` → `recovering` → `recovered` |
| `recoveryStepIndex`, `recoveryLog` | Drives the live recovery timeline |
| `transactions` | Corridor transaction list (status mutates on recovery) |
| `drunixBlocks` | Block explorer data |
| `isSimulatingBreak` | Reconciliation break toggle |
| `activeUserRole` | `citi_ops` / `npci_auditor` / `drunix_dev` |
| `sqlQuery`, `sqlExecutionResult` | YugabyteDB console |
| `isIsoModalOpen`, `activeIsoMessageType` | ISO 20022 XML viewer |

---

## 📡 Data Flow

```mermaid
flowchart LR
    subgraph Client
        OP["Operator action"] --> DSP["dispatch(action)"]
        DSP --> RED["Reducer"]
        RED --> ST["Store state"]
        ST --> SEL["useSelector"]
        SEL --> VW["Re-rendered view"]
    end
    MD["mockDrunixData.js<br/>seed"] --> ST
    RED -. "timers simulate<br/>network latency" .-> TM["setTimeout chain<br/>600 → 1300 → 2000 → 2700 → 3400 → 4000 ms"]
    TM --> DSP

    subgraph Identity["Identity sync (backend)"]
        CK["Clerk"] -- "webhook" --> IN["Inngest"]
        IN --> FN["syncUserCreation / syncUserUpdate"]
        FN --> PR["Prisma"] --> DB[("PostgreSQL User table")]
    end
```

---

## 🗃️ Data Model (ER Diagram)

The Prisma schema (`server/prisma/schema.prisma`) currently contains the identity and workspace foundation inherited from the project scaffold. Payment entities are modelled in the front-end mock layer and mapped to the target SQL schema shown in the SDK Hub.

### Persisted today (PostgreSQL via Prisma)

```mermaid
erDiagram
    USER ||--o{ PROJECT : owns
    USER ||--o{ PROJECT_MEMBER : "member of"
    USER ||--o{ TASK : "assigned"
    USER ||--o{ TASK : "created"
    USER ||--o{ COMMENT : writes
    PROJECT ||--o{ PROJECT_MEMBER : has
    PROJECT ||--o{ TASK : contains
    TASK ||--o{ COMMENT : has

    USER {
        string id PK "Clerk user id"
        string email UK
        string name
        string imageUrl
        datetime createdAt
        datetime updatedAt
    }
    PROJECT {
        string id PK
        string name
        string description
        string ownerId FK
    }
    PROJECT_MEMBER {
        string id PK
        enum role "ADMIN | MEMBER | VIEWER"
        string userId FK
        string projectId FK
    }
    TASK {
        string id PK
        string title
        enum status "TODO | IN_PROGRESS | IN_REVIEW | DONE"
        enum priority "LOW | MEDIUM | HIGH | URGENT"
        datetime dueDate
        string projectId FK
        string assigneeId FK
        string creatorId FK
    }
    COMMENT {
        string id PK
        string content
        string taskId FK
        string authorId FK
    }
```

### Target ledger schema (Drunix / YugabyteDB, from the SDK Hub)

```mermaid
erDiagram
    REMIT_SETTLEMENT {
        varchar tx_id PK "0x… 66 chars"
        uuid uetr UK
        varchar channel_id
        numeric amount_inr
        numeric amount_origin
        varchar currency_origin
        numeric fx_rate
        varchar originator_account
        varchar beneficiary_ifsc
        varchar beneficiary_account
        varchar clearing_rail
        varchar status "COMMITTED | STALLED_DESTINATION | COMMITTED_RECOVERED"
        bigint block_number
        varchar committing_node
        varchar iso_message_type
        timestamptz created_at
        timestamptz recovered_at
    }
```

---

## 📨 ISO 20022 Messages

The **ISO Message Modal** renders real XML for each stage of the scenario.

| Message | Version | Role in the flow |
|---|---|---|
| `pacs.008` | 001.10 | FI-to-FI customer credit transfer, the initiation |
| `pacs.002` | 001.12 | Payment status report, carries the `RJCT / AC04` failure |
| `pacs.004` | 001.11 | Payment return / autonomous reroute notice |
| `camt.053` | 001.10 | Bank-to-customer statement, three-way balanced |

```mermaid
sequenceDiagram
    participant O as Originator Bank (Mashreq / Citi UAE)
    participant R as RemitSync
    participant H as HDFC RTGS Hub
    participant N as NPCI IMPS
    O->>R: pacs.008 credit transfer (₹75,000)
    R->>H: route via RTGS
    H--xR: pacs.002 RJCT AC04 (timeout)
    R->>R: diagnose and decide failover
    R->>N: pacs.004 reroute notice + IMPS dispatch
    N-->>R: credit confirmed (RRN)
    R->>O: camt.053 balanced statement
```

---

## 🧭 Application Pages

| Route | Page | Description |
|---|---|---|
| `/` | **Overview** | Corridor health cards, KPIs, transaction ledger, recent activity, "New Transfer" |
| `/transaction/:id` | **Transaction Inspector** | Lifecycle, failure alert, AI diagnosis, alternative rails, **Run Recovery**, audit trail, ISO viewer |
| `/drunix` | **Drunix Network** | 5-stage lifecycle explorer, peer topology, block explorer, SQL console |
| `/reconciliation` | **Reconciliation** | Three-way match, break simulator, `camt.053` inspector |
| `/corridors` | **Corridors & Rails** | Corridor metrics and rail health matrix |
| `/integration` | **Drunix SDK Hub** | Copy-ready Node.js SDK snippet and YugabyteDB SQL schema |

`/transaction` redirects to `/transaction/RSX-928173`. Unknown routes redirect to `/`.

---

## 🎯 Guided Demo Script

The 8-step **Demo Guide Bar** walks judges through the whole story.

| Step | Action | Where |
|---|---|---|
| 1 | **Open Overview**: see corridor health and the flagged transaction | `/` |
| 2 | **Click `RSX-928173`**: UAE (AED 3,285.50) → India (₹75,000) | `/transaction/RSX-928173` |
| 3 | **Inspect Failure State**: HDFC RTGS timeout at 14,200 ms (`RJCT / AC04`) | same |
| 4 | **Review AI Diagnosis**: liquidity verified, FX locked, IMPS recommended | same |
| 5 | **Click Run Recovery**: watch the multi-step autonomous failover | same |
| 6 | **Verify Settled State**: `SETTLED_RECOVERED`, Drunix Block #481210, `pacs.004` | same |
| 7 | **Open Drunix Network**: lifecycle, peers, SQL console | `/drunix` |
| 8 | **Open Reconciliation**: zero variance, then try the break simulator | `/reconciliation` |

**Scenario numbers:** FX 22.8275 AED/INR · fee AED 15 · failure latency 14,200 ms vs SLA 2,500 ms (568% over) · recovery latency 180 ms · Nostro pool `CITI-NOSTRO-INR-09`.

### Alternative rails evaluated by the diagnostician

| Rail | Status | Latency | Success rate | Cost delta | Chosen |
|---|---|---|---|---|---|
| NPCI IMPS (Citi Direct Gateway) | 🟢 OPTIMAL | 92 ms | 99.98% | ₹0.00 | ✅ |
| RBI RTGS Secondary (Axis Hub) | 🟠 DEGRADED | 8,400 ms | 89.20% | +₹18.00 | ❌ |
| Reverse to Originator (Nostro return) | 🔵 AVAILABLE | 2,100 ms | 100% | +AED 25.00 | ❌ |

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 7, React Router 7, Redux Toolkit 2, Tailwind CSS 4 |
| **UI / Viz** | Recharts, Lucide React, React Hot Toast, date-fns |
| **Auth** | Clerk (`@clerk/clerk-react`, `@clerk/express`), optional demo mode |
| **Backend** | Node.js (ESM), Express 5, CORS, dotenv |
| **Workflows** | Inngest (Clerk webhook → user sync) |
| **Database** | PostgreSQL through Prisma 7 (`prisma-client` generator) |
| **Domain standards** | ISO 20022 (`pacs.008/002/004`, `camt.053`), UETR |
| **Ledger (simulated)** | Drunix DLT, Raft ordering, Stateless Validation Service, YugabyteDB SQL |
| **Hosting** | Vercel (client SPA rewrites + `@vercel/node` server) |
| **Tooling** | ESLint 9, Nodemon |

---

## 📁 Project Structure

```text
Remitsync/
├── package.json                 # root scripts proxying to client
├── client/                      # React + Vite SPA
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json              # SPA rewrite → /
│   └── src/
│       ├── main.jsx             # Clerk-or-demo bootstrap
│       ├── App.jsx              # Route table
│       ├── app/store.js         # Redux store
│       ├── features/
│       │   ├── remitsyncSlice.js   # core domain state & reducers
│       │   ├── useAuth.js          # persona/role hook
│       │   ├── themeSlice.js
│       │   └── workspaceSlice.js   # legacy scaffold
│       ├── assets/
│       │   └── mockDrunixData.js   # transactions, blocks, peers, ISO XML, reconciliation
│       ├── pages/
│       │   ├── Layout.jsx
│       │   ├── Dashboard.jsx
│       │   ├── TransactionDetail.jsx
│       │   ├── DrunixNetwork.jsx
│       │   ├── Reconciliation.jsx
│       │   ├── CorridorsView.jsx
│       │   └── IntegrationHub.jsx
│       └── components/
│           ├── DemoGuideBar.jsx
│           ├── Navbar.jsx · Sidebar.jsx
│           ├── IsoMessageModal.jsx
│           └── NewTransferModal.jsx
└── server/                      # Express + Prisma + Inngest
    ├── server.js                # app bootstrap
    ├── inngest/index.js         # Clerk → DB sync functions
    ├── configs/prisma.js        # Prisma client
    ├── prisma.config.ts         # datasource / migrations config
    ├── prisma/schema.prisma     # data model
    └── vercel.json              # serverless deploy config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** and **npm**
- *(Optional, for the backend)* a **PostgreSQL** database, a **Clerk** application and an **Inngest** account

### 1. Clone

```bash
git clone https://github.com/charveemasand108/Remitsync.git
cd Remitsync
```

### 2. Run the demo (frontend only, no accounts needed)

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173**. With no Clerk key set, the app starts in **Institutional Demo Mode** and needs no login.

You can also run from the repo root:

```bash
npm run dev       # start Vite dev server
npm run build     # production build → client/dist
npm run preview   # preview the production build
npm run lint      # ESLint
```

### 3. Enable Clerk sign-in (optional)

Create `client/.env`:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxx
```

Any key starting with `pk_` switches the app from demo mode to Clerk-wrapped mode.

### 4. Run the backend (optional)

```bash
cd server
npm install
cp .env.example .env        # if you create one; see variables below
npx prisma generate
npx prisma migrate dev      # create tables
npm run dev                 # nodemon on http://localhost:5000
```

Health check: `GET /` returns `Server is live!`. The Inngest endpoint is served at `/api/inngest`.

For local Inngest development:

```bash
npx inngest-cli@latest dev -u http://localhost:5000/api/inngest
```

---

## 🔐 Environment Variables

### `client/.env`

| Variable | Required | Description |
|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | No | Clerk publishable key (`pk_…`). Omit to run in demo mode |

### `server/.env`

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | API port (default `5000`) |
| `DATABASE_URL` | Yes | PostgreSQL connection string (runtime) |
| `DIRECT_URL` | No | Direct (non-pooled) connection used by Prisma migrations; falls back to `DATABASE_URL` |
| `CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key for `clerkMiddleware` |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key |
| `INNGEST_EVENT_KEY` | Prod | Inngest event key |
| `INNGEST_SIGNING_KEY` | Prod | Inngest signing key for `/api/inngest` |

---

## ☁️ Deployment

```mermaid
flowchart LR
    DEV["👩‍💻 git push"] --> GH["GitHub"]
    GH --> V1["Vercel Project A<br/>root: client/"]
    GH --> V2["Vercel Project B<br/>root: server/"]
    V1 --> SPA["Static SPA<br/>rewrite /(.*) → /"]
    V2 --> FN["@vercel/node<br/>server.js"]
    FN --> DB[("Managed PostgreSQL")]
    CLK["Clerk"] -- "webhooks" --> INN["Inngest Cloud"] --> FN
    SPA -. "VITE_CLERK_PUBLISHABLE_KEY" .-> CLK
```

- **Client:** deploy `client/` to Vercel (build `npm run build`, output `dist`). `client/vercel.json` rewrites all paths to `/` for SPA routing.
- **Server:** deploy `server/` to Vercel; `server/vercel.json` routes all requests to `server.js` via `@vercel/node`.
- Set all environment variables in the Vercel project settings.

---

## 🧪 Current Status & Roadmap

An honest map of what is implemented and what is simulated:

| Area | Status |
|---|---|
| Dashboard, Transaction Inspector, Drunix, Reconciliation, Corridors, SDK Hub UI | ✅ Implemented |
| Recovery workflow, role switching, break simulator, SQL console, ISO XML viewer | ✅ Implemented (client-side simulation over mock data) |
| Guided 8-step demo + demo (no-login) mode | ✅ Implemented |
| Clerk auth (optional) | ✅ Implemented |
| Clerk → PostgreSQL user sync via Inngest | ✅ Implemented |
| Payment / transaction persistence in PostgreSQL | 🔜 Not yet, transactions live in mock data and Redux |
| REST API for remittances (`/api/*`) | 🔜 `server.js` mounts `./api/index.js`, which is not in the repo yet |
| Real ISO 20022 gateway and rail connectors | 🔮 Planned |
| Real Drunix / YugabyteDB integration (SDK Hub snippet is illustrative) | 🔮 Planned |
| Real AI diagnostician (currently deterministic scripted output) | 🔮 Planned |
| Automated tests / CI | 🔮 Planned |

### Roadmap

```mermaid
gantt
    title REMITSYNC Roadmap
    dateFormat  YYYY-MM-DD
    axisFormat  %b
    section Foundation
    Hackathon demo UI (done)           :done, a1, 2026-09-01, 2026-09-30
    section Backend
    Remittance REST API + Prisma models :b1, 2026-10-01, 30d
    Real-time status via WebSockets/SSE :b2, after b1, 21d
    section Integration
    ISO 20022 gateway (pacs / camt)     :c1, after b1, 45d
    Drunix SDK + YugabyteDB connector   :c2, after c1, 45d
    section Intelligence
    ML/LLM diagnosis engine             :d1, after b2, 45d
    Rail-scoring and routing optimizer  :d2, after d1, 30d
    section Quality
    Test suite + CI/CD + observability  :e1, after b1, 60d
```

> The roadmap dates are indicative and meant to show sequencing, not commitments.

---

.

---



<div align="center">

**REMITSYNC** · Built for the **Citi × NPCI Drunix Hackathon 2026**

*From ambiguous `IN-FLIGHT` to verified, reconciled, settled.*

</div>
