import { DemoScenario, TaskItem, SimulationMilestone } from "./types";

export const BASELINE_METRICS = {
  activeTasks: 3,
  completedTasks: 18,
  aiConfidence: 98,
  timeSavedHours: 42.5,
  moneySavedDollars: 740,
  stressReductionScore: 84, // out of 100
  productivityScore: 92, // out of 100
};

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: "t1",
    title: "Schedule Comcast Internet Service Tech",
    status: "in_progress",
    description: "Coordination with automated support agent & scheduling line request.",
    estimate: "15 mins remaining",
  },
  {
    id: "t2",
    title: "Draft FCC Outage Compensation Ticket",
    status: "pending",
    description: "Prepare structured downtime claim to ensure $25 credit on next invoice.",
    estimate: "30 mins",
  },
  {
    id: "t3",
    title: "Compare Electric Car Rental Rates for Next Week",
    status: "completed",
    description: "Evaluated Hertz and Enterprise EV models matching user preferences.",
    estimate: "Completed",
  },
  {
    id: "t4",
    title: "Negotiate Premium Gym Subscription Termination fee",
    status: "in_progress",
    description: "Initiated service cancellation call with representative via simulated business endpoint.",
    estimate: "Awaiting final sign-off",
  }
];

export const GENERAL_DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "internet-outage",
    icon: "WifiOff",
    title: "Internet Service Outage",
    promptText: "My internet is not working and I need it fixed before my meeting.",
    subtitle: "Triggers stress diagnosis, auto-scheduling, and carrier negotiations",
  },
  {
    id: "buy-house",
    icon: "Home",
    title: "Buy a House in 5 Years",
    promptText: "I want to buy a house in 5 years. Outline an auto-saving milestones roadmap.",
    subtitle: "Simulates financial planning & chronologic visual interactive roadmap",
  },
  {
    id: "cancelled-flight",
    icon: "PlaneTakeoff",
    title: "Cancelled Flight Assistance",
    promptText: "My flight was cancelled and I am stuck at JFK airport. Get me home now!",
    subtitle: "Highly stressed scenario. Calms visitor, books re-routing, files reimbursement claim",
  },
  {
    id: "cancel-gym",
    icon: "DollarSign",
    title: "Cancel Gym Membership",
    promptText: "Can you call my gym and cancel my membership? It's too expensive.",
    subtitle: "Agentic automated service call simulation to cancel subscriptions offline",
  }
];

export const HOVER_EMOTIONS = {
  Stress: { color: "text-rose-400 bg-rose-500/10 border-rose-500/30", description: "Calming frequency activated. Agent speaks slower and uses soft acoustic synthesis." },
  Frustration: { color: "text-amber-400 bg-amber-500/10 border-amber-500/30", description: "Direct escalation bypass active. Cutting out standard menu loops." },
  Urgency: { color: "text-red-400 bg-red-500/10 border-red-500/30", description: "Fast-line channel prioritization activated. Deploying asynchronous parallel executors." },
  Happiness: { color: "text-emerald-400 bg-emerald-500/10 border-emerald-400/30", description: "Affirmative loop. Suggesting supplementary optimisations." },
};
