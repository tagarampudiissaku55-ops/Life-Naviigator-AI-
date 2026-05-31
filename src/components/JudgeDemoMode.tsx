import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Activity, 
  Cpu, 
  Heart, 
  Users, 
  TrendingUp, 
  Database,
  Terminal,
  Zap,
  CheckCircle,
  HelpCircle,
  Volume2
} from "lucide-react";
import { TaskItem, EmotionMetrics, VoiceMemory } from "../types";

interface JudgeDemoModeProps {
  // Setters to drive parent App state
  setStatus: (status: "idle" | "listening" | "thinking" | "speaking") => void;
  setDetectedEmotion: (emotion: string) => void;
  setEmotionMetrics: (metrics: EmotionMetrics) => void;
  setResponseText: (text: string) => void;
  setChatHistory: (history: any) => void;
  setReasoningFlow: (flow: string[]) => void;
  setTasks: (tasks: TaskItem[]) => void;
  setTimelineSimulation: (simulation: any) => void;
  setMetrics: (metrics: any) => void;
  setActiveTab: (tab: "command" | "dashboard" | "system") => void;
  setLastUserUtterance: (text: string) => void;

  // New Explainable AI setters to drive command center indicators
  setConfidenceScore?: (score: number | undefined) => void;
  setRetrievedMemories?: (memories: string[] | undefined) => void;
  setTrustMetrics?: (metrics: any) => void;
  setAgentCollaboration?: (data: any[] | undefined) => void;
}

export default function JudgeDemoMode({
  setStatus,
  setDetectedEmotion,
  setEmotionMetrics,
  setResponseText,
  setChatHistory,
  setReasoningFlow,
  setTasks,
  setTimelineSimulation,
  setMetrics,
  setActiveTab,
  setLastUserUtterance,
  setConfidenceScore,
  setRetrievedMemories,
  setTrustMetrics,
  setAgentCollaboration
}: JudgeDemoModeProps) {

  // Demo running states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1: idle/stopped
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [typedTranscript, setTypedTranscript] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time API telemetry debugger states
  const [isDebugExpanded, setIsDebugExpanded] = useState(true);
  const [selectedDebugTab, setSelectedDebugTab] = useState<number | null>(null);

  const totalDuration = 60; // 60s hackathon judging timeline

  // Timeline Step Definitions
  const steps = [
    {
      title: "Audio & Synthetic Voice Diagnostic",
      timeRange: "0s - 10s",
      icon: <Volume2 className="w-4 h-4 text-cyan-400" />,
      tag: "VOICE_ID",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      description: "Detecting ambient live acoustic feed from client microphone. Processing audio energy parameters."
    },
    {
      title: "Emotional Spectrograph Assessment",
      timeRange: "10s - 20s",
      icon: <Heart className="w-4 h-4 text-rose-400" />,
      tag: "EIE_SPECT",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      description: "Voice acoustics show significant pitch stress and cadence velocity. Classifying urgent frustration."
    },
    {
      title: "Vector-Space Memory Vault Lookup",
      timeRange: "20s - 30s",
      icon: <Database className="w-4 h-4 text-purple-400" />,
      tag: "COSINE_SIM",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      description: "Querying offline database nodes. Matched brother/sister records. Sister Alice loaded."
    },
    {
      title: "Tactical Multi-Agent Decompositions",
      timeRange: "30s - 40s",
      icon: <Cpu className="w-4 h-4 text-amber-400" />,
      tag: "AGENTIC_PLAN",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      description: "Splitting objectives into micro-tasks: hotel booking holds, automated Comcast refunds."
    },
    {
      title: "Autonomous Action APIs & Streams",
      timeRange: "40s - 50s",
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      tag: "INTEGRATION",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      description: "Executing sandboxed endpoints. Simulating IVR carrier trunk bypasses. Credit is authorized."
    },
    {
      title: "AI Twin Future Projections",
      timeRange: "50s - 60s",
      icon: <TrendingUp className="w-4 h-4 text-indigo-400" />,
      tag: "FUTURE_SIM",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      description: "Compounding the automated $400 travel credit claims into long-term Marcus saving plans."
    }
  ];

  // Raw telemetry API JSON response payloads matching each Step
  const apiPreviews = [
    {
      endpoint: "GET /api/audio/diagnostics",
      status: 200,
      payload: {
        status: "online",
        channels: { active: 1, sampleRate: "48kHz" },
        diagnostics: {
          latencyMs: 14,
          spectrogramFrequency: "440Hz",
          energyDbfs: -18.4,
          vocalPresenceIndex: 0.94
        },
        monitoringAgent: {
          id: "mon_01",
          task: "Passive Audio Frequency Streaming",
          activeThreads: 1
        }
      }
    },
    {
      endpoint: "POST /api/emotion/spectrograph",
      status: 200,
      payload: {
        acousticPitchShift: "1.5 octaves",
        cortisolLevelClass: "Peak Crisis",
        scores: {
          stress: 96,
          urgency: 98,
          frustration: 92,
          happiness: 5
        },
        monitoringAgent: {
          classifiedTone: "Frustrated Stress Detected",
          priorityCode: "CRITICAL_EXECUTION"
        }
      }
    },
    {
      endpoint: "POST /api/memories/query",
      status: 200,
      payload: {
        query: "comcast outage sister rescue jfk flight",
        cosineSimilarityThreshold: 0.85,
        retrievedNodes: [
          {
            id: "mem_02",
            content: "Sister Alice designated emergency contact. Phone +1-555-0193",
            similarity: 0.94
          },
          {
            id: "mem_03",
            content: "Delta Airlines preferred traveler member profile locked",
            similarity: 0.89
          }
        ]
      }
    },
    {
      endpoint: "POST /api/agent/interact",
      status: 200,
      payload: {
        prompt: "Salvage Comcast outage and evening JFK flight cancellation",
        confidenceScore: 97,
        scenariosDecomposed: [
          { id: "j_t1", service: "Delta Alternate Seat Booking Hold" },
          { id: "j_t2", service: "Comcast Automated Dispute Carrier Link" },
          { id: "j_t3", service: "Sister Curbside SMS Gateway Dispatch" }
        ],
        agentsCoordination: {
          planner: "Target sequence compiled successfully",
          research: "Scanning alternative routes",
          execution: "Queuing micro-tasks"
        }
      }
    },
    {
      endpoint: "POST /api/integrations/sandbox",
      status: 201,
      payload: {
        transports: [
          { route: "Delta Hold Seat 14D departing 2h", status: "VERIFIED" },
          { route: "Comcast Refund INC-893041", value: 25.0, status: "APPROVED" },
          { route: "SMS Dispatch Sibling Alice", status: "TRANSMITTED" }
        ],
        expressEngineStatus: "200_OK_VERIFIED"
      }
    },
    {
      endpoint: "POST /api/scenarios/future-simulation",
      status: 200,
      payload: {
        twinInterventionOrbit: "Compound Savings Diverter",
        divertedValueDollars: 400.0,
        investmentTarget: "Marcus HYSA Downpayment reserves",
        milestones: {
          projectionYear5: { YieldWithIntervention: 498.4, houseTargetDateDelta: "-4 weeks" }
        }
      }
    }
  ];

  // Full transcript variables that type out in Step 1
  const fullTranscriptText = "Oh no, my Comcast internet is completely down, and my evening flight home from JFK to SF was cancelled! My sister Alice is standby. Can you salvage this mess?";

  // Start the autopilot script
  const startAutopilotDemo = () => {
    setIsPlaying(true);
    if (currentStep === -1) {
      setCurrentStep(0);
      setElapsedSeconds(0);
      setTypedTranscript("");
    }
  };

  // Pause the autopilot
  const pauseAutopilotDemo = () => {
    setIsPlaying(false);
  };

  // Reset the autopilot demo back to home coordinates
  const resetAutopilotDemo = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
    setElapsedSeconds(0);
    setTypedTranscript("");
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Reset App.tsx States
    setStatus("idle");
    setDetectedEmotion("Goal-Oriented");
    setEmotionMetrics({ stress: 20, urgency: 35, frustration: 15, happiness: 85 });
    setResponseText("Demo resetting complete. Autopilot coordinates prepared for fresh execution.");
    setReasoningFlow([
      "Autopilot Demo System: State cleared.",
      "Awaiting judge target launch..."
    ]);
    setTimelineSimulation(undefined);
  };

  // Timer loop coordinator
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => {
          const next = prev + 1;
          if (next >= totalDuration) {
            setIsPlaying(false);
            setCurrentStep(5);
            // Success visual fanfare
            triggerSuccessState();
            return totalDuration;
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Handle updates depending on current second tick
  useEffect(() => {
    // Sync current step depending on elapsedSeconds
    // Each step lasts 10 seconds: 0-9 = Step 0, 10-19 = Step 1, 20-29 = Step 2, etc.
    const calculatedStep = Math.floor(elapsedSeconds / 10);
    if (calculatedStep >= 0 && calculatedStep < 6 && calculatedStep !== currentStep) {
      setCurrentStep(calculatedStep);
      executeStepActions(calculatedStep);
    }

    // Interactive Typing simulation during first 8 seconds
    if (elapsedSeconds <= 10) {
      const progressRatio = Math.min(1.0, elapsedSeconds / 8);
      const charactersCount = Math.floor(fullTranscriptText.length * progressRatio);
      setTypedTranscript(fullTranscriptText.substring(0, charactersCount));
      setLastUserUtterance(fullTranscriptText.substring(0, charactersCount));
    }
  }, [elapsedSeconds]);

  // Execute actual synchronized reactions across standard App panels
  const executeStepActions = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        // Step 1: Voice diagnostics
        setStatus("listening");
        setDetectedEmotion("Calm / Preparing");
        setEmotionMetrics({ stress: 45, urgency: 40, frustration: 30, happiness: 50 });
        setResponseText("Synthesizing ambient voice frequencies... Awaiting speech block.");
        setReasoningFlow([
          "Acoustic Capture: Channel 1 active.",
          "Incoming frequency spectrogram mapping 440Hz baseline."
        ]);
        setActiveTab("command"); // Put command tab active to see Life Command Center

        // Update multi-agent & trust states
        setConfidenceScore?.(93);
        setRetrievedMemories?.(["System indexing passive audio channel..."]);
        setTrustMetrics?.({
          whyActionTaken: "Analyzing vocal coordinates to isolate emotional biometric signals.",
          evidenceUsed: "Direct client voice acoustic spectrogram frequency checks.",
          riskMitigation: "Strict client-side isolation preserving biosecure privacy bounds."
        });
        setAgentCollaboration?.([
          { agentName: "Monitoring Agent", action: "Active. Streaming voice frequency amplitude for biometric latency.", status: "active" }
        ]);
        break;

      case 1:
        // Step 2: Emotion Biometrics Assessment
        setStatus("thinking");
        setDetectedEmotion("Peak Crisis State");
        setEmotionMetrics({ stress: 96, urgency: 98, frustration: 92, happiness: 5 });
        setResponseText("Dynamic Emotion Synthesis: Critical levels of stress detected. Pitch frequency shifted 1.5 octaves. Core dispatcher is prioritizing alternative airlines & Comcast service tickets.");
        setReasoningFlow([
          "Analyzed vocal cadence velocity: Speech rate increased 40%.",
          "Calculated biometrics: Peak cortisol warning mapped.",
          "Calming response synthesis channel selected: Speed coefficient limit: 0.82."
        ]);
        setActiveTab("dashboard"); // Switch to dashboard to show live spectrograph / CX meters

        setConfidenceScore?.(91);
        setRetrievedMemories?.(["Semantic vault: Stress patterns matches historical dispute context"]);
        setTrustMetrics?.({
          whyActionTaken: "Classified dominant state: Stress (Cortisol spikes checked). Strategic dispatcher preparing carrier refund & flight re-routes.",
          evidenceUsed: "Biometric vocal speech rate acceleration variables (+40% change).",
          riskMitigation: "Preemptive safety routing enabled. Isolation limit: active."
        });
        setAgentCollaboration?.([
          { agentName: "Monitoring Agent", action: "Active. Synthesizing voice pitch fluctuations.", status: "active" },
          { agentName: "Planner Agent", action: "Priming priority task decomposition maps...", status: "active" }
        ]);
        break;

      case 2:
        // Step 3: Vector database retrieval
        setStatus("speaking");
        setDetectedEmotion("Stress Stabilized");
        setEmotionMetrics({ stress: 70, urgency: 85, frustration: 65, happiness: 20 });
        setResponseText("Recalling coordinates from Long-term database. Matched brother/sister index. Sister Alice, identified as your prime emergency caretaker contact parameter is active.");
        setReasoningFlow([
          "Simulated Cosine Similarity: Query 'flight cancelled sister rescue'",
          "Cosine match: 0.94 probability alignment on 'Sister Alice' (+1-555-0193).",
          "Retrieving sibling coordinates from localized Vault."
        ]);
        
        setConfidenceScore?.(95);
        setRetrievedMemories?.([
          "mem_02: Sibling Alice designated emergency standby contact coordinate",
          "mem_03: Preferred carrier Delta airlines profile locked"
        ]);
        setTrustMetrics?.({
          whyActionTaken: "Extracted sister rescue coordinates based on user profile memories matching 'sister Alice'.",
          evidenceUsed: "Vector cosine match result: 0.94 probability similarity on node #VAL-890.",
          riskMitigation: "Secure masking of contact phone digits (+1-555-XXXX) prior to routing."
        });
        setAgentCollaboration?.([
          { agentName: "Memory Agent", action: "Completed: Retreived Alice sister contact node.", status: "completed" },
          { agentName: "Planner Agent", action: "Formulating workflow sequences...", status: "active" }
        ]);
        break;

      case 3:
        // Step 4: Multi agent decompositions
        setStatus("thinking");
        setDetectedEmotion("Resolving");
        setEmotionMetrics({ stress: 40, urgency: 60, frustration: 30, happiness: 50 });
        setResponseText("Decomposing priorities into simultaneous sub-agent chains. Claiming provider credits, booking fallback SFO flights, and compiling automated alert message targeting sibling Alice.");
        setReasoningFlow([
          "Decomposition Matrix generated: 3 critical nodes.",
          "Forking Carrier Refund Agent: outbound Comcast dispute portal simulation.",
          "Forking Travel Re-routing Agent: Delta seat reservation holds.",
          "Forking Family Alert Node SMS script dispatch pipeline."
        ]);
        // Push demo items onto standard state
        setTasks([
          {
            id: "j_t1",
            title: "Delta Alternative SFO Flight Hold",
            status: "in_progress",
            description: "Reserving fallback seat row 14D on flight DL-1204 departing in 2h.",
            estimate: "Holding seat..."
          },
          {
            id: "j_t2",
            title: "Comcast Cable Outage Dispute",
            status: "in_progress",
            description: "Asserting credit on ticket INC-893041 for block 14.",
            estimate: "$25.00 Voucher"
          },
          {
            id: "j_t3",
            title: "SMS Alert to Sister Alice",
            status: "pending",
            description: "Coordinating rescue pickup at curbside door parameters.",
            estimate: "Pending hold"
          }
        ]);
        setActiveTab("command"); // Switch page back to commander center

        setConfidenceScore?.(97);
        setRetrievedMemories?.([
          "mem_01: Comcast regional account node matched",
          "mem_02: Sister Alice designated emergency standby contact coordinate",
          "mem_03: Preferred carrier Delta airlines profile locked"
        ]);
        setTrustMetrics?.({
          whyActionTaken: "Orchestrated 3-tier sub-agent dispatch blueprint to handle internet outage and flight cancellation concurrently.",
          evidenceUsed: "Verified offline fiber node + Delta flight status cancellation logs.",
          riskMitigation: "Enabling sandboxed dispute claiming to prevent direct credential leakage."
        });
        setAgentCollaboration?.([
          { agentName: "Planner Agent", action: "Decomposed tasks into 3 distinct worker queues.", status: "completed" },
          { agentName: "Research Agent", action: "Scanning travel routes & carrier outage databases.", status: "active" },
          { agentName: "Execution Agent", action: "Submitting Comcast rebate & delta seat hold protocols.", status: "active" }
        ]);
        break;

      case 4:
        // Step 5: Sandbox APIs & Telemetry Logs
        setStatus("speaking");
        setDetectedEmotion("Control Regained");
        setEmotionMetrics({ stress: 25, urgency: 30, frustration: 15, happiness: 75 });
        setResponseText("Executing and completing asynchronous API requests on Express simulation engine. Comcast outage voucher approved ($25 credit auto logged) and direct Delta ticket hold verified successfully.");
        setReasoningFlow([
          "HTTP Request POST /api/carrier/comcast - Status 200 OK. Reference INC-893041.",
          "Payment Gateway auto-approval: Refund $25 registered.",
          "SMS Gateway dispatch to Alice: 'Flight delayed. Re-routed DL-1204. Standby rescue.'",
          "Delta ticket voucher cached: confirmation DL-A893."
        ]);
        setTasks([
          {
            id: "j_t1",
            title: "Delta Alternative SFO Flight Hold",
            status: "completed",
            description: "Reserving fallback seat row 14D on flight DL-1204 departing in 2h.",
            estimate: "Confirmed"
          },
          {
            id: "j_t2",
            title: "Comcast Cable Outage Dispute",
            status: "completed",
            description: "Asserting credit on ticket INC-893041 for block 14.",
            estimate: "Voucher Approved"
          },
          {
            id: "j_t3",
            title: "SMS Alert to Sister Alice",
            status: "completed",
            description: "Coordinating rescue pickup at curbside door parameters.",
            estimate: "Sent successfully"
          }
        ]);
        // Switch to systems integration tab to show sandbox animations
        setActiveTab("system");

        setConfidenceScore?.(98);
        setRetrievedMemories?.([
          "mem_01: Comcast regional account node matched",
          "mem_02: Sister Alice designated emergency standby contact coordinate",
          "mem_03: Preferred carrier Delta airlines profile locked"
        ]);
        setTrustMetrics?.({
          whyActionTaken: "Submitted outbound carrier claims & completed flight hotel safeguards.",
          evidenceUsed: "Express custom microservice API callbacks returning HTTP 200 status.",
          riskMitigation: "Isolated credit transaction codes into localized client safe structures."
        });
        setAgentCollaboration?.([
          { agentName: "Planner Agent", action: "Strategy completed successfully.", status: "completed" },
          { agentName: "Research Agent", action: "Completed: Map routes verified.", status: "completed" },
          { agentName: "Execution Agent", action: "Completed: Claims filed, seat DL-1204 locked, SMS transmitted.", status: "completed" },
          { agentName: "Monitoring Agent", action: "Active. Biometric tension parameters resolving.", status: "active" }
        ]);
        break;

      case 5:
        // Step 6: Future projections & simulations
        setStatus("speaking");
        setDetectedEmotion("Accomplished");
        setEmotionMetrics({ stress: 10, urgency: 15, frustration: 5, happiness: 95 });
        setResponseText("Strategic long-term optimization complete. I have successfully diverted your automated $400 travel inconvenience airline claim bonus directly to your Marcus High Yield Cash Downpayment account, expediting your 5-year house purchase plan by 4 full weeks!");
        setReasoningFlow([
          "Future Orbit Simulation activated.",
          "Calculated compound interest offset: diverted $400 over 5 years yields $498.40.",
          "Amortizing downpayment milestones trajectory.",
          "Unified Operator Index spiked to optimal status."
        ]);
        setTimelineSimulation({
          title: "AI Twin Financial Mitigation Orbit",
          analysis: "Disruptive $400 airlines voucher redirected to compound interests",
          milestones: [
            {
              period: "Current Mitigation Action",
              targetGoal: "Integrate $400 flight premium penalty",
              actionRequired: "Set auto routing directly to high-rate Marcus Vault index.",
              estimatedCostSavings: "$498 accumulated at Year 5 target.",
              riskAnalysis: "None. Strictly liquid risk offset."
            },
            {
              period: "New House Target Adjustment",
              targetGoal: "Expedite house Downpayment trajectory date",
              actionRequired: "5-Year mortgage requirement hit 4 weeks earlier.",
              estimatedCostSavings: "Save supplementary rental lease expenditure",
              riskAnalysis: "Ensures security buffer stays intact."
            }
          ]
        });
        setMetrics(prev => ({
          ...prev,
          completedTasks: prev.completedTasks + 3,
          timeSavedHours: prev.timeSavedHours + 4,
          moneySavedDollars: prev.moneySavedDollars + 425,
          stressReductionScore: 98,
          productivityScore: 97
        }));

        setConfidenceScore?.(99);
        setRetrievedMemories?.([
          "mem_01: Comcast regional account node matched",
          "mem_14: Savings compound target Marcus"
        ]);
        setTrustMetrics?.({
          whyActionTaken: "Diverted $400 airline reimbursement award to Marcus HYSA downpayment reserves.",
          evidenceUsed: "Calculated Year-5 yield projection ($498.40) exceeding passive cash index.",
          riskMitigation: "Liquid preservation verified. Total risk tier offset: optimal."
        });
        setAgentCollaboration?.([
          { agentName: "Planner Agent", action: "Goal achieved.", status: "completed" },
          { agentName: "Execution Agent", action: "Wired funds directly to Marcus Downpayment Vault.", status: "completed" },
          { agentName: "Memory Agent", action: "Archived long-term simulation coordinates.", status: "completed" }
        ]);
        break;

      default:
        break;
    }
  };

  // Final Demo Completed success callback
  const triggerSuccessState = () => {
    setStatus("idle");
    setResponseText("🌟 60s Autopilot Demo complete! Every target metric has been optimized, background integrations simulated, Alice alert dispatched, and future savings plans successfully accelerated. Absolute success.");
    setChatHistory(prev => [
      ...prev,
      { role: "user", text: "Run Autopilot workflow demo..." },
      { role: "assistant", text: "🌟 Autopilot Demo complete! Optimized active problems, secured savings allocations, and finalized Sibling support. You are fully coordinated." }
    ]);
  };

  // Skip direct to any Step on demand for presentation agility
  const jumpToStep = (idx: number) => {
    setCurrentStep(idx);
    setElapsedSeconds(idx * 10);
    executeStepActions(idx);
    setIsPlaying(true);
  };

  return (
    <div className="glass-card rounded-[32px] p-6 border-purple-500/25 glow-border-purple relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" id="judge_demo_panel">
      
      {/* Visual neon indicator spotlight */}
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-white/5 relative z-10">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
              Automated Presentation Deck
            </span>
          </div>
          <h3 className="font-display font-bold text-white text-lg">
            🏆 Judge Presentation Simulator Mode
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Simulate a high-fidelity 60-second end-to-end voice automation workflow with character transcript overlays, AI reasoning updates, tab sequencing, and actual database triggers. Perfect for a 10s wow factor!
          </p>
        </div>

        {/* Visual countdown progress */}
        <div className="bg-slate-950 px-4 py-2.5 rounded-2xl border border-white/5 text-right font-mono min-w-[150px] shrink-0">
          <span className="text-[10px] text-slate-500 block uppercase">TIMELINE INDEX</span>
          <div className="flex items-baseline justify-end gap-1 font-bold text-white">
            <span className="text-lg text-purple-400">{(totalDuration - elapsedSeconds).toFixed(1)}</span>
            <span className="text-xs text-slate-400">secs left</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden mt-1.5">
            <div 
              className="h-full bg-purple-500 transition-all duration-300" 
              style={{ width: `${(elapsedSeconds / totalDuration) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main presentation grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 mb-5">
        
        {/* Left Side: Controller Deck with Live Waves */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-3.5">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Presentation Controls</span>
            
            <div className="flex gap-2">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={startAutopilotDemo}
                  className="flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 transition text-xs font-semibold text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-500/10"
                >
                  <Play className="w-4 h-4" />
                  <span>{currentStep === -1 ? "Run Autopilot" : "Resume"}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={pauseAutopilotDemo}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 transition text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 cursor-pointer border border-white/10"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause Demo</span>
                </button>
              )}

              <button
                type="button"
                onClick={resetAutopilotDemo}
                className="p-3 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-slate-100 transition cursor-pointer"
                title="Reset coordinates"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive sound equalizer that beats only when demo is active */}
            {isPlaying && (
              <div className="flex items-center justify-center gap-1.5 py-4 bg-slate-900/50 rounded-xl border border-white/5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((bar) => {
                  const animDelay = `${(bar % 4) * 0.15}s`;
                  return (
                    <div 
                      key={bar}
                      className="w-1 bg-purple-500 rounded animate-[wave-ripple_0.9s_ease-in-out_infinite] transition-all"
                      style={{ 
                        height: isPlaying ? `${Math.floor(Math.random() * 25) + 10}px` : "4px",
                        animationDelay: animDelay 
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Micro Typing Live Transcript Feed overlay */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-2">
            <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
              ⌨️ Automated Voice-To-Text Overlays
            </span>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-white/5 min-h-[90px] flex items-center">
              {typedTranscript ? (
                <p className="text-xs font-mono text-slate-200 leading-relaxed italic">
                  &ldquo;{typedTranscript}&rdquo;
                  <span className="inline-block w-1.5 h-3 bg-purple-400 animate-pulse ml-0.5" />
                </p>
              ) : (
                <p className="text-xs text-slate-500 font-mono italic">
                  Press "Run Autopilot" to overlay microphone transcription text...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Step-by-Step Presentation Deck */}
        <div className="md:col-span-7 space-y-3">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Simulation Deck Pipeline (10s intervals)</span>
          
          <div className="space-y-2">
            {steps.map((st, idx) => {
              const isCurrent = currentStep === idx;
              const isCompletedValue = currentStep > idx;
              
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => jumpToStep(idx)}
                  className={`w-full p-2.5 rounded-xl text-left border flex items-start gap-3 transition-all cursor-pointer text-xs group/step
                    ${isCurrent 
                      ? "bg-purple-950/40 border-purple-500/50 shadow shadow-purple-500/10 scale-[1.01]" 
                      : isCompletedValue 
                        ? "bg-slate-950/40 border-emerald-500/10 opacity-70" 
                        : "bg-slate-950/20 border-white/5 opacity-45 hover:opacity-75"
                    }
                  `}
                >
                  <div className={`p-2 rounded-lg shrink-0 transition-colors
                    ${isCurrent ? "bg-purple-500/20 text-purple-300" : isCompletedValue ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-900 text-slate-500"}
                  `}>
                    {isCompletedValue ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : st.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex gap-2 items-center">
                      <span className="font-semibold text-slate-200 group-hover/step:text-white transition-colors">{st.title}</span>
                      <span className={`px-1 rounded text-[8px] font-mono ${st.badgeColor}`}>{st.timeRange}</span>
                    </div>
                    {isCurrent && (
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed font-sans">
                        {st.description}
                      </p>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-purple-400 opacity-0 group-hover/step:opacity-100 transition-opacity">
                    Jump &rarr;
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real-time API Response Preview Terminal & Live Execution Timeline */}
      <div className="mt-6 glass-card rounded-[24px] border border-white/5 bg-slate-950/60 overflow-hidden relative" id="api_telemetry_terminal">
        {/* Header */}
        <div 
          onClick={() => setIsDebugExpanded(!isDebugExpanded)}
          className="flex items-center justify-between px-5 py-4 border-b border-white/5 cursor-pointer hover:bg-white/[0.02] transition-colors select-none"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-4.5 h-4.5 text-purple-400 animate-pulse" />
            <h4 className="text-xs font-bold font-mono tracking-wider text-slate-200">
              ⚡ LIVE MULTI-AGENT EXECUTION TELEMETRY & API RESPONSE PREVIEWS
            </h4>
            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
              ACTUAL SCHEMAS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-500">
              [ {isDebugExpanded ? "COLLAPSE PANEL" : "EXPAND TELEMETRY"} ]
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Console Body */}
        {isDebugExpanded && (
          <div className="p-5 space-y-4 fade-in">
            {/* Step Selection Tabs */}
            <div className="flex gap-1 overflow-x-auto scrollbar-none pb-2 border-b border-white/5">
              {steps.map((st, i) => {
                const isActive = (selectedDebugTab === null && currentStep === i) || selectedDebugTab === i;
                const isDispatched = currentStep >= i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDebugTab(i)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[9px] cursor-pointer whitespace-nowrap transition-all border
                      ${isActive 
                        ? "bg-purple-500/15 border-purple-500/30 text-purple-300"
                        : isDispatched
                          ? "bg-slate-900 border-white/5 text-slate-300"
                          : "bg-slate-950 border-transparent text-slate-600 hover:text-slate-400"
                      }
                    `}
                  >
                    <span className="opacity-60 block text-[7px]">STEP 0{i + 1}</span>
                    <span className="font-bold flex items-center gap-1">
                      {isDispatched && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                      {st.tag}
                    </span>
                  </button>
                );
              })}
              <button
                onClick={() => setSelectedDebugTab(null)}
                className={`px-3 py-1.5 rounded-lg font-mono text-[9px] cursor-pointer whitespace-nowrap transition-all border
                  ${selectedDebugTab === null
                    ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-300"
                    : "bg-slate-950 border-transparent text-slate-500 hover:text-slate-400"
                  }
                `}
              >
                <span className="opacity-60 block text-[7px]">FOLLOW ENGINE</span>
                <span className="font-bold">SYNC_TIME</span>
              </button>
            </div>

            {/* active step content */}
            {(() => {
              const viewIdx = selectedDebugTab !== null ? selectedDebugTab : Math.max(0, currentStep);
              const preview = apiPreviews[viewIdx] || apiPreviews[0];
              const logLines = [
                `[SYSTEM_BOOT] Initializing sub-agent pipeline parameters...`,
                `[MONITOR] Voice spectral energy classified and filtered client-side.`,
                `[DB_ROUTING] Querying cosine similarity index vectors in MemoryVault...`,
                `[PLANNER] Orchestrating sequence nodes using multi-agent model logic.`,
                `[EXEC] Initializing sandbox triggers for external dispatch targets.`,
                `[FUTURE] AI Twin simulation launched. Trajectory metrics successfully updated.`
              ];

              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-mono text-left">
                  {/* Left columns: Log Stream Tracker */}
                  <div className="lg:col-span-4 bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-[9px] text-slate-500 border-b border-white/5 pb-2 mb-2">
                      <span>📜 SHELL EXECUTION TIME LOGS</span>
                      <span className="text-purple-400 animate-pulse">RUNNING...</span>
                    </div>
                    <div className="text-[10px] space-y-1.5 h-[180px] overflow-y-auto scrollbar-thin scrollbar-white/5 text-slate-400 leading-normal">
                      <div className="text-slate-500"># system logging initialized...</div>
                      {logLines.slice(0, viewIdx + 1).map((log, li) => (
                        <div key={li} className="flex gap-2">
                          <span className="text-slate-600">[+{li * 10}s]</span>
                          <span className={li === viewIdx ? "text-purple-300 font-bold" : ""}>{log}</span>
                        </div>
                      ))}
                      {viewIdx < steps.length - 1 && (
                        <div className="text-slate-600 animate-pulse">... awaiting incremental step telemetry ...</div>
                      )}
                    </div>
                  </div>

                  {/* Right columns: Raw API JSON Output */}
                  <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-white/5 overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-white/5 text-[9px] text-slate-400 animate-fade-in">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                          HTTP {preview.status}
                        </span>
                        <span>{preview.endpoint}</span>
                      </div>
                      <span className="text-slate-500 font-mono">JSON_RAW_FRAME</span>
                    </div>
                    <div className="p-4 bg-slate-950 overflow-auto h-[180px] text-[10px] text-emerald-400 selection:bg-emerald-500/10 leading-relaxed scrollbar-thin scrollbar-white/5">
                      <pre className="font-mono text-left">
                        {JSON.stringify(preview.payload, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2.5 bg-cyan-950/15 border border-cyan-500/15 rounded-2xl p-3.5 text-[11px] text-cyan-300">
        <Zap className="w-4 h-4 text-cyan-400 shrink-0 animate-bounce" />
        <span>
          <strong>Double-Impact Hackathon Presentation Strategy</strong>: Simply trigger this presentation simulator during the opening of your pitches. It automatically sequences through tab layouts on the right column representing actual server operations while highlighting deep acoustic telemetry.
        </span>
      </div>
    </div>
  );
}
