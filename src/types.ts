export interface EmotionMetrics {
  stress: number;
  urgency: number;
  frustration: number;
  happiness: number;
}

export interface TaskItem {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  description: string;
  estimate: string;
}

export interface SimulationMilestone {
  period: string;
  targetGoal: string;
  actionRequired: string;
  estimatedCostSavings: string;
  riskAnalysis: string;
}

export interface TimelineSimulation {
  title: string;
  analysis: string;
  milestones: SimulationMilestone[];
}

export interface MetricsDelta {
  timeSavedMinutes: number;
  moneySavedDollars: number;
  productivityScoreDelta: number;
  stressReductionDelta: number;
}

export interface AgentResponse {
  detectedEmotion: string;
  emotionMetrics: EmotionMetrics;
  responseText: string;
  reasoningFlow: string[];
  tasks: TaskItem[];
  timelineSimulation?: TimelineSimulation;
  metricsDelta: MetricsDelta;
  confidenceScore?: number; // scale 0-100
  retrievedMemories?: string[]; // retrieved memories
  trustMetrics?: {
    whyActionTaken: string;
    evidenceUsed: string;
    riskMitigation: string;
  };
  agentCollaboration?: {
    agentName: string;
    action: string;
    status: string;
  }[];
}

export interface DemoScenario {
  id: string;
  icon: string;
  title: string;
  promptText: string;
  subtitle: string;
}

export interface VoiceMemory {
  id: string;
  content: string;
  category: "preference" | "event" | "person" | "logistics" | "other";
  importance: number; // 1 to 5 scale
  timestamp: string;
  keywords: string[];
}

