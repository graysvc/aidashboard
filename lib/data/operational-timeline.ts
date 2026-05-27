/**
 * Operational Timeline (BackOffice) — data model + demo events.
 *
 * Each `OperationalEvent` represents a voice note received from a realtor,
 * plus the AI extraction the system produced from that note. BackOffice
 * users review, edit, approve, reject, or merge the AI's suggestions and
 * that activity becomes the training signal for the operational copilot.
 */

export type OperationalEventStatus =
  | "pending" // pending review
  | "approved" // approved as-is
  | "edited" // approved with edits
  | "rejected" // not actionable
  | "synced"; // pushed to CRM / assistant dashboard

export const STATUS_LABEL: Record<OperationalEventStatus, string> = {
  pending: "Pending review",
  approved: "Approved",
  edited: "Edited",
  rejected: "Rejected",
  synced: "Synced",
};

export type Realtor = {
  id: string;
  name: string;
  shortName: string; // "Maria G."
  initials: string; // "MG"
  /** Tailwind color token used for the avatar background. */
  avatarBg: string;
  /** Tailwind color token used for the avatar foreground (initials). */
  avatarFg: string;
};

export type DayBucket = "today" | "yesterday" | "earlier";

export type DetectedContext = {
  contact?: string;
  transaction?: string;
  intent: string;
  category: string;
};

export type SuggestedTask = {
  id: string;
  text: string;
};

export type DetectedRisk = {
  id: string;
  text: string;
  severity: "low" | "medium" | "high";
};

export type CRMUpdate = {
  id: string;
  field: string;
  text: string;
};

export type OperationalEvent = {
  id: string;
  realtor: Realtor;
  receivedAtLabel: string; // "9:12 AM"
  dayBucket: DayBucket;
  earlierLabel?: string; // "2 days ago" / "May 22"
  source: "voice";
  status: OperationalEventStatus;
  audioDuration: string; // "1:32"
  /** Used to fake a waveform — array of heights 1-10. */
  waveform: number[];
  transcriptPreview: string;
  transcript: string;
  detectedContext: DetectedContext;
  suggestedTasks: SuggestedTask[];
  detectedRisks: DetectedRisk[];
  crmUpdates: CRMUpdate[];
  /** 0-100. */
  confidence: number;
  /** Already-actioned counters (when status !== "pending"). */
  approvedCount: number;
  editedCount: number;
  rejectedCount: number;
};

export const DAY_LABEL: Record<DayBucket, string> = {
  today: "Today",
  yesterday: "Yesterday",
  earlier: "Earlier",
};

export const DAY_ORDER: DayBucket[] = ["today", "yesterday", "earlier"];

// ─── Realtors ────────────────────────────────────────────────────────────

export const REALTORS: Record<string, Realtor> = {
  maria: {
    id: "maria",
    name: "Maria Gonzalez",
    shortName: "Maria G.",
    initials: "MG",
    avatarBg: "bg-[hsl(28_55%_88%)]",
    avatarFg: "text-[hsl(28_45%_28%)]",
  },
  carlos: {
    id: "carlos",
    name: "Carlos Rivera",
    shortName: "Carlos R.",
    initials: "CR",
    avatarBg: "bg-[hsl(205_50%_88%)]",
    avatarFg: "text-[hsl(205_50%_26%)]",
  },
  diana: {
    id: "diana",
    name: "Diana Lopez",
    shortName: "Diana L.",
    initials: "DL",
    avatarBg: "bg-[hsl(150_35%_85%)]",
    avatarFg: "text-[hsl(150_45%_24%)]",
  },
};

// ─── Demo events ─────────────────────────────────────────────────────────

const WAVE_A = [3, 5, 7, 4, 6, 8, 6, 4, 7, 5, 3, 4, 6, 7, 5, 3, 2, 4, 5];
const WAVE_B = [4, 6, 8, 7, 5, 3, 5, 7, 9, 7, 5, 4, 6, 8, 6, 4, 3, 5, 6, 4];
const WAVE_C = [2, 4, 6, 5, 7, 8, 6, 4, 3, 5, 7, 5, 3, 4, 6, 7, 8, 6, 4, 2];

export const OPERATIONAL_EVENTS: OperationalEvent[] = [
  {
    id: "ev-1",
    realtor: REALTORS.maria,
    receivedAtLabel: "9:12 AM",
    dayBucket: "today",
    source: "voice",
    status: "pending",
    audioDuration: "1:32",
    waveform: WAVE_A,
    transcriptPreview:
      "Need to follow up with Sanchez's lender today — he's been silent for two days and we have an appraisal contingency expiring Friday.",
    transcript:
      "Hey, Maria here. Need to follow up with Sanchez's lender today — he's been silent for two days and we have an appraisal contingency expiring Friday. Also, the buyer asked about the survey, can you pull it from the file? Last thing — let's bump the closing call from Thursday to Wednesday if the title company already has the docs ready.",
    detectedContext: {
      contact: "Carlos Sanchez",
      transaction: "412 Sunset Dr",
      intent: "Follow-up + escalation",
      category: "Financing",
    },
    suggestedTasks: [
      { id: "t1", text: "Call Sanchez's lender today" },
      { id: "t2", text: "Send buyer the property survey" },
      { id: "t3", text: "Reschedule closing call: Thu → Wed" },
    ],
    detectedRisks: [
      {
        id: "r1",
        text: "Appraisal contingency expires Friday — lender silent 2 days",
        severity: "high",
      },
    ],
    crmUpdates: [
      { id: "c1", field: "Sanchez deal", text: "Lender unresponsive — 2 days" },
    ],
    confidence: 82,
    approvedCount: 0,
    editedCount: 0,
    rejectedCount: 0,
  },
  {
    id: "ev-2",
    realtor: REALTORS.carlos,
    receivedAtLabel: "10:48 AM",
    dayBucket: "today",
    source: "voice",
    status: "pending",
    audioDuration: "0:58",
    waveform: WAVE_B,
    transcriptPreview:
      "Showing at 89 Brickell went great, the Adams couple wants to make an offer this afternoon, we need the disclosures ready.",
    transcript:
      "Showing at 89 Brickell went really well — the Adams couple wants to make an offer this afternoon. We need the disclosures ready, plus the HOA docs. They asked about the parking assignment, I told them I'd confirm. Get back to them before 2 PM ideally.",
    detectedContext: {
      contact: "Adams couple",
      transaction: "89 Brickell Ave",
      intent: "Offer preparation",
      category: "Listing",
    },
    suggestedTasks: [
      { id: "t1", text: "Prepare disclosures for 89 Brickell" },
      { id: "t2", text: "Pull HOA docs for Adams" },
      { id: "t3", text: "Confirm parking assignment with seller" },
    ],
    detectedRisks: [],
    crmUpdates: [
      {
        id: "c1",
        field: "89 Brickell · Adams",
        text: "Offer expected this afternoon",
      },
    ],
    confidence: 91,
    approvedCount: 0,
    editedCount: 0,
    rejectedCount: 0,
  },
  {
    id: "ev-3",
    realtor: REALTORS.maria,
    receivedAtLabel: "8:45 AM",
    dayBucket: "today",
    source: "voice",
    status: "approved",
    audioDuration: "1:14",
    waveform: WAVE_C,
    transcriptPreview:
      "Inspection report came back on 14 Palm Ct — three minor items, no deal-breakers, will negotiate credits.",
    transcript:
      "Inspection report came back on 14 Palm Ct. Three minor items: a leak under the kitchen sink, a window seal in the master, and the AC service is overdue. No deal-breakers. I'll negotiate credits with the seller's agent today. Let's prep the buyer for ~$2,500 in concessions.",
    detectedContext: {
      contact: "Palmer buyer",
      transaction: "14 Palm Ct",
      intent: "Inspection negotiation",
      category: "Closing",
    },
    suggestedTasks: [
      { id: "t1", text: "Send credit-negotiation request to seller's agent" },
      { id: "t2", text: "Brief buyer on ~$2,500 concession estimate" },
    ],
    detectedRisks: [],
    crmUpdates: [
      {
        id: "c1",
        field: "14 Palm Ct",
        text: "Inspection complete — negotiation in progress",
      },
    ],
    confidence: 87,
    approvedCount: 2,
    editedCount: 0,
    rejectedCount: 0,
  },
  {
    id: "ev-4",
    realtor: REALTORS.diana,
    receivedAtLabel: "11:22 AM",
    dayBucket: "today",
    source: "voice",
    status: "edited",
    audioDuration: "0:47",
    waveform: WAVE_A,
    transcriptPreview:
      "Open house Sunday at 7 Magnolia — tons of traffic, three couples asked about pre-approval next steps.",
    transcript:
      "Open house Sunday at 7 Magnolia was busy — tons of traffic. Three couples specifically asked about pre-approval next steps. I'd like to follow up with all of them today. Also, the Wallace family is coming back for a second showing Tuesday at 6 PM.",
    detectedContext: {
      contact: "Multiple leads",
      transaction: "7 Magnolia",
      intent: "Lead follow-up",
      category: "Lead nurture",
    },
    suggestedTasks: [
      { id: "t1", text: "Follow up with 3 open-house leads — pre-approval" },
      { id: "t2", text: "Confirm Wallace second showing Tue 6 PM" },
    ],
    detectedRisks: [],
    crmUpdates: [
      {
        id: "c1",
        field: "7 Magnolia",
        text: "3 new warm leads from Sunday open house",
      },
    ],
    confidence: 78,
    approvedCount: 1,
    editedCount: 1,
    rejectedCount: 0,
  },
  {
    id: "ev-5",
    realtor: REALTORS.carlos,
    receivedAtLabel: "1:05 PM",
    dayBucket: "today",
    source: "voice",
    status: "pending",
    audioDuration: "2:14",
    waveform: WAVE_B,
    transcriptPreview:
      "Closing on 412 Sunset is in trouble — title company found a lien from 2018 that wasn't disclosed. Need to escalate.",
    transcript:
      "Closing on 412 Sunset is in serious trouble. Title company found a lien from 2018 that wasn't disclosed by the seller. We're 6 days out from close. Need to: loop in the seller's attorney today, get a payoff letter for the lien, see if seller can clear it before closing or if we extend. Buyer's lender needs to know too — they may pull funding if we delay past Friday.",
    detectedContext: {
      contact: "Buyer (Hernandez) + seller",
      transaction: "412 Sunset Dr",
      intent: "Closing escalation",
      category: "Closing risk",
    },
    suggestedTasks: [
      { id: "t1", text: "Loop in seller's attorney today" },
      { id: "t2", text: "Request payoff letter for 2018 lien" },
      { id: "t3", text: "Notify buyer's lender of potential delay" },
      { id: "t4", text: "Draft closing extension contingency" },
    ],
    detectedRisks: [
      {
        id: "r1",
        text: "Undisclosed lien blocks closing in 6 days",
        severity: "high",
      },
      {
        id: "r2",
        text: "Buyer's lender may pull funding past Friday",
        severity: "high",
      },
    ],
    crmUpdates: [
      {
        id: "c1",
        field: "412 Sunset · closing",
        text: "Title issue — 2018 lien discovered",
      },
    ],
    confidence: 73,
    approvedCount: 0,
    editedCount: 0,
    rejectedCount: 0,
  },
  {
    id: "ev-6",
    realtor: REALTORS.maria,
    receivedAtLabel: "4:31 PM",
    dayBucket: "yesterday",
    source: "voice",
    status: "synced",
    audioDuration: "0:52",
    waveform: WAVE_C,
    transcriptPreview:
      "Castro offer accepted! Need to send executed contract to lender and order inspection within 48 hours.",
    transcript:
      "Big news — Castro offer accepted at full asking on 22 Coral Way! Need to send the executed contract to the lender today, order inspection within 48 hours per the contingency, and schedule the final walkthrough for next Thursday. I'll text the client now.",
    detectedContext: {
      contact: "Castro family",
      transaction: "22 Coral Way",
      intent: "Under-contract handoff",
      category: "Closing",
    },
    suggestedTasks: [
      { id: "t1", text: "Send executed contract to lender" },
      { id: "t2", text: "Order inspection within 48h" },
      { id: "t3", text: "Schedule final walkthrough — next Thursday" },
    ],
    detectedRisks: [],
    crmUpdates: [
      {
        id: "c1",
        field: "22 Coral Way",
        text: "Status: Pending — offer accepted at asking",
      },
    ],
    confidence: 89,
    approvedCount: 3,
    editedCount: 0,
    rejectedCount: 0,
  },
  {
    id: "ev-7",
    realtor: REALTORS.diana,
    receivedAtLabel: "2:08 PM",
    dayBucket: "yesterday",
    source: "voice",
    status: "rejected",
    audioDuration: "0:34",
    waveform: WAVE_A,
    transcriptPreview:
      "Buyer mentioned the new HVAC unit at 31 Banyan and I think they want out of contract — feeling uneasy about the maintenance disclosure.",
    transcript:
      "I'm not sure but I think the Lerner buyer wants out of contract on 31 Banyan. They mentioned the HVAC was newer than disclosed and they feel uneasy about the maintenance docs. Probably nothing but worth flagging.",
    detectedContext: {
      contact: "Lerner buyer",
      transaction: "31 Banyan",
      intent: "Possible contract exit",
      category: "Buyer hesitation",
    },
    suggestedTasks: [
      { id: "t1", text: "Schedule check-in call with Lerner buyer" },
    ],
    detectedRisks: [
      {
        id: "r1",
        text: "Buyer may exit contract due to HVAC disclosure",
        severity: "medium",
      },
      {
        id: "r2",
        text: "Possible disclosure dispute",
        severity: "low",
      },
    ],
    crmUpdates: [],
    confidence: 64,
    approvedCount: 0,
    editedCount: 0,
    rejectedCount: 3,
  },
  {
    id: "ev-8",
    realtor: REALTORS.carlos,
    receivedAtLabel: "9:48 AM",
    dayBucket: "earlier",
    earlierLabel: "May 22",
    source: "voice",
    status: "synced",
    audioDuration: "1:08",
    waveform: WAVE_B,
    transcriptPreview:
      "Update on 89 Brickell — lender pre-approved Adams couple for $1.4M, closing target moved to June 18.",
    transcript:
      "Quick update on 89 Brickell. Lender pre-approved the Adams couple for $1.4M, which is above asking. Closing target moved to June 18 to align with their relocation. Need to schedule final walkthrough and confirm wire instructions with title.",
    detectedContext: {
      contact: "Adams couple",
      transaction: "89 Brickell Ave",
      intent: "Closing coordination",
      category: "Closing",
    },
    suggestedTasks: [
      { id: "t1", text: "Schedule final walkthrough" },
      { id: "t2", text: "Confirm wire instructions with title" },
      { id: "t3", text: "Update closing date in CRM: → June 18" },
    ],
    detectedRisks: [],
    crmUpdates: [
      {
        id: "c1",
        field: "89 Brickell · Adams",
        text: "Pre-approved $1.4M · Closing → Jun 18",
      },
    ],
    confidence: 92,
    approvedCount: 3,
    editedCount: 0,
    rejectedCount: 0,
  },
];

/** Group events by day bucket for the timeline feed. */
export function groupEvents(
  events: OperationalEvent[]
): Record<DayBucket, OperationalEvent[]> {
  return {
    today: events.filter((e) => e.dayBucket === "today"),
    yesterday: events.filter((e) => e.dayBucket === "yesterday"),
    earlier: events.filter((e) => e.dayBucket === "earlier"),
  };
}

/** Inbox counter for the header subtitle. */
export function pendingCount(events: OperationalEvent[]): number {
  return events.filter((e) => e.status === "pending").length;
}
