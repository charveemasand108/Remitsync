// REMITSYNC - Citi x NPCI Drunix Hackathon 2026 Mock Data Engine
// Authentic institutional banking data, ISO 20022 payloads, Drunix DLT topology, and YugabyteDB ledger records.

export const INITIAL_TRANSACTION_RSX928173 = {
    id: "RSX-928173",
    uetr: "e8f47c92-6a10-4e3b-9a8c-2891b7d5410a",
    corridor: "UAE_INDIA",
    corridorLabel: "UAE (AED) → India (INR)",
    originCountry: "United Arab Emirates",
    originCountryCode: "AE",
    originCurrency: "AED",
    originAmount: 3285.50,
    destCountry: "India",
    destCountryCode: "IN",
    destCurrency: "INR",
    destAmount: 75000.00,
    fxRate: 22.8275,
    fxSpread: "0.12%",
    fee: "AED 15.00",
    originator: {
        name: "Emirates Tech Logistics FZ-LLC",
        accountNumber: "AE44 0330 0000 1289 4819 01",
        bank: "Mashreq Bank Dubai",
        bic: "BOMLAEADXXX",
        kycStatus: "VERIFIED",
        amlRiskScore: 0.02
    },
    beneficiary: {
        name: "Bharat Precision Engineering Pvt Ltd",
        accountNumber: "003-882910-112",
        bank: "Citi India Institutional Client Group",
        ifsc: "CITI0000003",
        city: "Mumbai, India",
        upiId: "bharatprecision@citibank"
    },
    initialRoute: {
        originRail: "CIB-UAE-FTS (UAE Central Bank Funds Transfer System)",
        intermediary: "Citi Treasury and Trade Solutions (TTS) UAE",
        destGateway: "HDFC Bank RTGS Gateway (IN-MUM-GW-04)",
        clearingChannel: "RTGS-DOMESTIC-IN"
    },
    recoveredRoute: {
        originRail: "CIB-UAE-FTS (UAE Central Bank Funds Transfer System)",
        intermediary: "Citi Treasury and Trade Solutions (TTS) UAE / India",
        destGateway: "NPCI National IMPS / UPI Switch (Citi Direct Node)",
        clearingChannel: "NPCI-IMPS-INSTANT-INR"
    },
    timestamp: "2026-09-30T14:22:10.420Z",
    failureTimestamp: "2026-09-30T14:22:24.620Z",
    failureDetails: {
        errorCode: "RJCT / AC04",
        errorCategory: "DOWNSTREAM_GATEWAY_TIMEOUT",
        failingNode: "HDFC Bank RTGS Inbound Hub (IN-MUM-GW-04)",
        latencyRecorded: "14,200ms",
        slaThreshold: "2,500ms",
        rawStatusReason: "DS04: Downstream switch heartbeat expired. Inbound RTGS settlement window closed for batch 894."
    },
    aiDiagnosis: {
        confidenceScore: 0.994,
        primaryIssue: "Downstream beneficiary clearing gateway timed out at 14,200ms (exceeded SLA by 568%).",
        liquidityStatus: "Verified. Citi Treasury India Nostro account pool #CITI-NOSTRO-INR-09 holds ₹24,500,000 surplus float.",
        fxRisk: "Zero FX slippage risk. FX rate 22.8275 AED/INR is locked on Drunix smart contract until 16:00 UTC.",
        recommendedAction: "Execute dynamic autonomous failover to NPCI IMPS Clearing Rail via Citi Direct Node. Estimated latency: 180ms.",
        alternativeRails: [
            {
                name: "NPCI IMPS Rail (Citi Direct Gateway)",
                status: "OPTIMAL",
                latency: "92ms",
                successRate: "99.98%",
                costDelta: "₹0.00 (Tier-1 Partner)",
                recommended: true
            },
            {
                name: "RBI RTGS Secondary Corridor (Axis Hub)",
                status: "DEGRADED",
                latency: "8,400ms",
                successRate: "89.20%",
                costDelta: "+₹18.00",
                recommended: false
            },
            {
                name: "Reverse to Originator (Nostro Return)",
                status: "AVAILABLE",
                latency: "2,100ms",
                successRate: "100%",
                costDelta: "+AED 25.00 Return Fee",
                recommended: false
            }
        ]
    },
    drunixState: {
        channel: "citi-npci-crossborder-ch1",
        chaincode: "remitsync-settlement-cc:v2.4",
        initialBlock: 481209,
        recoveryBlock: 481210,
        txId: "0x89f41b9c24018e6a17b049382104d8ef2718903c5b81a2e9471f40294716bc2a",
        endorsements: [
            { peer: "lite-peer0.citi.ae", org: "Citi UAE", signedAt: "2026-09-30T14:22:11.102Z", certHash: "0x4b78...ae01" },
            { peer: "lite-peer1.npci.in", org: "NPCI Gateway", signedAt: "2026-09-30T14:22:11.238Z", certHash: "0x98cd...in02" }
        ],
        svsValidationTimeMs: 14,
        yugabyteCommitTimeMs: 22
    }
};

export const CORRIDOR_TRANSACTIONS = [
    INITIAL_TRANSACTION_RSX928173,
    {
        id: "RSX-810294",
        uetr: "c41a9982-1209-482a-bc91-3829104829bc",
        corridor: "SGP_INDIA",
        corridorLabel: "Singapore (SGD) → India (INR)",
        originCountry: "Singapore",
        originCountryCode: "SG",
        originCurrency: "SGD",
        originAmount: 15200.00,
        destCountry: "India",
        destCountryCode: "IN",
        destCurrency: "INR",
        destAmount: 942400.00,
        fxRate: 62.00,
        status: "SETTLED",
        rail: "NPCI UPI-Direct / PayNow-UPI Link",
        originator: { name: "SingaTrade Global Pte Ltd", bank: "DBS Singapore" },
        beneficiary: { name: "Kaveri Export Hub Chennai", bank: "Citi India" },
        timestamp: "2026-09-30T14:18:40.000Z",
        latency: "410ms",
        drunixBlock: 481208
    },
    {
        id: "RSX-739102",
        uetr: "7a21098e-4910-4829-94bc-482910482910",
        corridor: "USA_INDIA",
        corridorLabel: "USA (USD) → India (INR)",
        originCountry: "United States",
        originCountryCode: "US",
        originCurrency: "USD",
        originAmount: 8500.00,
        destCountry: "India",
        destCountryCode: "IN",
        destCurrency: "INR",
        destAmount: 705500.00,
        fxRate: 83.00,
        status: "IN_FLIGHT",
        rail: "Fedwire → Citi TTS NY → NPCI NEFT",
        originator: { name: "Apex Cloud Services LLC", bank: "Citibank N.A. NY" },
        beneficiary: { name: "Infoware Tech Solutions Bengaluru", bank: "ICICI Bank" },
        timestamp: "2026-09-30T14:24:02.000Z",
        latency: "1,120ms",
        drunixBlock: 481209
    },
    {
        id: "RSX-619283",
        uetr: "fa091823-1129-47bb-a901-789123401829",
        corridor: "GBR_INDIA",
        corridorLabel: "UK (GBP) → India (INR)",
        originCountry: "United Kingdom",
        originCountryCode: "GB",
        originCurrency: "GBP",
        originAmount: 2100.00,
        destCountry: "India",
        destCountryCode: "IN",
        destCurrency: "INR",
        destAmount: 222600.00,
        fxRate: 106.00,
        status: "SETTLED",
        rail: "CHAPS → Citi UK → NPCI IMPS",
        originator: { name: "North Star Media Ltd London", bank: "Barclays Bank UK" },
        beneficiary: { name: "Deccan Animation Studios Hyderabad", bank: "Citi India" },
        timestamp: "2026-09-30T14:10:15.000Z",
        latency: "620ms",
        drunixBlock: 481205
    },
    {
        id: "RSX-509124",
        uetr: "6b910283-9912-4cba-b291-889102491029",
        corridor: "SAU_INDIA",
        corridorLabel: "Saudi Arabia (SAR) → India (INR)",
        originCountry: "Saudi Arabia",
        originCountryCode: "SA",
        originCurrency: "SAR",
        originAmount: 12000.00,
        destCountry: "India",
        destCountryCode: "IN",
        destCurrency: "INR",
        destAmount: 268800.00,
        fxRate: 22.40,
        status: "SETTLED",
        rail: "SARIE → Citi Riyadh → NPCI RTGS",
        originator: { name: "Al-Noor PetroChem Contracting", bank: "Al Rajhi Bank" },
        beneficiary: { name: "Gujarat Valving & Piping Corp", bank: "Citi India" },
        timestamp: "2026-09-30T14:02:50.000Z",
        latency: "510ms",
        drunixBlock: 481202
    }
];

export const DRUNIX_LIFECYCLE_STAGES = [
    {
        id: "PROPOSED",
        number: 1,
        title: "Proposed",
        subtitle: "Client Gateway Payload Submission",
        nodeRole: "RemitSync Client Gateway",
        description: "Transaction proposal is packaged with ISO 20022 pacs.008 metadata, originator credentials, and cryptographic hash of UETR.",
        detail: "The client application or bank API creates a transaction proposal signed with the participant's TLS X.509 certificate. No state changes occur yet.",
        metric: "Payload: 1.8 KB",
        latency: "8ms"
    },
    {
        id: "ENDORSED",
        number: 2,
        title: "Endorsed",
        subtitle: "Lite Peers Simulation & Multisig",
        nodeRole: "Drunix Lite Peers (Citi UAE + NPCI Gateway)",
        description: "Drunix Lite Peers execute smart contract chaincode simulation in isolated sandboxes to verify balance locks without write locking the ledger.",
        detail: "Drunix segregates peers into Lite Peers (endorsement) and Committing Peers. Lite peers execute chaincode simulations and return cryptographic signatures satisfying the 2-of-2 endorsement policy.",
        metric: "Endorsement Policy: 2-of-2 Multisig",
        latency: "42ms"
    },
    {
        id: "ORDERED",
        number: 3,
        title: "Ordered",
        subtitle: "Raft Consensus Sequencing",
        nodeRole: "Drunix Raft Orderer Cluster",
        description: "Orderers collect endorsed proposals, enforce strict total order, and assemble them into immutable cryptographically chained blocks.",
        detail: "Crash fault-tolerant Raft orderer cluster sequences transactions deterministically, creating Merkle tree state roots and block headers without re-executing chaincode.",
        metric: "Batch Size: 250 txs / 250ms batch timeout",
        latency: "68ms"
    },
    {
        id: "VALIDATED",
        number: 4,
        title: "Validated",
        subtitle: "Stateless Validation Service (SVS)",
        nodeRole: "Drunix Stateless Validation Cluster",
        description: "Decoupled validation workers verify read-write set versions, signature validity, and checks against double-spend in parallel.",
        detail: "NPCI Drunix's decoupled Stateless Validation Service (SVS) scales horizontally. It validates read-write conflict freedom without holding ledger state locks, preventing bottlenecks.",
        metric: "Parallel Workers: 16 | Conflict check: PASS",
        latency: "14ms"
    },
    {
        id: "COMMITTED",
        number: 5,
        title: "Committed",
        subtitle: "YugabyteDB Distributed SQL Write",
        nodeRole: "Committing Peers & YugabyteDB Cluster",
        description: "Committing peers persist the block and commit ACID ledger updates directly into distributed SQL tables (YugabyteDB).",
        detail: "Unlike legacy Hyperledger Fabric's LevelDB/CouchDB key-value stores, Drunix writes to YugabyteDB distributed SQL, allowing instant SQL analytics, foreign keys, and enterprise queries.",
        metric: "SQL Table: drunix_ledger.remit_settlement",
        latency: "22ms"
    }
];

export const DRUNIX_BLOCKS = [
    {
        blockNumber: 481210,
        txCount: 1,
        channel: "citi-npci-crossborder-ch1",
        dataHash: "0x7f3c9a18d99e0481b7e012984ac73910eb672901a8ef109284729104829104bc",
        prevHash: "0x3e18a99471920bca7104928174920bc910294871920384719203847192038471",
        timestamp: "2026-09-30T14:23:45.108Z",
        producer: "orderer0.drunix.citigroup.com",
        transactions: [
            {
                txId: "0x89f41b9c24018e6a17b049382104d8ef2718903c5b81a2e9471f40294716bc2a",
                uetr: "e8f47c92-6a10-4e3b-9a8c-2891b7d5410a",
                action: "AUTONOMOUS_REROUTE_SETTLE",
                chaincode: "remitsync-settlement-cc",
                amountInr: 75000.00,
                rail: "NPCI_IMPS_CITI_DIRECT",
                validationCode: "VALID",
                yugabyteStatus: "COMMITTED"
            }
        ]
    },
    {
        blockNumber: 481209,
        txCount: 4,
        channel: "citi-npci-crossborder-ch1",
        dataHash: "0x3e18a99471920bca7104928174920bc910294871920384719203847192038471",
        prevHash: "0x9920194820194820194820194820194820194820194820194820194820194820",
        timestamp: "2026-09-30T14:22:12.340Z",
        producer: "orderer1.npci.org.in",
        transactions: [
            {
                txId: "0x12a9910482910482910482910482910482910482910482910482910482910482",
                uetr: "e8f47c92-6a10-4e3b-9a8c-2891b7d5410a",
                action: "INITIATE_CROSSBORDER_TRANSFER",
                chaincode: "remitsync-settlement-cc",
                amountInr: 75000.00,
                rail: "HDFC_RTGS_PRIMARY",
                validationCode: "VALID",
                yugabyteStatus: "STALLED_DESTINATION"
            }
        ]
    },
    {
        blockNumber: 481208,
        txCount: 8,
        channel: "citi-npci-crossborder-ch1",
        dataHash: "0x9920194820194820194820194820194820194820194820194820194820194820",
        prevHash: "0x4481029481029481029481029481029481029481029481029481029481029481",
        timestamp: "2026-09-30T14:18:41.012Z",
        producer: "orderer0.drunix.citigroup.com",
        transactions: [
            {
                txId: "0x5501928301928301928301928301928301928301928301928301928301928301",
                uetr: "c41a9982-1209-482a-bc91-3829104829bc",
                action: "SETTLE_UPI_LINK",
                chaincode: "remitsync-settlement-cc",
                amountInr: 942400.00,
                rail: "NPCI_UPI_DIRECT",
                validationCode: "VALID",
                yugabyteStatus: "COMMITTED"
            }
        ]
    }
];

export const DRUNIX_PEERS_TOPOLOGY = [
    {
        id: "lite-peer0.citi.ae",
        role: "Lite Peer (Endorsement Only)",
        organization: "Citi Treasury UAE",
        location: "Dubai Financial District (DIFC)",
        status: "ONLINE",
        cpu: "14%",
        latency: "12ms",
        roleDescription: "Simulates smart contract proposals; generates cryptographic endorsements without disk state bloat."
    },
    {
        id: "lite-peer1.npci.in",
        role: "Lite Peer (Endorsement Only)",
        organization: "NPCI Drunix Gateway",
        location: "Mumbai Data Center, BKC",
        status: "ONLINE",
        cpu: "18%",
        latency: "18ms",
        roleDescription: "Validates NPCI cross-border corridor rules and endorses payment initiation requests."
    },
    {
        id: "committing-peer0.citi.in",
        role: "Committing Peer (YugabyteDB State)",
        organization: "Citi India Institutional",
        location: "Mumbai Financial Hub",
        status: "ONLINE",
        cpu: "26%",
        latency: "15ms",
        roleDescription: "Applies ordered blocks to local ledger and updates YugabyteDB distributed SQL database."
    },
    {
        id: "committing-peer1.npci.in",
        role: "Committing Peer (YugabyteDB State)",
        organization: "NPCI Settlement Core",
        location: "Hyderabad Disaster Recovery Site",
        status: "ONLINE",
        cpu: "22%",
        latency: "24ms",
        roleDescription: "Synchronizes national payment ledger with instantaneous multi-region consensus."
    },
    {
        id: "svs-cluster-01.drunix.org",
        role: "Stateless Validation Service (SVS)",
        organization: "Drunix Foundation / Citi-NPCI Consortium",
        location: "Distributed Multi-Zone",
        status: "ONLINE",
        cpu: "31%",
        latency: "14ms",
        roleDescription: "Horizontally scalable validation service executing parallel verification of read-write sets."
    },
    {
        id: "orderer0.drunix.citigroup.com",
        role: "Raft Consensus Orderer",
        organization: "Citi Network Infrastructure",
        location: "London Regional Hub",
        status: "ONLINE",
        cpu: "19%",
        latency: "28ms",
        roleDescription: "Sequences transactions into cryptographically signed Raft blocks."
    }
];

export const ISO_20022_MESSAGES = {
    pacs008: {
        type: "pacs.008.001.10",
        name: "Financial Institutional Customer Credit Transfer",
        description: "Sent from Mashreq / Citi UAE to initiate credit transfer for ₹75,000 to beneficiary in India.",
        timestamp: "2026-09-30T14:22:10.420Z",
        content: `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.008.001.10">
  <FIToFICstmrCdtTrf>
    <GrpHdr>
      <MsgId>CITI-AE-20260930-89104819</MsgId>
      <CreDtTm>2026-09-30T14:22:10.420Z</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <SttlmInf>
        <SttlmMtd>CLRG</SttlmMtd>
        <ClrSys>
          <Prtry>DRUNIX-CITI-NPCI</Prtry>
        </ClrSys>
      </SttlmInf>
    </GrpHdr>
    <CdtTrfTxInf>
      <PmtId>
        <EndToEndId>RSX-928173</EndToEndId>
        <UETR>e8f47c92-6a10-4e3b-9a8c-2891b7d5410a</UETR>
      </PmtId>
      <IntrBkSttlmAmt Ccy="INR">75000.00</IntrBkSttlmAmt>
      <InstdAmt Ccy="AED">3285.50</InstdAmt>
      <XchgRate>22.8275</XchgRate>
      <Dbtr>
        <Nm>Emirates Tech Logistics FZ-LLC</Nm>
      </Dbtr>
      <Cdtr>
        <Nm>Bharat Precision Engineering Pvt Ltd</Nm>
        <CdtrAgt>
          <FinInstnId>
            <ClrSysMmbId>
              <MmbId>CITI0000003</MmbId>
            </ClrSysMmbId>
          </FinInstnId>
        </CdtrAgt>
      </Cdtr>
    </CdtTrfTxInf>
  </FIToFICstmrCdtTrf>
</Document>`
    },
    pacs002_failure: {
        type: "pacs.002.001.12",
        name: "Payment Status Report (Failure Alert)",
        description: "Sent from downstream clearing hub indicating timeout on destination RTGS switch.",
        timestamp: "2026-09-30T14:22:24.620Z",
        content: `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.002.001.12">
  <FIToFIPmtStsRpt>
    <GrpHdr>
      <MsgId>HDFC-IN-STAT-20260930-49102</MsgId>
      <CreDtTm>2026-09-30T14:22:24.620Z</CreDtTm>
    </GrpHdr>
    <TxInfAndSts>
      <OrgnlEndToEndId>RSX-928173</OrgnlEndToEndId>
      <OrgnlUETR>e8f47c92-6a10-4e3b-9a8c-2891b7d5410a</OrgnlUETR>
      <TxSts>RJCT</TxSts>
      <StsRsnInf>
        <Rsn>
          <Cd>AC04</Cd>
        </Rsn>
        <AddtlInf>DS04: HDFC RTGS gateway timed out (14,200ms). Cut-off expired.</AddtlInf>
      </StsRsnInf>
    </TxInfAndSts>
  </FIToFIPmtStsRpt>
</Document>`
    },
    pacs004_recovery: {
        type: "pacs.004.001.11",
        name: "Payment Return & Autonomous Reroute Notice",
        description: "Issued by RemitSync over Drunix to cancel stalled route and reroute over NPCI IMPS / Citi Direct rail.",
        timestamp: "2026-09-30T14:23:44.200Z",
        content: `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.004.001.11">
  <PmtRtr>
    <GrpHdr>
      <MsgId>REMITSYNC-REROUTE-20260930-001</MsgId>
      <CreDtTm>2026-09-30T14:23:44.200Z</CreDtTm>
    </GrpHdr>
    <TxInf>
      <OrgnlUETR>e8f47c92-6a10-4e3b-9a8c-2891b7d5410a</OrgnlUETR>
      <RtrdIntrBkSttlmAmt Ccy="INR">75000.00</RtrdIntrBkSttlmAmt>
      <RtrRsnInf>
        <Rsn>
          <Prtry>DRUNIX_AUTONOMOUS_REROUTE_SUCCESS</Prtry>
        </Rsn>
        <AddtlInf>Rerouted via NPCI IMPS Rail (Citi Direct Clearing Node). Drunix Block #481210.</AddtlInf>
      </RtrRsnInf>
    </TxInf>
  </PmtRtr>
</Document>`
    },
    camt053: {
        type: "camt.053.001.10",
        name: "Bank-to-Customer Statement (Three-Way Balanced)",
        description: "Daily end-of-cycle cross-border reconciliation statement verifying zero Nostro variance.",
        timestamp: "2026-09-30T14:25:00.000Z",
        content: `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.053.001.10">
  <BkToCstmrStmt>
    <GrpHdr>
      <MsgId>STMT-CITI-NPCI-20260930</MsgId>
      <CreDtTm>2026-09-30T14:25:00.000Z</CreDtTm>
    </GrpHdr>
    <Stmt>
      <Id>STMT-NOSTRO-INR-20260930</Id>
      <Acct>
        <Id>
          <Othr>
            <Id>CITI-NOSTRO-INR-09</Id>
          </Othr>
        </Id>
        <Ccy>INR</Ccy>
      </Acct>
      <Bal>
        <Tp>
          <CdOrPrtry>
            <Cd>CLBD</Cd>
          </CdOrPrtry>
        </Tp>
        <Amt Ccy="INR">24425000.00</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
        <Dt>
          <Dt>2026-09-30</Dt>
        </Dt>
      </Bal>
      <Ntry>
        <Amt Ccy="INR">75000.00</Amt>
        <CdtDbtInd>DBIT</CdtDbtInd>
        <Sts>BOOK</Sts>
        <NtryDtls>
          <TxDtls>
            <Refs>
              <EndToEndId>RSX-928173</EndToEndId>
              <UETR>e8f47c92-6a10-4e3b-9a8c-2891b7d5410a</UETR>
            </Refs>
          </TxDtls>
        </NtryDtls>
      </Ntry>
    </Stmt>
  </BkToCstmrStmt>
</Document>`
    }
};

export const RECONCILIATION_DATA = {
    summary: {
        totalVolumeInr: 412800000.00,
        transactionsCount: 1420,
        threeWayMatchedRate: "100.00%",
        varianceAmountInr: 0.00,
        nostroPoolBalanceInr: 24425000.00,
        lastReconciliationRun: "2026-09-30T14:24:00.000Z",
        status: "BALANCED_ZERO_VARIANCE"
    },
    systems: [
        {
            name: "Citi TTS Core Banking",
            role: "Debtor & Nostro Ledger",
            account: "CITI-NOSTRO-INR-09",
            recordedAmountInr: 75000.00,
            status: "CLEARED_DEBIT",
            ref: "CITI-TTS-AE-928173",
            timestamp: "2026-09-30T14:22:10.500Z"
        },
        {
            name: "Drunix Distributed Ledger",
            role: "Single Source of Truth",
            blockNumber: 481210,
            recordedAmountInr: 75000.00,
            status: "COMMITTED_RECOVERED",
            ref: "0x89f41b9c24018e6a17b049382104d8ef...",
            timestamp: "2026-09-30T14:23:45.108Z"
        },
        {
            name: "NPCI Clearing Gateway",
            role: "Creditor Settlement Switch",
            rrn: "429188201948",
            recordedAmountInr: 75000.00,
            status: "CREDIT_CONFIRMED",
            ref: "NPCI-IMPS-IN-42918820",
            timestamp: "2026-09-30T14:23:45.920Z"
        }
    ]
};

export const DEMO_STEPS = [
    {
        step: 1,
        title: "Open Overview",
        description: "View real-time cross-border corridors, health metrics, and active transaction ledger.",
        targetRoute: "/",
        actionHint: "Observe corridor health cards and the transaction list. Notice RSX-928173 is flagged."
    },
    {
        step: 2,
        title: "Click RSX-928173",
        description: "Select the highlighted high-value remittance: UAE (AED 3,285.50) → India (₹75,000).",
        targetRoute: "/transaction/RSX-928173",
        actionHint: "Click transaction RSX-928173 in the table to open the detailed transaction inspector."
    },
    {
        step: 3,
        title: "Inspect Failure State",
        description: "Observe the 6-stage lifecycle and the deliberate destination clearing failure.",
        targetRoute: "/transaction/RSX-928173",
        actionHint: "Inspect the failure alert: HDFC RTGS gateway timed out at 14,200ms (RJCT / AC04)."
    },
    {
        step: 4,
        title: "Review AI Diagnosis",
        description: "Understand the human-grade operational telemetry, root cause, and rail availability.",
        targetRoute: "/transaction/RSX-928173",
        actionHint: "Review the AI Diagnostician card: Verified Nostro liquidity and recommended NPCI IMPS failover."
    },
    {
        step: 5,
        title: "Click 'Run Recovery'",
        description: "Execute autonomous failover over Drunix distributed ledger with zero FX slippage.",
        targetRoute: "/transaction/RSX-928173",
        actionHint: "Click the prominent 'Run Recovery' button to trigger the multi-step recovery sequence."
    },
    {
        step: 6,
        title: "Verify Settled State",
        description: "Confirm transition to SETTLED (RECOVERED) with cryptographic Drunix receipts.",
        targetRoute: "/transaction/RSX-928173",
        actionHint: "Review the updated audit trail, Drunix Block #481210 commit, and ISO 20022 pacs.004."
    },
    {
        step: 7,
        title: "Open Drunix Network",
        description: "Explore the 5-stage DLT lifecycle: proposed → endorsed → ordered → validated → committed.",
        targetRoute: "/drunix",
        actionHint: "Navigate to Drunix Network to inspect Lite Peers, Committing Peers, SVS, and YugabyteDB SQL."
    },
    {
        step: 8,
        title: "Open Reconciliation",
        description: "Validate cross-system consistency (3-way match: Citi TTS vs Drunix vs NPCI Gateway).",
        targetRoute: "/reconciliation",
        actionHint: "Verify zero variance across all three systems and test the interactive break simulator."
    }
];

export const CORRIDOR_METRICS = [
    {
        id: "uae-inr",
        corridor: "UAE 🇦🇪 → India 🇮🇳",
        status: "ALERT",
        alertReason: "1 Stalled (HDFC RTGS)",
        volume24h: "AED 4.2M (₹95.8M)",
        avgLatency: "480ms",
        primaryRail: "NPCI UPI-Direct / CIB-FTS",
        activeTxs: 142,
        stpRate: "98.6%"
    },
    {
        id: "sgp-inr",
        corridor: "Singapore 🇸🇬 → India 🇮🇳",
        status: "HEALTHY",
        alertReason: "Optimal",
        volume24h: "SGD 2.8M (₹173.6M)",
        avgLatency: "390ms",
        primaryRail: "PayNow-UPI Linkage",
        activeTxs: 210,
        stpRate: "99.9%"
    },
    {
        id: "usa-inr",
        corridor: "USA 🇺🇸 → India 🇮🇳",
        status: "HEALTHY",
        alertReason: "Optimal",
        volume24h: "USD 1.1M (₹91.3M)",
        avgLatency: "1,140ms",
        primaryRail: "Fedwire → Citi TTS → NEFT",
        activeTxs: 88,
        stpRate: "99.2%"
    },
    {
        id: "gbr-inr",
        corridor: "UK 🇬🇧 → India 🇮🇳",
        status: "HEALTHY",
        alertReason: "Optimal",
        volume24h: "GBP 480K (₹50.8M)",
        avgLatency: "610ms",
        primaryRail: "CHAPS → Citi UK → IMPS",
        activeTxs: 64,
        stpRate: "99.4%"
    }
];
