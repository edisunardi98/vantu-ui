// Sample data shared by block and template previews.

export const prospects = [
  { name: "Sarah Chen", title: "VP Sales", company: "Ledgerly", signal: "Raised $40M Series B", signalKind: "funding", score: 92 },
  { name: "Daniel Brooks", title: "Chief Revenue Officer", company: "Verdant Labs", signal: "New in role · 34 days", signalKind: "role", score: 90 },
  { name: "Aisha Bello", title: "VP Sales", company: "Tidewater Analytics", signal: "Launched AI product", signalKind: "launch", score: 83 },
  { name: "Oliver Grant", title: "Head of Revenue", company: "Parcelio", signal: "Expanding to EU", signalKind: "expansion", score: 79 },
  { name: "Samuel Ortiz", title: "VP Sales", company: "Plinth", signal: "Visited pricing page", signalKind: "intent", score: 76 },
  { name: "Ryan Walsh", title: "Director of Sales", company: "Kinto", signal: "Headcount +18%", signalKind: "growth", score: 71 },
] as const;

export type Prospect = (typeof prospects)[number];

export const metrics = [
  { label: "Prospects discovered", value: "1,284", delta: 18, caption: "vs. 1,088 prior 7 days", spark: [3, 5, 4, 6, 5, 7, 8] },
  { label: "Qualified (score ≥ 80)", value: "342", delta: 12, caption: "27% of discovered", spark: [4, 5, 6, 5, 6, 7, 7] },
  { label: "Replies", value: "54", delta: 9, caption: "8.6% reply rate", spark: [2, 4, 5, 4, 6, 5, 7] },
  { label: "Meetings booked", value: "20", delta: 5, deltaLabel: "+5", caption: "vs. 15 prior 7 days", spark: [1, 3, 4, 3, 5, 6, 4] },
];

export const performance = [
  { day: "29", discovered: 40, qualified: 12 },
  { day: "30", discovered: 32, qualified: 9 },
  { day: "31", discovered: 196, qualified: 46 },
  { day: "1", discovered: 214, qualified: 58 },
  { day: "2", discovered: 222, qualified: 61 },
  { day: "3", discovered: 238, qualified: 66 },
  { day: "4", discovered: 230, qualified: 79 },
  { day: "5", discovered: 52, qualified: 14 },
  { day: "6", discovered: 38, qualified: 10 },
  { day: "7", discovered: 232, qualified: 62 },
  { day: "8", discovered: 258, qualified: 70 },
  { day: "9", discovered: 268, qualified: 74 },
  { day: "10", discovered: 286, qualified: 73 },
  { day: "11", discovered: 262, qualified: 69 },
];

export const sequences = [
  { name: "Post-event: SaaStr", rate: 13.8, meetings: 3 },
  { name: "Series B — VP Sales", rate: 11.2, meetings: 6 },
  { name: "UK Revenue Leaders", rate: 10.5, meetings: 4 },
  { name: "Hiring SDRs", rate: 7.9, meetings: 5 },
  { name: "Re-engage closed-lost", rate: 5.4, meetings: 2 },
];

export const usage = [
  { label: "AI credits", value: 6240, max: 10000 },
  { label: "Enrichments", value: 1912, max: 3000 },
  { label: "AI searches", value: 148, max: 500 },
  { label: "Emails sent", value: 3960, max: 8000 },
];

export type Intent = "High" | "Medium" | "Low";
export type ProspectStatus = "New" | "Contacted" | "Replied" | "Meeting booked";

export interface ProspectRecord {
  id: string;
  name: string;
  title: string;
  company: string;
  domain: string;
  brand: string;
  score: number;
  intent: Intent;
  status: ProspectStatus;
  location: string;
  inSequence: boolean;
}

export const prospectRecords: ProspectRecord[] = [
  { id: "1", name: "Sarah Chen", title: "VP Sales", company: "Ledgerly", domain: "ledgerly.com", brand: "#8a5a2b", score: 92, intent: "High", status: "New", location: "San Francisco, CA", inSequence: false },
  { id: "2", name: "Daniel Brooks", title: "Chief Revenue Officer", company: "Verdant Cloud", domain: "verdantcloud.com", brand: "#f2620f", score: 90, intent: "High", status: "New", location: "Atlanta, GA", inSequence: false },
  { id: "3", name: "Marcus Reid", title: "Head of Revenue", company: "Northpeak", domain: "northpeak.io", brand: "#0a84ff", score: 89, intent: "High", status: "Contacted", location: "Denver, CO", inSequence: true },
  { id: "4", name: "Priya Raman", title: "VP Sales", company: "Fathom Data", domain: "fathomdata.com", brand: "#6d28d9", score: 87, intent: "High", status: "Replied", location: "Austin, TX", inSequence: true },
  { id: "5", name: "Elena Vasquez", title: "VP Revenue Operations", company: "Juniper Commerce", domain: "junipercommerce.com", brand: "#1e293b", score: 85, intent: "High", status: "Meeting booked", location: "Los Angeles, CA", inSequence: true },
  { id: "6", name: "Tom Hartley", title: "Head of Sales", company: "Brightlane", domain: "brightlane.co", brand: "#2563eb", score: 84, intent: "High", status: "Contacted", location: "London, UK", inSequence: true },
  { id: "7", name: "Aisha Bello", title: "VP Sales", company: "Tidewater Analytics", domain: "tidewater.ai", brand: "#7c3aed", score: 83, intent: "High", status: "New", location: "Seattle, WA", inSequence: false },
  { id: "8", name: "Jonas Weber", title: "Head of Sales", company: "Stackwise", domain: "stackwise.dev", brand: "#4f46e5", score: 81, intent: "Medium", status: "Contacted", location: "New York, NY", inSequence: true },
  { id: "9", name: "Grace Kim", title: "VP Growth", company: "Relaywork", domain: "relaywork.com", brand: "#f59e0b", score: 80, intent: "Medium", status: "Replied", location: "Portland, OR", inSequence: true },
  { id: "10", name: "Oliver Grant", title: "Head of Revenue", company: "Parcelio", domain: "parcelio.com", brand: "#14b8a6", score: 79, intent: "Medium", status: "New", location: "Chicago, IL", inSequence: false },
  { id: "11", name: "Hannah Liu", title: "Sales Director", company: "Oakline HR", domain: "oaklinehr.com", brand: "#f97316", score: 77, intent: "Medium", status: "Contacted", location: "Boston, MA", inSequence: true },
  { id: "12", name: "Samuel Ortiz", title: "VP Sales", company: "Plinth", domain: "plinth.app", brand: "#2563eb", score: 76, intent: "Medium", status: "New", location: "Edinburgh, UK", inSequence: false },
];

/* ---------------- CRM dashboard ---------------- */

export const crmMetrics = [
  { label: "Revenue won", value: "$482K", delta: 14, caption: "vs. $423K last quarter", spark: [380, 395, 372, 410, 428, 415, 446, 452, 470, 482] },
  { label: "Open pipeline", value: "$1.86M", delta: 9, caption: "142 open deals", spark: [1.52, 1.58, 1.55, 1.63, 1.6, 1.68, 1.72, 1.7, 1.79, 1.86] },
  { label: "Win rate", value: "31%", delta: 2.4, deltaLabel: "+2.4 pts", caption: "Last 90 days", spark: [27.1, 28.4, 27.9, 28.8, 29.6, 28.9, 30.2, 29.8, 30.6, 31] },
  { label: "Avg. deal size", value: "$24.6K", delta: 6, caption: "vs. $23.2K last quarter", spark: [22.1, 22.8, 22.4, 23.2, 23.0, 23.6, 23.9, 23.7, 24.2, 24.6] },
];

/** Monthly revenue won (USD) — this year vs. last year. */
export const crmRevenue = [
  { label: "Jan", value: 112000, previous: 94000 },
  { label: "Feb", value: 128000, previous: 101000 },
  { label: "Mar", value: 141000, previous: 118000 },
  { label: "Apr", value: 136000, previous: 122000 },
  { label: "May", value: 158000, previous: 127000 },
  { label: "Jun", value: 172000, previous: 139000 },
  { label: "Jul", value: 166000, previous: 141000 },
  { label: "Aug", value: 181000, previous: 148000 },
  { label: "Sep", value: 197000, previous: 156000 },
  { label: "Oct", value: 214000, previous: 163000 },
];

/** Open pipeline value by stage (USD). */
export const crmPipeline = [
  { label: "Qualified", value: 620000 },
  { label: "Proposal", value: 540000 },
  { label: "Negotiation", value: 430000 },
  { label: "Contract sent", value: 270000 },
];

export type DealStage = "Proposal" | "Negotiation" | "Contract sent";

export const crmDeals: { id: string; name: string; company: string; brand: string; stage: DealStage; value: number; close: string; owner: string; probability: number }[] = [
  { id: "d1", name: "Platform expansion", company: "Ledgerly", brand: "#8a5a2b", stage: "Contract sent", value: 84000, close: "Nov 21", owner: "Jordan Blake", probability: 90 },
  { id: "d2", name: "Annual renewal + seats", company: "Northpeak", brand: "#0a84ff", stage: "Negotiation", value: 56000, close: "Nov 24", owner: "Leah Moss", probability: 70 },
  { id: "d3", name: "Analytics add-on", company: "Fathom Data", brand: "#6d28d9", stage: "Proposal", value: 38500, close: "Nov 28", owner: "Priya Raman", probability: 45 },
  { id: "d4", name: "EMEA rollout", company: "Verdant Cloud", brand: "#f2620f", stage: "Negotiation", value: 47000, close: "Dec 3", owner: "Marco Silva", probability: 60 },
  { id: "d5", name: "Starter → Growth upgrade", company: "Plinth", brand: "#2563eb", stage: "Proposal", value: 18000, close: "Dec 5", owner: "Samuel Ortiz", probability: 40 },
  { id: "d6", name: "Security add-on", company: "Brightlane", brand: "#2563eb", stage: "Contract sent", value: 29000, close: "Dec 8", owner: "Leah Moss", probability: 85 },
  { id: "d7", name: "Multi-year renewal", company: "Relaywork", brand: "#f59e0b", stage: "Negotiation", value: 64000, close: "Dec 12", owner: "Jordan Blake", probability: 65 },
  { id: "d8", name: "Pilot to annual", company: "Stackwise", brand: "#4f46e5", stage: "Proposal", value: 22500, close: "Dec 15", owner: "Priya Raman", probability: 35 },
];

export const crmTasks = [
  { id: "t1", title: "Send revised proposal to Northpeak", due: "Today", overdue: false, done: false },
  { id: "t2", title: "Follow up with Ledgerly legal on MSA", due: "Yesterday", overdue: true, done: false },
  { id: "t3", title: "Prep QBR deck for Fathom Data", due: "Tomorrow", overdue: false, done: false },
  { id: "t4", title: "Log call notes — Verdant Cloud", due: "Today", overdue: false, done: true },
];

/** Rep leaderboard this quarter: revenue won (USD), deals won, quota attainment (%) and a weekly revenue trend. */
export const crmReps = [
  { id: "r1", name: "Jordan Blake", team: "Enterprise", deals: 6, revenue: 142000, quota: 112, spark: [8, 9, 11, 10, 13, 14, 16, 18] },
  { id: "r2", name: "Leah Moss", team: "Mid-market", deals: 9, revenue: 118000, quota: 96, spark: [9, 10, 9, 12, 12, 13, 14, 15] },
  { id: "r3", name: "Priya Raman", team: "Enterprise", deals: 4, revenue: 97000, quota: 88, spark: [7, 9, 8, 10, 11, 10, 12, 13] },
  { id: "r4", name: "Marco Silva", team: "EMEA", deals: 5, revenue: 74000, quota: 71, spark: [10, 9, 10, 9, 8, 9, 9, 10] },
  { id: "r5", name: "Samuel Ortiz", team: "SMB", deals: 11, revenue: 51000, quota: 64, spark: [6, 7, 6, 6, 5, 6, 7, 7] },
];
