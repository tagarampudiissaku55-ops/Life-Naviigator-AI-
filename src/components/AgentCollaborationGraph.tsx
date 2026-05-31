import React, { useEffect, useState } from "react";
import { 
  Brain, 
  Compass, 
  Activity, 
  Database, 
  Sparkles, 
  Handshake, 
  ShieldAlert, 
  TrendingUp, 
  Terminal 
} from "lucide-react";

interface Agent {
  agentName: string;
  action: string;
  status: string; // standby, active, completed, alerting, indexing
  roleDescription: string;
  colorClass: string;
  glowClass: string;
}

interface AgentCollaborationGraphProps {
  collaborationData?: {
    agentName: string;
    action: string;
    status: string;
  }[];
}

export default function AgentCollaborationGraph({ collaborationData }: AgentCollaborationGraphProps) {
  const [pulseCount, setPulseCount] = useState(0);

  // Periodic visual packet bursts traveling across coordinates
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => (prev + 1) % 100);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Registry defining all 8 exact autonomous agent specs
  const defaultAgents: Agent[] = [
    {
      agentName: "Planner Agent",
      roleDescription: "Decomposes spoken intents, schedules actions list, sets prioritisation weights",
      action: "Idle. Awaiting operator tactical instruction stream dispatch.",
      status: "standby",
      colorClass: "border-purple-500/30 text-purple-400 bg-purple-950/25",
      glowClass: "shadow-purple-500/10"
    },
    {
      agentName: "Research Agent",
      roleDescription: "Scours digital travel networks, queries comcast outage hubs, extracts document content",
      action: "Standby. Checking broadband regional nodes.",
      status: "standby",
      colorClass: "border-cyan-500/30 text-cyan-400 bg-cyan-950/25",
      glowClass: "shadow-cyan-500/10"
    },
    {
      agentName: "Memory Agent",
      roleDescription: "Accesses vector DB cosine similarity indices, recalls spouse details and Alice emergency standby",
      action: "Idle. Synced with active long-term vector vaults.",
      status: "standby",
      colorClass: "border-amber-500/30 text-amber-400 bg-amber-950/25",
      glowClass: "shadow-amber-500/10"
    },
    {
      agentName: "Execution Agent",
      roleDescription: "Places Delta Flight alternate seat holds, files Comcast service credit claims",
      action: "Idle. Sandboxed integration gateways primed.",
      status: "standby",
      colorClass: "border-emerald-500/30 text-emerald-400 bg-emerald-950/25",
      glowClass: "shadow-emerald-500/10"
    },
    {
      agentName: "Monitoring Agent",
      roleDescription: "Maintains acoustic stress analytics, monitors regional airport disruptions and outage flags",
      action: "Active. Tracking regional airport delay updates.",
      status: "active",
      colorClass: "border-teal-500/30 text-teal-400 bg-teal-950/25",
      glowClass: "shadow-teal-500/10"
    },
    {
      agentName: "Negotiation Agent",
      roleDescription: "Audits contract PDF clauses, drafts liability disputes, recommends optimization rulesets",
      action: "Standby. Clause 12(b) gym refund waiver verified.",
      status: "standby",
      colorClass: "border-pink-500/30 text-pink-400 bg-pink-950/25",
      glowClass: "shadow-pink-500/10"
    },
    {
      agentName: "Emergency Agent",
      roleDescription: "Instantly deploys safety checklist coordinates, broadcasts GPS, triggers speed dials",
      action: "Ready. Standby emergency trigger channels listening.",
      status: "standby",
      colorClass: "border-rose-500/30 text-rose-400 bg-rose-950/25",
      glowClass: "shadow-rose-500/10"
    },
    {
      agentName: "Future Planning Agent",
      roleDescription: "Generates savings roadmaps, milestone projections, house budget risk scenarios",
      action: "Standby. Calculated 5-year compound path for house purchase.",
      status: "standby",
      colorClass: "border-indigo-500/30 text-indigo-400 bg-indigo-950/25",
      glowClass: "shadow-indigo-500/10"
    }
  ];

  // Merge runtime updates matching any of the agents
  const mergedAgents = defaultAgents.map(ag => {
    const runtimeAg = collaborationData?.find(
      r => r.agentName.toLowerCase().replace(" agent", "") === ag.agentName.toLowerCase().replace(" agent", "")
    );
    if (runtimeAg) {
      let colorClass = ag.colorClass;
      if (runtimeAg.status === "completed") {
        colorClass = "border-emerald-500 text-emerald-300 bg-emerald-950/35";
      } else if (runtimeAg.status === "active" || runtimeAg.status === "alerting") {
        colorClass = "border-purple-500 text-purple-300 bg-purple-950/35 animate-pulse";
      }
      return {
        ...ag,
        action: runtimeAg.action,
        status: runtimeAg.status,
        colorClass
      };
    }
    return ag;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 animate-pulse">● WORKING</span>;
      case "completed":
        return <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">✓ DONE</span>;
      case "alerting":
        return <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-bounce">⚠ ALERT</span>;
      case "indexing":
        return <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">⏳ INDEXING</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-slate-900 text-slate-500 border border-white/5">○ STANDBY</span>;
    }
  };

  const getAgentIcon = (name: string, active: boolean) => {
    const iconSize = "w-4 h-4";
    const animClass = active ? "animate-spin [animation-duration:12s]" : "";
    
    if (name.includes("Planner")) return <Brain className={`${iconSize} ${active ? "animate-pulse" : ""}`} />;
    if (name.includes("Research")) return <Compass className={`${iconSize} ${animClass}`} />;
    if (name.includes("Execution")) return <Sparkles className={`${iconSize} ${active ? "animate-bounce" : ""}`} />;
    if (name.includes("Monitoring")) return <Activity className={`${iconSize} ${active ? "animate-pulse" : ""}`} />;
    if (name.includes("Memory")) return <Database className={`${iconSize}`} />;
    if (name.includes("Negotiation")) return <Handshake className={`${iconSize} ${active ? "animate-pulse" : ""}`} />;
    if (name.includes("Emergency")) return <ShieldAlert className={`${iconSize} ${active ? "animate-bounce" : ""}`} />;
    if (name.includes("Future")) return <TrendingUp className={`${iconSize}`} />;
    return <Terminal className={`${iconSize}`} />;
  };

  return (
    <div className="glass-card rounded-[24px] p-6 border-purple-500/10 relative overflow-hidden" id="agent_collaboration_network">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/5 rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <h4 className="font-display font-medium text-white text-base">
              Autonomous Agent Orchestration Graph
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Life Navigator AI is powered by 8 specialized multi-agent nodes running in sandboxed system layers.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-white/5 font-mono text-[9px] text-slate-400">
          <span>Active Mesh Capacity:</span>
          <strong className="text-emerald-400">8 Node Pipeline Linkage</strong>
        </div>
      </div>

      {/* SVG Network Graph background overlay */}
      <div className="relative flex flex-col items-center justify-center py-4 bg-slate-950/60 rounded-2xl border border-white/5 overflow-hidden">
        
        {/* Connection Trace Lines with glowing pulse animation beads */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-20 hidden md:block">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 300">
            {/* Core horizontal line */}
            <path stroke="#818cf8" strokeWidth="1.2" strokeDasharray="3 6" fill="transparent" d="M 50 70 L 950 70 M 50 210 L 950 210" />
            
            {/* Pulsing light packets tracing along the pathway */}
            <circle r="3.5" fill="#67e8f9" className="animate-[move-packet_7s_linear_infinite]" style={{ transformBox: "fill-box" }}>
              <animateMotion dur="8s" repeatCount="indefinite" path="M 50 70 L 950 70" />
            </circle>
            <circle r="3" fill="#a855f7" className="animate-[move-packet_9s_linear_infinite]" style={{ transformBox: "fill-box" }}>
              <animateMotion dur="10s" repeatCount="indefinite" path="M 950 210 L 50 210" />
            </circle>
          </svg>
        </div>

        {/* 8-Grid responsive layout featuring the complete agent collective */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 w-full px-4 md:px-6">
          {mergedAgents.map((agent, index) => {
            const isActive = agent.status !== "standby";
            return (
              <div
                key={index}
                className={`flex flex-col justify-between p-4 rounded-xl border transition-all duration-300 min-h-[145px] hover:scale-[1.015]
                  ${agent.colorClass} ${agent.glowClass}
                  ${isActive ? "scale-[1.01] border-opacity-85 shadow-lg bg-slate-900" : "opacity-75 hover:opacity-100 hover:border-white/15"}
                `}
              >
                {/* Status Bar */}
                <div className="flex items-start justify-between gap-1.5 border-b border-white/5 pb-2 mb-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className={`p-1.5 rounded-lg text-slate-101 ${isActive ? "bg-white/10 text-purple-300 border border-white/10" : "bg-slate-900 border border-white/5"}`}>
                      {getAgentIcon(agent.agentName, isActive)}
                    </div>
                    <span className="text-xs font-semibold text-slate-100 truncate shrink-0">{agent.agentName}</span>
                  </div>
                  {getStatusBadge(agent.status)}
                </div>

                {/* Subtitle / Role description */}
                <div className="text-[10px] text-slate-400 font-sans leading-relaxed mb-3">
                  {agent.roleDescription}
                </div>

                {/* Live telemetry command console log */}
                <div className="bg-slate-950 p-2 rounded-lg border border-white/5 font-mono text-[9px] leading-relaxed text-slate-350">
                  <span className="text-[8px] text-purple-400 font-bold block mb-0.5 uppercase tracking-wider">LIVE TELEMETRY:</span>
                  <div className="line-clamp-2 italic" title={agent.action}>&ldquo;{agent.action}&rdquo;</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
