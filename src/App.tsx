import React, { useState, useEffect, useRef } from "react";
import {
  WifiOff,
  Home,
  PlaneTakeoff,
  DollarSign,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Layers,
  Check,
  TrendingUp,
  Brain,
  Volume2,
  RefreshCw,
  Clock,
  ArrowRight,
  ArrowLeft,
  X,
  Plus,
  Play,
  Pause,
  ChevronRight,
  Globe,
  Database,
  Search,
  Activity,
  Award,
  HelpCircle,
  MessageSquare,
  Loader2
} from "lucide-react";
import UniversalLanguageAgent from "./components/UniversalLanguageAgent";
import MemoryVault from "./components/MemoryVault";
import AgentCollaborationGraph from "./components/AgentCollaborationGraph";
import PersonalKnowledgeGraph from "./components/PersonalKnowledgeGraph";
import EmergencyCenter from "./components/EmergencyCenter";
import {
  BASELINE_METRICS,
  INITIAL_TASKS,
  GENERAL_DEMO_SCENARIOS,
  HOVER_EMOTIONS
} from "./demoData";
import { TaskItem, TimelineSimulation, AgentResponse, EmotionMetrics } from "./types";

export default function App() {
  // Voice states
  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [lastUserUtterance, setLastUserUtterance] = useState<string>("");
  const [responseText, setResponseText] = useState<string>(
    "Welcome to AuraOS Core. I am your voice-first ambient executor. Speak to me or load a demonstration scenario."
  );
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: "Welcome to AuraOS Core. I am your voice-first ambient executor. Speak to me or load a demonstration scenario." }
  ]);
  const [detectedEmotion, setDetectedEmotion] = useState<string>("Goal-Oriented");
  const [emotionMetrics, setEmotionMetrics] = useState<EmotionMetrics>({
    stress: 20,
    urgency: 35,
    frustration: 15,
    happiness: 85,
  });

  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [timelineSimulation, setTimelineSimulation] = useState<TimelineSimulation | undefined>(undefined);
  const [metrics, setMetrics] = useState(BASELINE_METRICS);
  const [reasoningFlow, setReasoningFlow] = useState<string[]>([
    "Initialized AuraOS premium voice model core safely.",
    "Synchronized with long-term vector vaults.",
    "Standing by for voice instruction stream..."
  ]);

  const [manualInput, setManualInput] = useState("");
  const [micAvailable, setMicAvailable] = useState(true);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Advanced explainable AI states
  const [confidenceScore, setConfidenceScore] = useState<number | undefined>(94);
  const [retrievedMemories, setRetrievedMemories] = useState<string[] | undefined>([
    "mem_01: Base user preference profiles loaded",
    "mem_02: Sibling emergency contact channel verified"
  ]);
  const [trustMetrics, setTrustMetrics] = useState<{ whyActionTaken: string; evidenceUsed: string; riskMitigation: string } | undefined>({
    whyActionTaken: "Initialized system priorities correctly.",
    evidenceUsed: "Regional coordinate lookup vectors.",
    riskMitigation: "Applied safe isolated sandboxes."
  });
  const [agentCollaboration, setAgentCollaboration] = useState<{ agentName: string; action: string; status: string }[] | undefined>(undefined);

  // Premium UI overlay controls
  const [activeOverlay, setActiveOverlay] = useState<"global_comm" | "memory_vault" | "emergency" | "judge_demo" | null>(null);
  
  // App system guidance chatbot states
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [guideInput, setGuideInput] = useState<string>("");
  const [isGuideTyping, setIsGuideTyping] = useState<boolean>(false);
  const [guideMessages, setGuideMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    {
      sender: "bot",
      text: "Hello, Judge! I am your **AuraOS Guidance Assistant**. I can help you understand how AuraOS operates, how our 5 parallel agents collaborate, or guide you on how to trigger different simulation models. Feel free to type a question or select one of the suggested topics below!"
    }
  ]);
  
  // Cinematic workflow player state
  const [workflowActive, setWorkflowActive] = useState<boolean>(false);
  const [workflowStep, setWorkflowStep] = useState<number>(1);
  const [workflowAutoPlay, setWorkflowAutoPlay] = useState<boolean>(true);

  // Web Speech refs
  const recognitionRef = useRef<any | null>(null);

  // Local clock state
  const [currentTime, setCurrentTime] = useState<string>("");
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Web Speech API Initialization
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicAvailable(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";

    rec.onstart = () => {
      setStatus("listening");
    };

    rec.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      if (text) {
        handleInteractWithAgent(text);
      }
    };

    rec.onerror = (err: any) => {
      console.warn("Speech recognition error:", err);
      setStatus("idle");
    };

    rec.onend = () => {
      if (status === "listening") {
        setStatus("idle");
      }
    };

    recognitionRef.current = rec;
  }, [status]);

  // Handle Speech Synthesis
  useEffect(() => {
    if (responseText && status === "speaking" && workflowStep === 7) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(responseText);
      
      const emotionLower = detectedEmotion.toLowerCase();
      if (emotionLower.includes("stress") || emotionLower.includes("anxious")) {
        utterance.rate = 0.82;
        utterance.pitch = 1.05;
      } else if (emotionLower.includes("urgency") || emotionLower.includes("urgent")) {
        utterance.rate = 1.05;
        utterance.pitch = 0.98;
      } else {
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
      }

      utterance.onend = () => {
        setIsSynthesizing(false);
        setStatus("idle");
      };

      utterance.onerror = () => {
        setIsSynthesizing(false);
        setStatus("idle");
      };

      setIsSynthesizing(true);
      window.speechSynthesis.speak(utterance);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [responseText, status, detectedEmotion, workflowStep]);

  // Cinematic sequence auto-advance
  useEffect(() => {
    let timer: any;
    if (workflowActive && workflowAutoPlay && workflowStep < 7) {
      timer = setTimeout(() => {
        setWorkflowStep(prev => prev + 1);
      }, 1300); // 1.3s per step maintains optimal narrative pacing for judges
    }
    return () => clearTimeout(timer);
  }, [workflowActive, workflowStep, workflowAutoPlay]);

  const toggleMic = () => {
    if (status === "listening") {
      recognitionRef.current?.stop();
    } else {
      window.speechSynthesis.cancel();
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn("Speech API start failed:", err);
        setStatus("listening");
        // Simulate fallback typing if recognition errors or fails
        setTimeout(() => {
          handleInteractWithAgent("My flight was cancelled at JFK terminal. Get me home!");
        }, 1500);
      }
    }
  };

  const handleSimulateScenario = (promptText: string, skipUserAppend = false) => {
    setStatus("thinking");
    setLastUserUtterance(promptText);
    
    // Set up step-by-step immersive AI workflow
    setWorkflowActive(true);
    setWorkflowStep(1);
    setWorkflowAutoPlay(true);

    setTimeout(() => {
      const promptLower = promptText.toLowerCase();
      let simulatedResponse: AgentResponse;

      if (promptLower.includes("internet") || promptLower.includes("outage")) {
        simulatedResponse = {
          detectedEmotion: "Stress Alert",
          emotionMetrics: { stress: 78, urgency: 85, frustration: 80, happiness: 10 },
          responseText: "I've detected high stress regarding this internet outage. Do not worry. I have automatically isolated your cable provider as Comcast on zip block 14, filed refund ticket #INC-893041 on your portal, and reserved the earliest technician slot for Tuesday morning.",
          reasoningFlow: [
            "Analyzed voice tone & stress: High urgency priority triggered.",
            "Pinger verified local Comcast fiber block-14 modem signal is down.",
            "Dynamically mapped alternative priority schedules over Google Calendar.",
            "Fyled claims contract ticket #INC-893041. $25 credit approved.",
            "Rerouted client primary link with cellular hotspot backup."
          ],
          tasks: [
            {
              id: "t_int_1",
              title: "Comcast Rescheduling Lock",
              status: "in_progress",
              description: "Secured morning slot priority: Tuesday 8:00 AM - 10:00 AM.",
              estimate: "Scheduled"
            },
            {
              id: "t_int_2",
              title: "ISP Outage Dispute Sourcing",
              status: "completed",
              description: "Filed service failure ticket #INC-893041. $25 credit issued.",
              estimate: "Refunding complete"
            },
            {
              id: "t_int_3",
              title: "Hostspot Cellular Backup Routing",
              status: "completed",
              description: "Switched system coordinates to secure hotpot backup line.",
              estimate: "Active"
            }
          ],
          metricsDelta: {
            timeSavedMinutes: 65,
            moneySavedDollars: 25,
            productivityScoreDelta: 4,
            stressReductionDelta: 35
          }
        };
      } else if (promptLower.includes("house") || promptLower.includes("5 years") || promptLower.includes("buy")) {
        simulatedResponse = {
          detectedEmotion: "Goal-Oriented",
          emotionMetrics: { stress: 15, urgency: 40, frustration: 10, happiness: 90 },
          responseText: "What an incredibly exciting milestone! Buying a house in 5 years is highly achievable. I have compiled a detailed, non-linear strategic savings projection, established high-yield sweep rules, and automated your monthly budget audits.",
          reasoningFlow: [
            "Identified wealth compilation goals with calm syntactic indices.",
            "Cross-referenced local mid-market pricing maps (~$420,000 threshold).",
            "Mated Compounding projections with 4.4% APY Marcus sweep options.",
            "Optimmed recurring subscriptions pool to free $1,800 yearly downpayments.",
            "Applied risk assessments safeguards regarding local mortgage rate changes."
          ],
          tasks: [
            {
              id: "t_h_1",
              title: "Deploy APY Downpayment Vault",
              status: "completed",
              description: "Established Marcus Cash sweep routing with 4.4% APY.",
              estimate: "Completed"
            },
            {
              id: "t_h_2",
              title: "Automate Monthly Deposit Routines",
              status: "in_progress",
              description: "Configured auto-sweep parameters on salary incoming days.",
              estimate: "Awaiting final link"
            }
          ],
          timelineSimulation: {
            title: "5-Year Structural Home Savings Timeline",
            analysis: "Goal: Accumulate $85,000 downpayment cash utilizing secure compounding products.",
            milestones: [
              {
                period: "Year 1 - Setup",
                targetGoal: "Launch downpayment cache & auto-save $14,000.",
                actionRequired: "Initiate monthly manual $1,150 sweep to APY Marcus vault.",
                estimatedCostSavings: "$1,800 from automated subscriptions pruning",
                riskAnalysis: "High interest environment. Keep funds strictly liquid."
              },
              {
                period: "Year 5 - Closing",
                targetGoal: "Amass $86,000 total cache & execute downpayment wiring.",
                actionRequired: "Submit pre-approval credits files, secure keys, and close transaction.",
                estimatedCostSavings: "Approx. $11,000 saved on priority mortgage rates",
                riskAnalysis: "Ensure emergency capital remains untouched."
              }
            ]
          },
          metricsDelta: {
            timeSavedMinutes: 240,
            moneySavedDollars: 1540,
            productivityScoreDelta: 15,
            stressReductionDelta: 60
          }
        };
      } else if (promptLower.includes("flight") || promptLower.includes("airport") || promptLower.includes("cancelled")) {
        simulatedResponse = {
          detectedEmotion: "Highly Stressed",
          emotionMetrics: { stress: 94, urgency: 98, frustration: 92, happiness: 5 },
          responseText: "I've detected extreme stress and anxiety from your cancellation at JFK. Please stay calm. I have automatically locked a standby seat on direct flight DL-1204 departing in 2 hours, submitted a $400 airline insurance claim, and preordered a vehicle collection.",
          reasoningFlow: [
            "Acoustic biometric check: Peak stress and high frustration metrics found.",
            "Scoured real-time departures boards: Isolated Delta DL-1204 as optimal reroute.",
            "Secured priority seat voucher holdDL-1204 using stored credit card vault.",
            "Completed automated regulatory Passenger Claims compensation draft.",
            "Ordered Terminal 4 Door 3 vehicle transit to prevent curbside delays."
          ],
          tasks: [
            {
              id: "t_fl_1",
              title: "Alternative Delta Seat Hold",
              status: "completed",
              description: "Placed fallback seat 14D on flight DL-1204 departing in 2 hours.",
              estimate: "Locked & safe"
            },
            {
              id: "t_fl_2",
              title: "Passenger Rights Claim Filing",
              status: "in_progress",
              description: "Submitting weather disruption indemnity sheet. $400 refund projected.",
              estimate: "Awaiting carrier check"
            },
            {
              id: "t_fl_3",
              title: "Terminal Car Pickup Dispatch",
              status: "completed",
              description: "Pre-booked curbside transfer shuttle. Arriving Terminal 4 in 15 mins.",
              estimate: "Dispatched"
            }
          ],
          metricsDelta: {
            timeSavedMinutes: 180,
            moneySavedDollars: 400,
            productivityScoreDelta: 8,
            stressReductionDelta: 85
          }
        };
      } else if (promptLower.includes("gym") || promptLower.includes("membership") || promptLower.includes("cancel")) {
        simulatedResponse = {
          detectedEmotion: "Frustrated",
          emotionMetrics: { stress: 45, urgency: 50, frustration: 75, happiness: 20 },
          responseText: "Understood. Gym cancel claims are notoriously filled with loops. I have launched an agentic certified dispute: I downloaded your terms contract, auto-filled the cancellation brief PDF, and queued an outgoing phone proxy to verify cancellation confirmation.",
          reasoningFlow: [
            "Frustration index heightened over gym contract guidelines.",
            "Scraped club cancellation contract document.",
            "Auto-completed Clause 12(b) rescission paperwork using pre-saved user ID.",
            "Queued dialing bot verification line to confirm gym roster removal offline."
          ],
          tasks: [
            {
              id: "t_gym_1",
              title: "Draft & Mail Guild Cancellation Form",
              status: "completed",
              description: "Generated certified rescind PDF with zero cancellation fees.",
              estimate: "Form Submitted"
            },
            {
              id: "t_gym_2",
              title: "Dialer Verification Queue",
              status: "in_progress",
              description: "Automated phone proxy scheduled to speak with gym coordinator.",
              estimate: "Pending check"
            }
          ],
          metricsDelta: {
            timeSavedMinutes: 45,
            moneySavedDollars: 120,
            productivityScoreDelta: 2,
            stressReductionDelta: 40
          }
        };
      } else {
        simulatedResponse = {
          detectedEmotion: "Neutral / Curious",
          emotionMetrics: { stress: 30, urgency: 40, frustration: 25, happiness: 65 },
          responseText: `Acknowledged: "${promptText}". I am analyzing active dependencies, cross-referencing semantic directories, and setting up an automated action checklist to resolve this.`,
          reasoningFlow: [
            `Processed voice input stream: "${promptText}"`,
            "Analyzing target utilities nodes and personal contexts.",
            "Formulating background automation pipeline."
          ],
          tasks: [
            {
              id: "t_gen_" + Date.now(),
              title: `Coordinate Goal: ${promptText.substring(0, 32)}...`,
              status: "in_progress",
              description: "Running simulated background APIs & task resolution flows.",
              estimate: "20 mins remaining"
            }
          ],
          metricsDelta: {
            timeSavedMinutes: 20,
            moneySavedDollars: 0,
            productivityScoreDelta: 1,
            stressReductionDelta: 15
          }
        };
      }

      // Update state
      setDetectedEmotion(simulatedResponse.detectedEmotion);
      setEmotionMetrics(simulatedResponse.emotionMetrics);
      setResponseText(simulatedResponse.responseText);
      setReasoningFlow(simulatedResponse.reasoningFlow);
      setTasks(simulatedResponse.tasks);

      // Populate semantic retrieval values
      const isInternet = promptLower.includes("internet") || promptLower.includes("outage") || promptLower.includes("comcast");
      const isFlight = promptLower.includes("flight") || promptLower.includes("cancel") || promptLower.includes("airport");
      const isGym = promptLower.includes("gym") || promptLower.includes("membership");

      const simulatedMemories = isInternet
        ? ["mem_01: Comcast residential node matched", "mem_02: Sister Alice emergency proxy backup"]
        : isFlight
          ? ["mem_02: Sister Alice physical coordinate mapped", "mem_03: Delta Preferred Carrier profile locked"]
          : isGym
            ? ["mem_04: Subscription cancellation loophole Clause 12(b) verified"]
            : ["mem_01: General system preferences map configured"];

      setConfidenceScore(Math.floor(Math.random() * 5) + 94);
      setRetrievedMemories(simulatedMemories);

      setTrustMetrics({
        whyActionTaken: isInternet
          ? "Modem offline alert caught on block 14. Booked technician instantly to prevent scheduled slot exhaustion."
          : isFlight
            ? "Flight cancelled at terminal. Placed temporary hold DL-1204 with baggage pickup times sync."
            : isGym
              ? "Completed certified termination form applying legal Clause 12(b) rescission variables."
              : "Dispatched background thread coordination to resolve life priorities.",
        evidenceUsed: isInternet
          ? "Incident logs verified. Comcast localized broadband ping status down inside zip block."
          : isFlight
            ? "FAA airport timetables index, baggage pickup Door 3 terminal metadata."
            : isGym
              ? "Extracted text segment from page 4 of local gym contract."
              : "Core knowledge base embeddings lookup",
        riskMitigation: isInternet
          ? "Switched system hotspot fallback to maintain emergency meeting bandwidth."
          : isFlight
            ? "Seat secured inside 10-minute carrier expiration threshold window."
            : isGym
              ? "Scheduled human call verification to block collections agencies."
              : "Applied sandbox coordination."
      });

      setAgentCollaboration([
        { agentName: "Planner Agent", action: "Orchestrated tactical response checklist", status: "completed" },
        { agentName: "Research Agent", action: isInternet ? "Checked regional outage map nodes" : isFlight ? "Scanned alternate flights JFK->SFO" : "Processed contract variables", status: "completed" },
        { agentName: "Execution Agent", action: isInternet ? "Submitting Comcast rebate INC-892415" : isFlight ? "Reserving Delta Flight seat" : "Generating PDF certified rescission", status: "completed" },
        { agentName: "Monitoring Agent", action: "Streaming voice acoustic frequency stress levels", status: "active" },
        { agentName: "Memory Agent", action: "Syncing transaction tags with memoryDb", status: "completed" }
      ]);

      setChatHistory(prev => {
        const copy = [...prev];
        if (!skipUserAppend) {
          copy.push({ role: "user", text: promptText });
        }
        copy.push({ role: "assistant", text: simulatedResponse.responseText });
        return copy;
      });

      if (simulatedResponse.timelineSimulation) {
        setTimelineSimulation(simulatedResponse.timelineSimulation);
      } else {
        setTimelineSimulation(undefined);
      }

      setMetrics(prev => ({
        ...prev,
        activeTasks: simulatedResponse.tasks.filter(t => t.status !== "completed").length,
        completedTasks: prev.completedTasks + simulatedResponse.tasks.filter(t => t.status === "completed").length,
        timeSavedHours: prev.timeSavedHours + (simulatedResponse.metricsDelta.timeSavedMinutes / 60),
        moneySavedDollars: prev.moneySavedDollars + simulatedResponse.metricsDelta.moneySavedDollars,
        stressReductionScore: Math.min(100, prev.stressReductionScore + 4),
        productivityScore: Math.min(100, prev.productivityScore + 3),
      }));

    }, 1500);
  };

  const handleInteractWithAgent = async (text: string) => {
    if (!text.trim()) return;
    
    setStatus("thinking");
    setLastUserUtterance(text);
    
    setWorkflowActive(true);
    setWorkflowStep(1);
    setWorkflowAutoPlay(true);

    const userEntry = { role: "user" as const, text };
    setChatHistory(prev => [...prev, userEntry]);
    const updatedHistory = [...chatHistory, userEntry];

    try {
      const response = await fetch("/api/agent/interact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userText: text,
          context: {
            currentEmotionState: detectedEmotion,
            priorTasks: tasks,
            history: updatedHistory
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`);
      }

      const data: AgentResponse = await response.json();
      
      setDetectedEmotion(data.detectedEmotion);
      setEmotionMetrics(data.emotionMetrics);
      setResponseText(data.responseText);
      setChatHistory(prev => [...prev, { role: "assistant", text: data.responseText }]);
      setReasoningFlow(data.reasoningFlow);
      setTasks(data.tasks);

      setConfidenceScore(data.confidenceScore || 96);
      setRetrievedMemories(data.retrievedMemories || []);
      setTrustMetrics(data.trustMetrics);
      setAgentCollaboration(data.agentCollaboration);

      if (data.timelineSimulation) {
        setTimelineSimulation(data.timelineSimulation);
      } else {
        setTimelineSimulation(undefined);
      }

      if (data.metricsDelta) {
        setMetrics(prev => ({
          ...prev,
          activeTasks: data.tasks.filter(t => t.status !== "completed").length,
          completedTasks: prev.completedTasks + data.tasks.filter(t => t.status === "completed").length,
          timeSavedHours: prev.timeSavedHours + (data.metricsDelta.timeSavedMinutes / 60),
          moneySavedDollars: prev.moneySavedDollars + data.metricsDelta.moneySavedDollars,
          stressReductionScore: Math.min(100, Math.max(10, prev.stressReductionScore + data.metricsDelta.stressReductionDelta)),
          productivityScore: Math.min(100, Math.max(10, prev.productivityScore + data.metricsDelta.productivityScoreDelta)),
        }));
      }

    } catch (err) {
      console.warn("Express backend connection offline. Initiating client-side hyper-fidelity engine.", err);
      // Fallback is graceful & triggers step-by-step
      handleSimulateScenario(text, true);
    }
  };

  const handleClear = () => {
    setTasks(INITIAL_TASKS);
    setMetrics(BASELINE_METRICS);
    setResponseText("Welcome back. Session records refreshed. Ready to coordinate priorities and automate lifestyle workflows.");
    setChatHistory([
      { role: "assistant", text: "Welcome back. Session records refreshed. Ready to coordinate priorities and automate lifestyle workflows." }
    ]);
    setDetectedEmotion("Goal-Oriented");
    setEmotionMetrics({ stress: 20, urgency: 35, frustration: 15, happiness: 85 });
    setReasoningFlow([
      "System reset performed.",
      "AuraOS Core standing by for vocals..."
    ]);
    setTimelineSimulation(undefined);
    setLastUserUtterance("");
    setStatus("idle");
    setWorkflowActive(false);
    setWorkflowStep(1);
    setActiveOverlay(null);
    window.speechSynthesis.cancel();
  };

  const handleResolveMultimodal = (data: AgentResponse & { fileName: string }) => {
    setStatus("thinking");
    setLastUserUtterance(`[Analyzed Document: ${data.fileName}]`);
    
    setWorkflowActive(true);
    setWorkflowStep(1);
    setWorkflowAutoPlay(true);

    setChatHistory(prev => [...prev, { role: "user", text: `Sent document: ${data.fileName} for analysis.` }]);
    
    setDetectedEmotion(data.detectedEmotion);
    setEmotionMetrics(data.emotionMetrics);
    setResponseText(data.responseText);
    setReasoningFlow(data.reasoningFlow);
    setTasks(data.tasks);
    setConfidenceScore(data.confidenceScore || 95);
    setRetrievedMemories(data.retrievedMemories || []);
    setTrustMetrics(data.trustMetrics);
    setAgentCollaboration(data.agentCollaboration);
    
    setChatHistory(prev => [...prev, { role: "assistant", text: data.responseText }]);
    
    if (data.timelineSimulation) {
      setTimelineSimulation(data.timelineSimulation);
    } else {
      setTimelineSimulation(undefined);
    }

    if (data.metricsDelta) {
      setMetrics(prev => ({
        ...prev,
        activeTasks: data.tasks.filter(t => t.status !== "completed").length,
        completedTasks: prev.completedTasks + data.tasks.filter(t => t.status === "completed").length,
        timeSavedHours: prev.timeSavedHours + (data.metricsDelta.timeSavedMinutes / 60),
        moneySavedDollars: prev.moneySavedDollars + data.metricsDelta.moneySavedDollars,
        stressReductionScore: Math.min(100, Math.max(10, prev.stressReductionScore + data.metricsDelta.stressReductionDelta)),
        productivityScore: Math.min(100, Math.max(10, prev.productivityScore + data.metricsDelta.productivityScoreDelta)),
      }));
    }
  };

  const promoteTaskStatus = (id: string) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === id) {
          const statusMap: Record<string, "pending" | "in_progress" | "completed"> = {
            pending: "in_progress",
            in_progress: "completed",
            completed: "pending"
          };
          return { ...task, status: statusMap[task.status] };
        }
        return task;
      })
    );
  };

  const handleManualTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    handleInteractWithAgent(manualInput);
    setManualInput("");
  };

  const handleSendGuideMessage = async (text: string) => {
    if (!text.trim() || isGuideTyping) return;
    
    // Add user message
    setGuideMessages(prev => [...prev, { sender: "user", text }]);
    setGuideInput("");
    setIsGuideTyping(true);
    
    try {
      const res = await fetch("/api/guide/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      if (data.reply) {
        setGuideMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
      } else {
        setGuideMessages(prev => [...prev, { sender: "bot", text: "Something went wrong. Let me assist you anyway. Try asking about 'agents' or clicking one of the demo programs on the screen!" }]);
      }
    } catch {
      setGuideMessages(prev => [...prev, { sender: "bot", text: "I seem to be offline. Let me still assist you! Try saying 'Outage' or 'Home savings' to trigger the pre-coded intelligence systems." }]);
    } finally {
      setIsGuideTyping(false);
    }
  };

  // Determine emotional style colors for orb ring
  const getOrbColorTheme = () => {
    if (status === "listening") return "from-cyan-400 via-teal-400 to-indigo-500 shadow-cyan-500/20";
    if (status === "thinking") return "from-amber-400 via-orange-400 to-yellow-600 shadow-amber-500/20";
    if (status === "speaking") return "from-purple-500 via-fuchsia-400 to-rose-500 shadow-purple-500/20";
    return "from-slate-700 via-indigo-950 to-slate-900 shadow-indigo-500/10";
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-white relative overflow-hidden">
      
      {/* Absolute background graphics inspired by Apple Vision Pro glass and holographic space */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-gradient-to-tr from-cyan-900/10 via-indigo-950/15 to-transparent filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[70%] rounded-full bg-gradient-to-br from-purple-900/15 via-rose-950/10 to-transparent filter blur-[140px] pointer-events-none" />
      
      {/* Subtle Starry Dot Matrix grid Overlay (Nothing OS style) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", 
          backgroundSize: "24px 24px" 
        }} 
      />

      {/* Futuristic Minimal Navigation Header */}
      <header className="border-b border-white/[0.04] bg-slate-950/25 backdrop-blur-xl px-8 py-4 flex items-center justify-between z-40 relative">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 block animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 absolute inset-0 animate-ping opacity-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-light text-slate-300 tracking-wider text-sm">AURA</span>
              <span className="font-mono text-[9px] px-1 bg-white/5 border border-white/10 rounded text-slate-500 uppercase tracking-widest font-bold">OS 1.2</span>
            </div>
          </div>
        </div>

        {/* Minimal systemic clocks and latencies */}
        <div className="hidden md:flex items-center gap-6 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-500 block" />
            <span>CORE STATUS: <strong className="text-emerald-400">ACTIVE DETECTOR</strong></span>
          </div>
          <div>LATENCY: <strong className="text-slate-300">142ms</strong></div>
          <div className="text-slate-400 font-semibold tracking-widest">{currentTime}</div>
        </div>

        {/* Core system actions */}
        <div>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-md text-[10px] font-mono uppercase bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-white/5 transition duration-200 cursor-pointer"
            title="Reset AuraOS Memory Space"
          >
            Clear Space
          </button>
        </div>
      </header>

      {/* Main Container viewport */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 flex flex-col justify-center items-center z-30 relative">
        
        {!workflowActive ? (
          /* ================= HOMEPAGE VIEW (Less UI. More Intelligence) ================= */
          <div className="w-full flex flex-col items-center justify-center space-y-12 animate-fade-in text-center my-auto">
            
            {/* Elegant spacious Greeting and AI indicator */}
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-white/[0.03] text-cyan-400 border border-white/[0.05] inline-flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Aura AI Core Online • Ready to Act
              </span>
              
              <h1 className="font-display font-light text-white text-5xl tracking-tight sm:text-6.5xl leading-[1.1] max-w-2xl mx-auto">
                How can I assist <span className="font-normal bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 font-display">your day</span>?
              </h1>
              
              <p className="text-sm font-sans font-light text-slate-400 tracking-wide max-w-md mx-auto">
                "We think for you. We act for you." Speak natural directives to deploy immediate background micro-workflows.
              </p>
            </div>

            {/* Massive central fluid Voice Orb centerpiece (inspired by Apple, Gemini Live, OpenAI Advanced Voice) */}
            <div className="relative group/orb flex justify-center items-center">
              
              {/* Outer halo physical glass orbit rings */}
              <div className="absolute w-80 h-80 rounded-full border border-white/[0.01] animate-spin [animation-duration:22s]" />
              <div className="absolute w-64 h-64 rounded-full border border-dashed border-white/[0.03] animate-spin [animation-duration:15s] [animation-direction:reverse]" />
              
              {/* Voice Orb Action wrapper */}
              <button
                onClick={toggleMic}
                className="relative z-15 hover:scale-105 active:scale-95 transition-all duration-500 rounded-full flex items-center justify-center cursor-pointer outline-none group"
                id="voice_orb_homepage_trigger"
              >
                {/* Immersive ripple wave rings (on hover or active listening) */}
                {status === "listening" && (
                  <>
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-ping [animation-duration:1.8s]" />
                    <div className="absolute inset-0 rounded-full border border-teal-500/20 animate-ping [animation-delay:0.6s]" />
                  </>
                )}
                
                {status === "speaking" && (
                  <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-pulse [animation-duration:1.2s]" />
                )}

                {/* Main Glass Sphere with custom fluid emotional gradient backgrounds */}
                <div className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr p-[3px] transition-all duration-700 ${getOrbColorTheme()} shadow-[0_0_60px_rgba(255,255,255,0.02)]`}>
                  
                  <div className="w-full h-full rounded-full bg-[#0d0e12]/95 backdrop-blur-2xl flex flex-col items-center justify-center relative overflow-hidden">
                    
                    {/* Glowing mesh background */}
                    <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent opacity-40" />

                    {/* Dynamic icons based on intelligence state */}
                    {status === "listening" ? (
                      <Mic className="w-8 h-8 text-cyan-400 animate-bounce" />
                    ) : status === "thinking" ? (
                      <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
                    ) : status === "speaking" ? (
                      <Volume2 className="w-8 h-8 text-purple-400 animate-pulse" />
                    ) : (
                      <Mic className="w-8 h-8 text-slate-500 group-hover:text-white transition-colors duration-300" />
                    )}

                    <span className="text-[9px] font-mono tracking-widest text-slate-500 group-hover:text-slate-350 transition-colors mt-3 uppercase font-semibold">
                      {status === "listening" ? "Listening..." : status === "thinking" ? "Thinking..." : status === "speaking" ? "Speaking..." : "Tap to Speak"}
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Quick manual text submit beneath the orb */}
            <form onSubmit={handleManualTextSubmit} className="w-full max-w-md mx-auto flex gap-2.5 p-1.5 bg-slate-950/60 rounded-2xl border border-white/[0.05] focus-within:border-cyan-500/30 transition duration-300">
              <input
                id="homepage_command_field"
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Instruct your device OS (e.g. Flight cancelled)..."
                className="flex-1 bg-transparent px-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!manualInput.trim()}
                className="p-2 rounded-xl bg-gradient-to-r from-purple-650 to-indigo-600 hover:from-purple-600 hover:to-indigo-550 text-white disabled:opacity-40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center whitespace-nowrap"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            {/* Perfect Bento-grid layout of Four Primary Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-4">
              
              {/* Card 1: Global Communication Agent */}
              <button
                onClick={() => setActiveOverlay("global_comm")}
                className="p-5 text-left rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Globe className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-semibold text-slate-100 font-display">Global Communication</h3>
                <p className="text-[10px] text-slate-400 font-light mt-1.5 leading-relaxed">
                  Voice polylinguistic parser mapping semantic intents instantly.
                </p>
              </button>

              {/* Card 2: Memory Vault */}
              <button
                onClick={() => setActiveOverlay("memory_vault")}
                className="p-5 text-left rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-semibold text-slate-100 font-display">Memory Vault</h3>
                <p className="text-[10px] text-slate-400 font-light mt-1.5 leading-relaxed">
                  Explore recalled vector preferences and cognitive safety grids.
                </p>
              </button>

              {/* Card 3: Emergency Mode */}
              <button
                onClick={() => setActiveOverlay("emergency")}
                className="p-5 text-left rounded-2xl bg-rose-950/15 border border-rose-500/15 hover:bg-rose-950/25 hover:border-rose-500/30 transition-all duration-300 group cursor-pointer relative"
              >
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Activity className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-semibold text-rose-300 font-display">Emergency Mode</h3>
                <p className="text-[10px] text-rose-400/80 font-light mt-1.5 leading-relaxed">
                  Instantly file backups, lock keys, and notify emergency proxies.
                </p>
              </button>

              {/* Card 4: Judge Demo Mode */}
              <button
                onClick={() => setActiveOverlay("judge_demo")}
                className="p-5 text-left rounded-2xl bg-white/[0.02] border border-cyan-500/15 hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-semibold text-slate-100 font-display">Judge Demo Mode</h3>
                <p className="text-[10px] text-slate-400 font-light mt-1.5 leading-relaxed">
                  Trigger high-fidelity pre-compiled scenario evaluations.
                </p>
              </button>
            </div>

            {/* Quick footer statement */}
            <div className="text-[10.5px] font-mono text-slate-600 uppercase tracking-widest pt-8">
              AuraOS v1.2 • Inspired by Apple Vision Pro & OpenAI Voice
            </div>
          </div>
        ) : (
          /* ================= IMMERSIVE WORKFLOW EXPERIENCE ================= */
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 my-auto animate-fade-in items-stretch min-h-[500px]">
            
            {/* LEFT SIDEBAR: Horizontal timeline of 7 steps */}
            <div className="md:col-span-3 flex flex-row md:flex-col justify-between md:justify-start gap-3 border-b md:border-b-0 md:border-r border-white/[0.04] pb-4 md:pb-0 md:pr-6">
              
              <div className="hidden md:block mb-6">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold block">Active Pipeline</span>
                <span className="text-xs font-display font-medium text-slate-350 mt-1 block">Acoustic Executor HUD</span>
              </div>

              {[
                { step: 1, label: "Listening", desc: "Acoustic Stream capture" },
                { step: 2, label: "Understanding", desc: "Syntactic Intent Mapping" },
                { step: 3, label: "Emotion Check", desc: "Biometric Distress Meter" },
                { step: 4, label: "Memory Retrieval", desc: "Vector Database Grounding" },
                { step: 5, label: "Collaborate", desc: "Multi-Agent Linkage" },
                { step: 6, label: "Execution", desc: "Carrier Gateway Dispatch" },
                { step: 7, label: "Resolution", desc: "Vocal and Output Card" },
              ].map((s) => {
                const isActive = workflowStep === s.step;
                const isCompleted = workflowStep > s.step;
                return (
                  <button
                    key={s.step}
                    onClick={() => {
                      setWorkflowStep(s.step);
                      setWorkflowAutoPlay(false); // Pause auto playback if manual interaction is received
                    }}
                    className={`flex-1 md:flex-initial text-left px-3.5 py-2.5 rounded-xl border transition-all text-xs flex items-center md:items-start gap-3 cursor-pointer
                      ${isActive 
                        ? "bg-purple-950/20 border-purple-500/40 text-purple-300 font-semibold" 
                        : isCompleted
                        ? "bg-emerald-900/5 border-emerald-500/20 text-slate-400"
                        : "bg-transparent border-transparent text-slate-600 hover:text-slate-400"
                      }
                    `}
                  >
                    {/* Circle Node Badge */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] shrink-0
                      ${isActive 
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse font-bold" 
                        : isCompleted
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold"
                        : "bg-slate-900 text-slate-600 border border-white/5"
                      }
                    `}>
                      {isCompleted ? "✓" : s.step}
                    </div>

                    <div className="hidden md:block">
                      <span className="block font-semibold">{s.label}</span>
                      <span className="block text-[8.5px] text-slate-500 font-light mt-0.5">{s.desc}</span>
                    </div>
                  </button>
                );
              })}

              {/* Sidebar Action Timeline controls */}
              <div className="hidden md:flex flex-col gap-2.5 mt-8 pt-6 border-t border-white/[0.04]">
                <div className="flex gap-2">
                  <button
                    onClick={() => setWorkflowAutoPlay(!workflowAutoPlay)}
                    className="flex-1 py-1 px-2.5 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-slate-200 border border-white/5 text-[10px] font-mono flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {workflowAutoPlay ? (
                      <>
                        <Pause className="w-3 h-3 text-amber-400" />
                        <span>Pause Auto</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-cyan-400" />
                        <span>Auto Play</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={() => setWorkflowStep(7)}
                  className="py-1 px-2.5 rounded bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/25 text-[10px] font-mono flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Skip to Resolution &rarr;</span>
                </button>
              </div>
            </div>

            {/* RIGHT WORKSPACE: Pristine Focal card showing ONE question only */}
            <div className="md:col-span-9 flex flex-col justify-between glass-card p-8 rounded-3xl border border-white/[0.05] relative min-h-[460px] whitespace-normal">
              
              {/* Overlay styling elements */}
              <div className="absolute top-0 right-0 p-4 shrink-0">
                <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
                  Step {workflowStep} / 7
                </span>
              </div>

              {/* Step Display Area */}
              <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full">
                {workflowStep === 1 && (
                  /* ================= STEP 1: LISTENING ================= */
                  <div className="space-y-6 text-center py-6 animate-fade-in pr-2 pl-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                      AuraOS Waveform Interface
                    </span>
                    <h2 className="text-xl font-display font-medium text-white leading-normal">
                      "What did you say?"
                    </h2>

                    {/* Highly aesthetic animated voice wave */}
                    <div className="flex items-end justify-center gap-1.5 h-20 my-6">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-gradient-to-t from-cyan-500 via-indigo-500 to-purple-500 rounded-full"
                          style={{
                            height: `${Math.floor(Math.random() * 80) + 20}%`,
                            animation: `bounce 0.7s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.05}s`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/5 space-y-1">
                      <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold tracking-widest">Acoustic Audio Signature:</span>
                      <p className="text-sm text-slate-200 italic font-sans font-light">
                        {lastUserUtterance ? `"${lastUserUtterance}"` : "Capturing operator vocal frequencies..."}
                      </p>
                    </div>
                  </div>
                )}

                {workflowStep === 2 && (
                  /* ================= STEP 2: UNDERSTANDING ================= */
                  <div className="space-y-6 text-left py-4 animate-fade-in">
                    <div className="text-center">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                        Cognitive Semantic Intent Core
                      </span>
                      <h2 className="text-xl font-display font-medium text-white leading-normal mt-1">
                        "What is your intent?"
                      </h2>
                    </div>

                    <div className="bg-slate-950 rounded-2xl p-5 border border-white/5 space-y-4 font-mono text-xs">
                      <div className="space-y-1 border-b border-white/5 pb-3">
                        <span className="text-[8.5px] text-purple-400 font-bold block uppercase tracking-wider">Identified Primary Goal</span>
                        <div className="text-sm font-sans font-semibold text-slate-100 mt-1">
                          {lastUserUtterance?.toLowerCase().includes("flight") ? "Critical Air Travel Rerouter" :
                           lastUserUtterance?.toLowerCase().includes("internet") ? "Utility Outage Compensator" :
                           lastUserUtterance?.toLowerCase().includes("gym") ? "Subscription certified dispute" : 
                           "Autonomous Goal Coordination"}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1 bg-slate-900 border border-white/5 p-3 rounded-xl">
                          <span className="text-[8.5px] text-slate-500 block font-bold uppercase tracking-wider">Syntactic Nouns</span>
                          <span className="text-cyan-300 font-semibold block text-[11px]">
                            {lastUserUtterance?.toLowerCase().includes("flight") ? "Delta, flight, Airport" :
                             lastUserUtterance?.toLowerCase().includes("internet") ? "Comcast, modem, outage" :
                             lastUserUtterance?.toLowerCase().includes("gym") ? "Gym, cancel, fee" :
                             "Goal vector"}
                          </span>
                        </div>
                        <div className="space-y-1 bg-slate-900 border border-white/5 p-3 rounded-xl">
                          <span className="text-[8.5px] text-slate-500 block font-bold uppercase tracking-wider">Aura Core Priority</span>
                          <span className="text-rose-400 font-semibold block text-[11px]">
                            {lastUserUtterance?.toLowerCase().includes("flight") ? "Priority Level 1" : "Priority Level 2"}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-indigo-950/20 rounded-xl border border-indigo-500/10 text-[11px] leading-relaxed text-indigo-300">
                        <strong>Intent decomposition:</strong> Extracted constraints. Routing background executors safely.
                      </div>
                    </div>
                  </div>
                )}

                {workflowStep === 3 && (
                  /* ================= STEP 3: EMOTION DETECTION ================= */
                  <div className="space-y-6 text-center py-4 animate-fade-in pr-2 pl-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                      Aesthetic Acoustic Spectrogram
                    </span>
                    <h2 className="text-xl font-display font-medium text-white leading-normal">
                      "How do you feel?"
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "Stress Index", value: emotionMetrics.stress, color: "from-rose-500 to-red-650", emoji: "⚡" },
                        { name: "Urgency Multiplier", value: emotionMetrics.urgency, color: "from-amber-400 to-orange-500", emoji: "🚨" },
                        { name: "Frustration Coefficient", value: emotionMetrics.frustration, color: "from-blue-500 to-indigo-600", emoji: "🌧️" },
                        { name: "Happiness Balance", value: emotionMetrics.happiness, color: "from-emerald-400 to-teal-500", emoji: "✨" },
                      ].map((em) => (
                        <div key={em.name} className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2 text-left">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-400">{em.emoji} {em.name}</span>
                            <span className="font-mono font-bold text-white">{em.value}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${em.color} transition-all duration-1000`} style={{ width: `${em.value}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-purple-950/25 rounded-xl border border-purple-500/20 text-[10.5px] font-mono text-purple-300 flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shrink-0" />
                      <span>Distress Signature active. Adaptive voice synthesizer speed set to: <strong>0.85x</strong></span>
                    </div>
                  </div>
                )}

                {workflowStep === 4 && (
                  /* ================= STEP 4: MEMORY RETRIEVAL ================= */
                  <div className="space-y-6 text-left py-4 animate-fade-in max-h-[360px] overflow-y-auto pr-1">
                    <div className="text-center">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                        Holographic Vector Directory
                      </span>
                      <h2 className="text-xl font-display font-medium text-white leading-normal mt-1">
                        "What do I remember about you?"
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch mt-4">
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">Vector-Match Detections</span>
                        {retrievedMemories && retrievedMemories.map((mem, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-950/65 border border-cyan-500/20 font-mono text-[10.5px] text-cyan-300 flex items-start gap-2">
                            <span className="text-cyan-400 font-bold shrink-0">✓</span>
                            <p>{mem}</p>
                          </div>
                        ))}
                      </div>

                      <div className="opacity-80 scale-[0.9] origin-center bg-slate-950 p-3 rounded-2xl border border-white/5 flex items-center justify-center min-h-[160px]">
                        <div className="space-y-2 text-center text-xs">
                          <Database className="w-6 h-6 text-indigo-400 mx-auto animate-pulse" />
                          <span className="font-mono text-slate-400 block text-[9px] uppercase tracking-wider">Semantic Grounding Map Link</span>
                          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-white font-semibold">Mesh Node active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {workflowStep === 5 && (
                  /* ================= STEP 5: AGENT COLLABORATION ================= */
                  <div className="space-y-4 text-left py-4 animate-fade-in w-full overflow-hidden">
                    <div className="text-center mb-2">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                        Sandboxed multi-node collective
                      </span>
                      <h2 className="text-xl font-display font-medium text-white leading-normal mt-1">
                        "Who is working on this?"
                      </h2>
                    </div>

                    {/* Embedding existing agent collaboration graph */}
                    <div className="max-h-[300px] overflow-y-auto pr-1">
                      <AgentCollaborationGraph collaborationData={agentCollaboration} />
                    </div>
                  </div>
                )}

                {workflowStep === 6 && (
                  /* ================= STEP 6: EXECUTION ================= */
                  <div className="space-y-5 text-left py-4 animate-fade-in max-h-[350px] overflow-y-auto pr-1">
                    <div className="text-center">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                        Automated Integration Logs
                      </span>
                      <h2 className="text-xl font-display font-medium text-white leading-normal mt-1">
                        "What actions did I take?"
                      </h2>
                    </div>

                    <div className="space-y-3 mt-4">
                      {tasks.map((task, idx) => (
                        <div key={task.id || idx} className="p-4 rounded-xl bg-slate-950/60 border border-white/5 flex justify-between items-center gap-4 hover:border-white/10 transition-all">
                          <div className="space-y-1">
                            <span className="text-xs font-semibold text-slate-200 block">{task.title}</span>
                            <p className="text-[10.5px] text-slate-400">{task.description}</p>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-bold uppercase tracking-wider shrink-0">
                            ✓ DISPATCHED
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {workflowStep === 7 && (
                  /* ================= STEP 7: RESOLUTION ================= */
                  <div className="space-y-6 text-left py-4 animate-fade-in max-h-[440px] overflow-y-auto pr-1">
                    <div className="text-center border-b border-white/[0.04] pb-4">
                      <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold animate-pulse">
                        Vocal Output & Claim Complete
                      </span>
                      <h2 className="text-xl font-display font-medium text-white leading-normal mt-1 flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
                        "What is the final outcome?"
                      </h2>
                    </div>

                    {/* Final output human text card */}
                    <div className="p-5 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-4">
                      <p className="text-[13px] font-sans font-light leading-relaxed text-slate-100">
                        {responseText}
                      </p>

                      {/* Micro interaction speak back tool */}
                      <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Volume2 className={`w-4 h-4 ${isSynthesizing ? "text-purple-400 animate-pulse animate-bounce" : ""}`} />
                          <span className="text-[10px] font-mono uppercase tracking-widest">Acoustic playback:</span>
                        </div>

                        {status === "speaking" ? (
                          <button
                            onClick={() => {
                              window.speechSynthesis.cancel();
                              setStatus("idle");
                              setIsSynthesizing(false);
                            }}
                            className="text-[10px] font-mono px-2 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/25 cursor-pointer hover:bg-rose-500/35 transition"
                          >
                            Stop Voice
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setStatus("speaking");
                            }}
                            className="text-[10px] font-mono px-2 py-1 rounded bg-purple-500/25 text-purple-300 border border-purple-500/30 cursor-pointer hover:bg-purple-500/40 transition flex items-center gap-1"
                          >
                            <span>▶ Replay Vocals</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Timeline Milestone representation if buy a house was chosen */}
                    {timelineSimulation && (
                      <div className="p-5 rounded-2xl border border-cyan-500/25 bg-cyan-950/10 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-cyan-400" />
                            <h4 className="text-xs font-semibold text-white font-display">Savings Blueprint Path</h4>
                          </div>
                          <span className="text-[9px] font-mono bg-cyan-500/15 text-cyan-300 px-1.5 rounded">AUTO GENERATED</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal">{timelineSimulation.analysis}</p>
                        
                        <div className="space-y-3.5 pl-3 border-l border-cyan-500/30">
                          {timelineSimulation.milestones.map((mil, idx) => (
                            <div key={idx} className="relative text-xs space-y-1">
                              <span className="text-[10px] font-mono font-bold text-cyan-400">{mil.period}</span>
                              <span className="block font-semibold text-slate-200">Goal: {mil.targetGoal}</span>
                              <p className="text-[10.5px] text-slate-400 italic">Action: {mil.actionRequired}</p>
                              <div className="text-[9.5px] font-mono text-rose-400 pt-0.5">Risk: {mil.riskAnalysis}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* KPI Delta metric cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-1 text-left">
                        <span className="text-[8.5px] text-slate-500 font-mono font-bold block uppercase tracking-wider">Total Time Recovered</span>
                        <div className="text-lg font-bold text-cyan-400 font-mono">
                          {metrics.timeSavedHours.toFixed(1)} Hours Claimed
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-1 text-left">
                        <span className="text-[8.5px] text-slate-500 font-mono font-bold block uppercase tracking-wider">Estimated cash saved / claimed</span>
                        <div className="text-lg font-bold text-emerald-400 font-mono">
                          ${metrics.moneySavedDollars} Refunded
                        </div>
                      </div>
                    </div>

                    {/* Interactive Task Completion lists */}
                    <div className="space-y-3 bg-slate-900/40 p-4 rounded-xl border border-white/5">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Active task pipeline status check</span>
                      <div className="space-y-2">
                        {tasks.map((task, idx) => (
                          <div key={task.id || idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs gap-3">
                            <div className="flex items-center gap-2.5">
                              <button
                                onClick={() => promoteTaskStatus(task.id)}
                                className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer text-[10px]
                                  ${task.status === "completed" 
                                    ? "bg-emerald-500/25 border-emerald-500 text-emerald-300" 
                                    : "border-slate-700 bg-slate-900"
                                  }
                                `}
                              >
                                {task.status === "completed" && "✓"}
                              </button>
                              <span className={`font-semibold ${task.status === "completed" ? "line-through text-slate-500" : "text-slate-200"}`}>
                                {task.title}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono text-slate-500">{task.estimate}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resolution page inputs and controls */}
              <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <button
                    onClick={() => {
                      setWorkflowActive(false);
                      setWorkflowStep(1);
                    }}
                    className="py-2 px-4 rounded-xl text-xs font-mono uppercase bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-250 border border-white/5 transition flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Core OS</span>
                  </button>
                </div>

                <form onSubmit={handleManualTextSubmit} className="flex-1 max-w-sm flex gap-2 p-1 bg-slate-950 rounded-xl border border-white/5 focus-within:border-cyan-500/20 transition">
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Refine directive (e.g. reschedule slots)..."
                    className="flex-1 bg-transparent px-3 py-1.5 text-xs text-slate-200 focus:outline-none placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    disabled={!manualInput.trim()}
                    className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 cursor-pointer flex items-center justify-center"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Glass Overlay Panels matching our 4 Home Screen primary actions */}
      {activeOverlay && (
        <div className="fixed inset-0 bg-[#07080a]/85 backdrop-blur-md flex items-center justify-center p-6 z-[60] animate-fade-in whitespace-normal">
          <div className="w-full max-w-4xl bg-[#0b0c10] border border-white/[0.08] shadow-2xl rounded-3xl flex flex-col max-h-[85vh] overflow-hidden text-left relative">
            
            {/* Holographic glowing line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            {/* Modal header */}
            <div className="px-6 py-4 border-b border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 block animate-pulse" />
                <h2 className="font-display text-sm tracking-wide text-slate-200 font-semibold uppercase">
                  {activeOverlay === "global_comm" && "Global Communication Network"}
                  {activeOverlay === "memory_vault" && "Cognitive Voice Memory Vault"}
                  {activeOverlay === "emergency" && "Tactical Priority Emergency Console"}
                  {activeOverlay === "judge_demo" && "Interactive Demonstration Blueprints"}
                </h2>
              </div>
              <button
                onClick={() => {
                  setActiveOverlay(null);
                  window.speechSynthesis.cancel();
                }}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-white/10 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal content body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeOverlay === "global_comm" && (
                <UniversalLanguageAgent />
              )}

              {activeOverlay === "memory_vault" && (
                <MemoryVault />
              )}

              {activeOverlay === "emergency" && (
                <div>
                  <p className="text-xs text-slate-400 mb-4 max-w-md">
                    Deploy emergency tactical response. Select a scenario tab in the HUD below to initiate automatic backup filings and broadcast geolocations to emergency contacts.
                  </p>
                  <EmergencyCenter />
                </div>
              )}

              {activeOverlay === "judge_demo" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400 animate-pulse" />
                    <div>
                      <h4 className="font-display font-medium text-white text-base">
                        Select a Hackathon Assessment Case
                      </h4>
                      <p className="text-xs text-slate-400">
                        These templates test different intelligence profiles: stress calming, financial compounded roadmap projection, and third-party automated carrier dispute filing.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {GENERAL_DEMO_SCENARIOS.map((scenario) => {
                      return (
                        <button
                          key={scenario.id}
                          onClick={() => {
                            setActiveOverlay(null);
                            handleInteractWithAgent(scenario.promptText);
                          }}
                          className="text-left p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] hover:border-cyan-500/40 transition-all duration-300 group cursor-pointer"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 text-purple-400 group-hover:text-cyan-400 transition-colors">
                              {scenario.icon === "WifiOff" && <WifiOff className="w-5 h-5" />}
                              {scenario.icon === "Home" && <Home className="w-5 h-5" />}
                              {scenario.icon === "PlaneTakeoff" && <PlaneTakeoff className="w-5 h-5" />}
                              {scenario.icon === "DollarSign" && <DollarSign className="w-5 h-5" />}
                            </div>

                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-bold font-sans text-slate-200 block group-hover:text-white transition-colors">
                                {scenario.title}
                              </span>
                              <p className="text-[11px] text-slate-450 italic text-slate-400 mt-1 lines-2">
                                "{scenario.promptText}"
                              </p>
                              <span className="text-[9.5px] text-slate-500 mt-1.5 block">
                                {scenario.subtitle}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal footer statement */}
            <div className="p-4 border-t border-white/[0.04] bg-slate-950 text-center text-[10px] font-mono text-slate-600">
              AuraOS Tactical Grounding Subsystem • Click (X) to Return to Main Screen
            </div>
          </div>
        </div>
      )}

      {/* Immersive Onboarding & AI Guidance Chatbot */}
      <div className="fixed bottom-6 right-6 md:right-8 z-50 flex flex-col items-end whitespace-normal">
        {/* Floating guidance pane */}
        {isGuideOpen && (
          <div className="w-[340px] md:w-[380px] h-[500px] mb-4 bg-slate-950/95 border border-white/[0.1] shadow-2xl rounded-3xl flex flex-col overflow-hidden animate-fade-in text-left relative backdrop-blur-xl">
            {/* Glowing holographic glass line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-white/[0.04] bg-slate-900/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <div>
                  <h4 className="font-display font-medium text-xs text-white">AuraOS Onboarding Guide</h4>
                  <span className="text-[9px] font-mono text-purple-400 font-bold uppercase tracking-wider">LQE System Agent</span>
                </div>
              </div>
              <button 
                onClick={() => setIsGuideOpen(false)}
                className="text-slate-400 hover:text-white transition p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 flex flex-col scrollbar-thin">
              {guideMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
                >
                  <div className={`px-4 py-2.5 rounded-2xl text-xs font-sans font-light leading-relaxed tracking-wide
                    ${msg.sender === "user" 
                      ? "bg-purple-650 text-white rounded-br-none shadow-md shadow-purple-950/20" 
                      : "bg-white/[0.03] border border-white/[0.05] text-slate-300 rounded-bl-none"
                    }
                  `}>
                    {/* Render basic bold formatting and line breaks beautifully */}
                    {msg.text.split("\n").map((line, li) => {
                      // Simple regex replacing **text** with styled bold
                      const parts = line.split(/\*\*(.*?)\*\*/g);
                      return (
                        <div key={li} className={li > 0 ? "mt-1.5" : ""}>
                          {parts.map((part, pi) => pi % 2 === 1 ? <strong key={pi} className="font-semibold text-white">{part}</strong> : part)}
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-[8px] font-mono text-slate-500 mt-1 uppercase">
                    {msg.sender === "user" ? "You" : "Guide Bot"}
                  </span>
                </div>
              ))}
              
              {isGuideTyping && (
                <div className="self-start flex flex-col items-start max-w-[85%]">
                  <div className="bg-white/[0.03] border border-white/[0.05] px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-[8px] font-mono text-slate-500 mt-1 uppercase">Analyzing system logs...</span>
                </div>
              )}
            </div>

            {/* Suggested quick helper chips */}
            <div className="px-4 py-2 border-t border-white/[0.03] bg-slate-900/10 flex flex-wrap gap-1.5">
              {[
                { label: "📋 5 Agents", prompt: "Tell me how the 5 sub-agents collaborate." },
                { label: "💪 ISP Outage", prompt: "Show me the Comcast internet outage demo outline." },
                { label: "✈️ JFK Flight", prompt: "What does the JFK flight rescue demo do?" },
                { label: "🧠 Memory Vault", prompt: "Explain how the custom vector memory database works." }
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleSendGuideMessage(chip.prompt)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-sans bg-white/[0.03] hover:bg-purple-950/30 border border-white/[0.05] hover:border-purple-500/30 text-slate-400 hover:text-purple-300 transition duration-200 cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input area */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!guideInput.trim() || isGuideTyping) return;
                handleSendGuideMessage(guideInput);
              }}
              className="p-3 border-t border-white/[0.04] bg-slate-900/30 flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask onboarding question..."
                value={guideInput}
                onChange={(e) => setGuideInput(e.target.value)}
                disabled={isGuideTyping}
                className="flex-1 bg-white/[0.02] border border-white/[0.05] text-xs text-slate-200 placeholder:text-slate-500 px-3.5 py-2 rounded-xl focus:outline-none focus:border-purple-500/40 disabled:opacity-50 font-sans"
              />
              <button
                type="submit"
                disabled={!guideInput.trim() || isGuideTyping}
                className="p-2 rounded-xl bg-purple-700 hover:bg-purple-650 text-white transition disabled:opacity-40 cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Floating guidance toggle button */}
        <div className="flex items-center gap-2.5">
          {!isGuideOpen && (
            <span className="bg-slate-950/80 backdrop-blur border border-white/[0.05] text-[10px] font-sans font-medium text-purple-300 px-3 py-1.5 rounded-xl shadow-lg animate-bounce select-none pointer-events-none">
              👋 Need AuraOS help?
            </span>
          )}
          <button
            onClick={() => setIsGuideOpen(!isGuideOpen)}
            className={`w-12 h-12 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 shadow-xl border
              ${isGuideOpen 
                ? "bg-slate-900 border-white/10 text-white hover:scale-105 active:scale-95" 
                : "bg-gradient-to-tr from-purple-650 to-indigo-600 hover:from-purple-600 hover:to-indigo-550 border-purple-500/20 text-white hover:scale-110 active:scale-95"
              }
            `}
            title="AuraOS Guidance Assistant"
          >
            {isGuideOpen ? <X className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Aesthetic ambient footer */}
      <footer className="border-t border-white/[0.03] bg-slate-950/30/30 py-5 px-6 text-center text-[11px] text-slate-600 font-mono z-20 relative">
        <p>Aura AI OS • Premium Interactive Demonstration Sandbox Interface</p>
        <p className="mt-1 text-[9.5px] text-slate-700">
          Powered by Gemini Pro Generative Models & DeepMind Antigravity framework sandbox environment
        </p>
      </footer>
    </div>
  );
}
