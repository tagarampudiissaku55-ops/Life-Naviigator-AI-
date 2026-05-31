import React, { useState, useEffect, useRef } from "react";
import { 
  Cpu, 
  Brain, 
  TrendingUp, 
  Activity, 
  Clock, 
  DollarSign, 
  Radio, 
  Play, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  Terminal, 
  UserCheck, 
  Compass, 
  ShieldAlert, 
  ArrowRight,
  RefreshCw,
  Sliders,
  Send,
  Volume2
} from "lucide-react";
import { TaskItem, EmotionMetrics, VoiceMemory, AgentResponse } from "../types";
import AgentCollaborationGraph from "./AgentCollaborationGraph";
import MultimodalSandbox from "./MultimodalSandbox";
import ExplainableAILedger from "./ExplainableAILedger";
import UniversalLanguageAgent from "./UniversalLanguageAgent";
import EmergencyCenter from "./EmergencyCenter";

interface LifeCommandCenterProps {
  metrics: {
    activeTasks: number;
    completedTasks: number;
    aiConfidence: number;
    timeSavedHours: number;
    moneySavedDollars: number;
    stressReductionScore: number;
    productivityScore: number;
  };
  emotionMetrics: EmotionMetrics;
  detectedEmotion: string;
  tasks: TaskItem[];
  onToggleTaskStatus: (id: string) => void;
  lastUserUtterance?: string;
  onSendCustomPrompt: (promptText: string) => void;
  confidenceScore?: number;
  retrievedMemories?: string[];
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
  onResolveMultimodal?: (data: AgentResponse & { fileName: string }) => void;
}

export default function LifeCommandCenter({
  metrics,
  emotionMetrics,
  detectedEmotion,
  tasks,
  onToggleTaskStatus,
  lastUserUtterance,
  onSendCustomPrompt,
  confidenceScore,
  retrievedMemories,
  trustMetrics,
  agentCollaboration,
  onResolveMultimodal
}: LifeCommandCenterProps) {
  
  // Real-time Scrolling Event Ticker Logs state
  const [logs, setLogs] = useState<{ id: string; time: string; submodule: string; message: string; type: "info" | "success" | "warning" | "agent" }[]>([
    { id: "log_1", time: "14:12:05", submodule: "CORE_VM", message: "Kernel initialized. Antigravity sandbox operational.", type: "info" },
    { id: "log_2", time: "14:12:45", submodule: "SEMANTIC", message: "Long-Term database sync complete. 4 vector nodes loaded.", type: "success" },
    { id: "log_3", time: "14:13:10", submodule: "EIE_SPECT", message: "Emotion audio spectral tracking set to dominant status: " + detectedEmotion, type: "info" },
    { id: "log_4", time: "14:14:02", submodule: "ISP_AGENT", message: "Comcast automated reimbursement ticket #INC-892415 monitored.", type: "agent" }
  ]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // AI Twin Prediction highlights
  const [activePrediction, setActivePrediction] = useState<number>(0);
  const predictions = [
    {
      title: "ISP Outage Latency Threat",
      probability: "94% Congestion Prediction",
      threatLevel: "High Risk Index",
      resolution: "Pre-routed backup hotspot pathway & prepared automated FCC credit refund.",
      iconColors: "bg-rose-500/10 text-rose-400 border-rose-500/20"
    },
    {
      title: "Impending Transit Flight Congestion",
      probability: "82% Airline Outage Vector",
      threatLevel: "Balanced Warning",
      resolution: "Monitored Delta flight schedules, ready to slide reservation coordinates over API.",
      iconColors: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    },
    {
      title: "Savings Benchmarking Optimization",
      probability: "98% High Likelihood Goal Hit",
      threatLevel: "Optimal Plan Growth",
      resolution: "Marcus High-Yield compounding allocations project 20% home downpayment 4 months early.",
      iconColors: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      title: "Family Sibling Priority Standby",
      probability: "Direct Sibling Emergency Node",
      threatLevel: "Active Directory Lock",
      resolution: "Parsed sibling contact Alice under local registry coordinates. Emergency callback active.",
      iconColors: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    }
  ];

  // Active Live agent worker models
  const [agentSpeeds, setAgentSpeeds] = useState({
    billing: 92,
    travel: 45,
    wealth: 88,
    emergency: 100
  });

  // Custom simulation command template options
  const quickDispatches = [
    { text: "Simulate Comcast fiber outage block 14 refund claim", outline: "ISP Billing Agent" },
    { text: "Plan 5-Year Downpayment schedule model", outline: "Wealth Optimizer" },
    { text: "Coordinate evening flight delays at JFK", outline: "Travel Agent" },
    { text: "Verify sister Alice is contact proxy", outline: "Emergency Agent" }
  ];

  // Auto-scrolling the event ticker live logs to the bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulated live system log tick to make the interface feel incredibly kinetic and "alive"
  useEffect(() => {
    const logPool = [
      { message: "Computed cosine similarity vectors over long-term database nodes.", submodule: "SEMANTIC", type: "success" },
      { message: "Scannned carrier IVR telephone trees; status: queue bypassed.", submodule: "COMCAST_AGENT", type: "agent" },
      { message: "Detected vocal stress levels variance below threshold limit.", submodule: "EIE_SPECT", type: "info" },
      { message: "Comcast claim credits updated. Reimbursed $25 approval voucher saved.", submodule: "BILLING", type: "success" },
      { message: "Proactively locked executive calendar slot for standby Comcast technician.", submodule: "CALENDAR", type: "info" },
      { message: "Delta flight delays indexed. Alternate flight JFK-1903 available for re-route.", submodule: "TRAVEL_AGENT", type: "agent" },
      { message: "Recalculating 5-year savings projections under updated market coefficient.", submodule: "FUTURE_SIM", type: "info" },
      { message: "Hashed localized voice sample using absolute client privacy schema.", submodule: "VOICE_ID", type: "success" }
    ];

    const interval = setInterval(() => {
      const randomItem = logPool[Math.floor(Math.random() * logPool.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const newLog = {
        id: "log_" + Date.now() + Math.random().toString(36).substr(2, 4),
        time: timeStr,
        submodule: randomItem.submodule,
        message: randomItem.message,
        type: randomItem.type as any
      };

      setLogs(prev => {
        // Keep logs list at max 20 items to avoid DOM bloating
        const trimmed = prev.length > 20 ? prev.slice(prev.length - 19) : prev;
        return [...trimmed, newLog];
      });

      // Randomly fluctuate agent speeds slightly for realism
      setAgentSpeeds(prev => ({
        billing: Math.max(70, Math.min(100, prev.billing + (Math.random() > 0.5 ? 2 : -2))),
        travel: Math.max(30, Math.min(95, prev.travel + (Math.random() > 0.5 ? 4 : -4))),
        wealth: Math.max(80, Math.min(100, prev.wealth + (Math.random() > 0.5 ? 1 : -1))),
        emergency: Math.max(95, Math.min(100, prev.emergency + (Math.random() > 0.5 ? 1 : -1)))
      }));

    }, 3800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in" id="life_command_center_screen">
      
      {/* Top Hero Banner & Kinetic Pulse Radar Block */}
      <div className="relative glass-card rounded-[32px] p-6 md:p-8 overflow-hidden border border-purple-500/20 bg-gradient-to-tr from-slate-950 via-indigo-950/40 to-slate-950">
        
        {/* Absolute vector concentric circles simulating real radar sweeps */}
        <div className="absolute right-[-60px] top-[-60px] md:right-10 md:top-1/2 md:-translate-y-1/2 w-64 h-64 md:w-80 md:h-80 pointer-events-none opacity-20">
          <div className="w-full h-full rounded-full border border-purple-500/30 animate-pulse flex items-center justify-center">
            <div className="w-[80%] h-[80%] rounded-full border border-indigo-400/20 flex items-center justify-center">
              <div className="w-[60%] h-[60%] rounded-full border border-cyan-500/10 flex items-center justify-center">
                <div className="w-[30%] h-[30%] rounded-full bg-purple-500/10 border border-purple-500/40 animate-ping" />
              </div>
            </div>
          </div>
          {/* Rotating radar sweeping beam */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 animate-spin [animation-duration:10s]" />
        </div>

        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-mono font-medium text-cyan-300 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Active Satellite Telemetry Uplink
            </span>
            <span className="text-[10px] font-mono text-purple-300">
              Uptime: 99.98%
            </span>
          </div>

          <h2 className="font-display font-medium tracking-tight text-white text-2xl md:text-3xl leading-tight">
            Strategic Mission Command Center
          </h2>
          
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-xl">
            This dashboard orchestrates autonomous background life processes. By pairing vocal emotional diagnostics with a localized vector state, the operator mitigates real-life friction proactively.
          </p>

          <footer className="pt-2 flex flex-wrap gap-2.5">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-[10px] font-mono text-slate-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin [animation-duration:8s]" />
              Latent State Model: <strong className="text-white">Active</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-[10px] font-mono text-slate-300 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-indigo-400" />
              RF Signal Feed: <strong className="text-white">94.3 dBm</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-[10px] font-mono text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Core FPS Rate: <strong className="text-white">60/60</strong>
            </span>
          </footer>
        </div>
      </div>

      {/* Emergency dispatch HUD panel activator */}
      <EmergencyCenter />

      {/* Agent Collaboration Graph Panel representing physical multi-agent coordination */}
      <AgentCollaborationGraph collaborationData={agentCollaboration} />

      {/* Primary Grid Row containing Productivity Speedometer Gauge and AI Twin Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Circular SVG Speedometer Gauge (Productivity / Unified Utility metric) */}
        <div className="lg:col-span-4 glass-card rounded-[24px] p-6 flex flex-col justify-between relative overflow-hidden align-stretch min-h-[300px]">
          <div className="absolute top-0 right-0 p-4 text-[9px] font-mono text-slate-500">
            SEC_SYS_V23
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4.5 h-4.5 text-cyan-400 animate-spin [animation-duration:8s]" />
              <h4 className="font-display font-medium text-white text-sm">
                Unified Operator Index
              </h4>
            </div>

            {/* Circular SVG representation */}
            <div className="relative flex flex-col items-center justify-center my-4">
              <svg className="w-36 h-36 transform -rotate-90">
                {/* Background tracks */}
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  className="stroke-slate-900"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Accent primary curve scale */}
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  className="stroke-indigo-500"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 60}
                  strokeDashoffset={2 * Math.PI * 60 * (1 - metrics.productivityScore / 100)}
                  strokeLinecap="round"
                />
                {/* Multiplier highlights */}
                <circle
                  cx="72"
                  cy="72"
                  r="48"
                  className="stroke-cyan-500/30"
                  strokeWidth="2"
                  fill="transparent"
                  strokeDasharray="4 8"
                />
              </svg>

              {/* Centered textual parameters */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-display font-extrabold text-white leading-none glow-text-cyan">
                  {metrics.productivityScore}%
                </h2>
                <span className="text-[9px] font-mono text-slate-400 tracking-wider uppercase mt-1">
                  Global Efficiency
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-medium mt-1">
                  Optimal Yield
                </span>
              </div>
            </div>
          </div>

          {/* Productivity parameters summary bottom lines */}
          <div className="border-t border-white/5 pt-4 space-y-2 text-xs">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400 font-sans">Strategic Time Saved:</span>
              <span className="font-mono text-slate-200 font-semibold">{metrics.timeSavedHours.toFixed(1)} hrs</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400 font-sans">Arbitraged Dispute Claims:</span>
              <span className="font-mono text-emerald-400 font-semibold">${metrics.moneySavedDollars} Saved</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400 font-sans">User Stress Amortization:</span>
              <span className="font-mono text-rose-400 font-semibold">-{metrics.stressReductionScore}% Index</span>
            </div>
          </div>
        </div>

        {/* AI Twin Predictions / Future Simulations Panel */}
        <div className="lg:col-span-8 glass-card rounded-[24px] p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <h4 className="font-display font-medium text-white text-sm">
                  Preemptive AI Twin Forecast & Simulation Models
                </h4>
              </div>
              <span className="text-[10px] font-mono text-purple-400 animate-pulse bg-purple-500/10 px-2 py-0.5 rounded">
                Modeling active
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Your AI Twin continuously forecasts environmental stressors (delays, outage maps, finances) over a 24-hour baseline. Tap on any localized target threat to sync backup mitigation scripts.
            </p>

            {/* Simulated Horizontal slider blocks containing predictions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {predictions.map((pred, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePrediction(idx)}
                  className={`p-3.5 rounded-xl text-left border relative transition-all duration-300 cursor-pointer flex flex-col justify-between gap-2.5
                    ${activePrediction === idx 
                      ? "bg-slate-900/80 border-purple-500/40 shadow-lg shadow-purple-500/5 scale-[1.02]" 
                      : "bg-slate-950/40 border-white/5 hover:border-white/10"
                    }
                  `}
                >
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-semibold text-slate-100">{pred.title}</span>
                      <span className={`px-1.5 py-0.25 rounded text-[8px] font-mono uppercase font-semibold border ${pred.iconColors}`}>
                        {pred.threatLevel}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 block">{pred.probability}</span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans border-t border-white/5 pt-2">
                    {pred.resolution}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Row containing Emotion Spectrograph wave system & Active Background Agents status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Column representing Emotional Intelligence Spectrogram */}
        <div className="lg:col-span-5 glass-card rounded-[24px] p-6 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4.5 h-4.5 text-indigo-400" />
                <h4 className="font-display font-medium text-white text-sm">
                  Audio & Voice Spectrogram Analysis
                </h4>
              </div>
              <span className="text-[9px] font-mono uppercase bg-slate-950 px-2 py-0.5 rounded text-amber-300 border border-amber-500/20">
                dominant: {detectedEmotion}
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Real-time voice acoustics, speech rate, and stress spectrogram outputs. Live frequency amplitude:
            </p>

            {/* Interactive Kinetic Spectrogram Bars matching custom emotion parameters */}
            <div className="grid grid-cols-4 gap-2 text-center bg-slate-950/80 p-4 rounded-xl border border-white/5 my-4">
              <div>
                <span className="text-[9px] font-mono text-slate-500 block mb-1">STRESS</span>
                <div className="h-20 bg-slate-900 rounded-lg overflow-hidden relative flex items-end justify-center">
                  <div 
                    className="bg-rose-500 w-full transition-all duration-1000 animate-pulse"
                    style={{ height: `${emotionMetrics.stress}%` }}
                  />
                  <span className="absolute bottom-1 text-[10px] font-mono text-slate-200 z-10 font-bold">
                    {emotionMetrics.stress}%
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[9px] font-mono text-slate-500 block mb-1">URGENCY</span>
                <div className="h-20 bg-slate-900 rounded-lg overflow-hidden relative flex items-end justify-center">
                  <div 
                    className="bg-amber-400 w-full transition-all duration-1000 animate-pulse [animation-delay:0.2s]"
                    style={{ height: `${emotionMetrics.urgency}%` }}
                  />
                  <span className="absolute bottom-1 text-[10px] font-mono text-slate-200 z-10 font-bold">
                    {emotionMetrics.urgency}%
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[9px] font-mono text-slate-500 block mb-1">FRUSTRATE</span>
                <div className="h-20 bg-slate-900 rounded-lg overflow-hidden relative flex items-end justify-center">
                  <div 
                    className="bg-indigo-500 w-full transition-all duration-1000 animate-pulse [animation-delay:0.4s]"
                    style={{ height: `${emotionMetrics.frustration}%` }}
                  />
                  <span className="absolute bottom-1 text-[10px] font-mono text-slate-200 z-10 font-bold">
                    {emotionMetrics.frustration}%
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[9px] font-mono text-slate-500 block mb-1">HAPPINESS</span>
                <div className="h-20 bg-slate-900 rounded-lg overflow-hidden relative flex items-end justify-center">
                  <div 
                    className="bg-emerald-400 w-full transition-all duration-1000 animate-pulse [animation-delay:0.1s]"
                    style={{ height: `${emotionMetrics.happiness}%` }}
                  />
                  <span className="absolute bottom-1 text-[10px] font-mono text-slate-200 z-10 font-bold">
                    {emotionMetrics.happiness}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-mono leading-relaxed mt-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            Synthesizing 200ms audio windows for biometric latency adjustments.
          </p>
        </div>

        {/* Column representing Explainable AI Diagnostic Ledger & Trust Layer */}
        <div className="lg:col-span-7">
          <ExplainableAILedger
            confidenceScore={confidenceScore}
            retrievedMemories={retrievedMemories}
            trustMetrics={trustMetrics}
            reasoningFlow={undefined} // Pulled from defaults or reasoning state
          />
        </div>
      </div>

      {/* Language translation pipeline processing */}
      <UniversalLanguageAgent />

      {/* Real-time System Scrolling Micro Log Feed / Ticker */}
      <div className="glass-card rounded-[24px] p-6 border-cyan-500/10 glow-border-cyan relative overflow-hidden" id="live_logs_stream_console_card">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="font-display font-medium text-white text-base">
                Autonomous Action Stream Logs
              </h4>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                Physical runtime task allocation & vector memory matrix tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-mono text-emerald-400">STREAMING DEEP TRACE ACTIVE</span>
          </div>
        </div>

        {/* Core Scrolling Feed panel */}
        <div 
          ref={logContainerRef}
          className="bg-slate-950 p-4 rounded-xl border border-white/5 font-mono text-[11px] text-slate-300 space-y-2.5 max-h-[180px] overflow-y-auto scrollbar-thin overflow-x-hidden"
        >
          {logs.map((log) => {
            let logColor = "text-slate-400";
            if (log.type === "success") logColor = "text-emerald-400 font-semibold";
            if (log.type === "warning") logColor = "text-rose-400 font-semibold";
            if (log.type === "agent") logColor = "text-purple-400";
            
            return (
              <div key={log.id} className="flex gap-2.5 items-start border-b border-white/5 pb-1.5 last:border-0 hover:bg-white/[0.02] p-1 rounded transition duration-150">
                <span className="text-slate-600 shrink-0 font-medium">{log.time}</span>
                <span className="px-1.5 py-0.25 text-[9px] uppercase font-bold bg-slate-900 border border-white/10 rounded tracking-wider shrink-0 text-slate-400">
                  {log.submodule}
                </span>
                <p className={`flex-1 break-words leading-relaxed ${logColor}`}>
                  {log.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dedicated Ongoing Action Verification Tasks Queue Checklist panel */}
      <div className="glass-card rounded-[24px] p-6 relative overflow-hidden" id="ongoing_command_center_tasks">
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-purple-400" />
            <h4 className="font-display font-medium text-white text-base">
              Immediate Task Resolution Queue
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {tasks.filter(t => t.status === "completed").length} / {tasks.length} Completed
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Verify and toggle simulated milestones manually. Completing priority tasks compounds your overall Unified Operator Index.
        </p>

        {/* Task Items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className={`p-3.5 rounded-xl border flex justify-between items-start gap-3 transition-all duration-300 hover:border-indigo-500/20 group
                ${task.status === "completed" 
                  ? "bg-slate-950/20 border-white/5 opacity-80" 
                  : "bg-gradient-to-tr from-slate-950 to-indigo-950/20 border-white/10 shadow hover:scale-[1.01]"
                }
              `}
            >
              <div className="flex gap-2.5 items-start">
                <button
                  type="button"
                  onClick={() => onToggleTaskStatus(task.id)}
                  className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all cursor-pointer mt-0.5
                    ${task.status === "completed"
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                      : "border-slate-700 bg-slate-900 text-transparent hover:border-slate-500"
                    }
                  `}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                </button>

                <div className="space-y-1">
                  <span className={`text-xs font-semibold block text-slate-200 ${task.status === "completed" ? "line-through text-slate-500" : ""}`}>
                    {task.title}
                  </span>
                  <p className="text-[11px] text-slate-400 lines-2">
                    {task.description}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`inline-block px-1.5 py-0.25 rounded text-[8px] font-mono font-medium uppercase tracking-wider
                  ${task.status === "completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-indigo-500/10 text-indigo-400 animate-pulse"}
                `}>
                  {task.status.replace("_", " ")}
                </span>
                <span className="block text-[9px] text-slate-500 mt-1 font-mono">
                  {task.estimate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multimodal Sandbox Workspace container block */}
      <MultimodalSandbox onResolve={onResolveMultimodal || (() => {})} />

      {/* Fast Scenario Dispatch Launcher */}
      <div className="glass-card rounded-[24px] p-6 relative overflow-hidden bg-slate-950/40">
        <div className="absolute top-0 right-0 p-4 text-[9px] font-mono text-purple-400">
          DISPATCH_GATEWAY
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4.5 h-4.5 text-purple-400 animate-pulse" strokeWidth={2.5} />
          <h4 className="font-display font-medium text-white text-sm">
            Instant Mission Scenario Launcher
          </h4>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          Deploy pre-configured voice command vectors with a single click. Watching these scenarios populate real-time reasoning logs in the logs stream illustrates the true power of autonomous routing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickDispatches.map((disp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSendCustomPrompt(disp.text)}
              className="p-3 rounded-xl border border-white/5 bg-slate-950 hover:bg-slate-900 text-left hover:border-purple-500/30 transition-all cursor-pointer flex flex-col justify-between gap-2.5 active:scale-95 text-xs group"
            >
              <div className="flex gap-2 items-start">
                <span className="text-xs shrink-0 text-purple-400 text-[10px] bg-purple-500/10 px-1 rounded font-mono">0{idx + 1}</span>
                <p className="text-[11.5px] font-sans font-medium text-slate-300 group-hover:text-white transition-colors">
                  {disp.text}
                </p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[10px] font-mono text-slate-500">
                <span>{disp.outline}</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-purple-400 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
