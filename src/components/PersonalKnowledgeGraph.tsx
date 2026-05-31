import React, { useState } from "react";
import { Users, Calendar, Target, MapPin, Brain, CheckSquare, Sparkles, HelpCircle, Eye } from "lucide-react";

interface GraphNode {
  id: string;
  label: string;
  category: "people" | "events" | "goals" | "locations" | "memories" | "tasks";
  x: number;
  y: number;
  description: string;
  metadata: Record<string, string>;
}

interface GraphLink {
  source: string;
  target: string;
  relationship: string;
}

export default function PersonalKnowledgeGraph() {
  const [selectedNode, setSelectedNode] = useState<string | null>("node_harsh");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Holographic layout dimensions
  const width = 640;
  const height = 300;

  // Fully connected nodes reflecting the Life Navigator AI ecosystem & user events
  const nodes: GraphNode[] = [
    {
      id: "node_harsh",
      label: "Harsh Dattani",
      category: "people",
      x: 140,
      y: 90,
      description: "Met during the Google Hackathon Event. Key executive stakeholder.",
      metadata: { Connection: "Lead Developer / Google AI", Status: "Verified Contact", Memory: "mem_2083" }
    },
    {
      id: "node_google_event",
      label: "Google Hackathon Event",
      category: "events",
      x: 280,
      y: 50,
      description: "Pre-eminent high-performance builder competition.",
      metadata: { Date: "2026-05-31", Venue: "Google AI HQ", Connection: "Harsh Dattani" }
    },
    {
      id: "node_alice",
      label: "Sister Alice",
      category: "people",
      x: 480,
      y: 80,
      description: "Designated family standby proxy and emergency emergency contact.",
      metadata: { Role: "Emergency Contact", Phone: "+1-555-0193", Routing: "SMS Auto-Forward Enabled" }
    },
    {
      id: "node_jfk_cancel",
      label: "Delta JFK Flight Cancel",
      category: "events",
      x: 520,
      y: 200,
      description: "Flight Delta-1204 weather postponement at Terminal 4.",
      metadata: { Impact: "Travel Disruption", Counter: "JFK T4 Gate 12", Backup: "Uber Shuttle Arranged" }
    },
    {
      id: "node_marcus",
      label: "Marcus HYSA",
      category: "locations",
      x: 100,
      y: 240,
      description: "High-yield compounding vault storing house downpayment balance.",
      metadata: { APY: "4.4% APY Locked", Type: "Secure Liquidation Vault", Savings: "Downpayment Buffer" }
    },
    {
      id: "node_house_goal",
      label: "5-Year House Purchase",
      category: "goals",
      x: 260,
      y: 260,
      description: "Downpayment compounding trajectory to secure $85,000 cash reserves.",
      metadata: { Target: "$85,000", Deadline: "May 2031", Progress: "On Track (+12% APY)" }
    },
    {
      id: "node_comcast_fiber",
      label: "Comcast Block-14 Node",
      category: "locations",
      x: 320,
      y: 150,
      description: "Primary localized fiber endpoint. Monitored for downtime outages.",
      metadata: { Address: "Comcast Region Block 14", Status: "Offline Signal Node", Ticket: "#INC-893041" }
    },
    {
      id: "node_technician",
      label: "Technician Dispatch Route",
      category: "tasks",
      x: 460,
      y: 150,
      description: "Scheduled Priority Comcast appointment Wednesday morning slots.",
      metadata: { Goal: "ISP Restructuring", Status: "Awaiting Action Check", Estimated: "2 Hours Saved" }
    },
    {
      id: "node_cancellation_clause",
      label: "Clause 12(b) Rescission",
      category: "memories",
      x: 120,
      y: 160,
      description: "Contract loophole mapped in local memory database to bypass gym termination fee traps.",
      metadata: { Source: "Contract Audit PDF", Legality: "Fully Verified", Saving: "$120 Waived" }
    }
  ];

  const links: GraphLink[] = [
    { source: "node_harsh", target: "node_google_event", relationship: "Met At" },
    { source: "node_alice", target: "node_jfk_cancel", relationship: "Caretaker Contact" },
    { source: "node_jfk_cancel", target: "node_google_event", relationship: "Disruption Block" },
    { source: "node_house_goal", target: "node_marcus", relationship: "Funded By" },
    { source: "node_comcast_fiber", target: "node_google_event", relationship: "Critical Line" },
    { source: "node_comcast_fiber", target: "node_technician", relationship: "Resolution Task" },
    { source: "node_marcus", target: "node_cancellation_clause", relationship: "Consolidated From" }
  ];

  const nodeColors: Record<string, string> = {
    people: "stroke-blue-400 fill-blue-500/20 text-blue-300",
    events: "stroke-purple-400 fill-purple-500/20 text-purple-300",
    goals: "stroke-cyan-400 fill-cyan-500/20 text-cyan-300",
    locations: "stroke-amber-400 fill-amber-500/20 text-amber-300",
    memories: "stroke-indigo-400 fill-indigo-500/20 text-indigo-300",
    tasks: "stroke-emerald-400 fill-emerald-500/20 text-emerald-300"
  };

  const getCategoryIcon = (category: string) => {
    const iconClass = "w-4 h-4";
    switch (category) {
      case "people": return <Users className={`${iconClass} text-blue-400`} />;
      case "events": return <Calendar className={`${iconClass} text-purple-400`} />;
      case "goals": return <Target className={`${iconClass} text-cyan-400`} />;
      case "locations": return <MapPin className={`${iconClass} text-amber-400`} />;
      case "memories": return <Brain className={`${iconClass} text-indigo-400`} />;
      case "tasks": return <CheckSquare className={`${iconClass} text-emerald-400`} />;
      default: return <Sparkles className={`${iconClass} text-purple-400`} />;
    }
  };

  const activeNode = nodes.find(n => n.id === selectedNode);

  return (
    <div className="glass-card rounded-[24px] p-6 relative overflow-hidden" id="personal_knowledge_graph_card">
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
          <div>
            <h4 className="font-display font-medium text-white text-base">
              Personal Semantic Knowledge Graph & Relations
            </h4>
            <p className="text-[11px] text-slate-400">
              Interactive structural map mapping connected nodes: People, Events, Goals, Locations, Memories, and Tasks.
            </p>
          </div>
        </div>

        <span className="text-[9px] font-mono text-indigo-400 border border-indigo-500/35 bg-indigo-500/10 px-2 py-0.5 rounded tracking-wider">
          CO-ORDINATE MESH ACTIVE
        </span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mb-5">
        Click on any holographic node to trace its vector similarities, retrieve its historical transcripts (e.g. tracking when you met Harsh Dattani during the Google event), and explore relationships.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* SVG Interactive Canvas representation */}
        <div className="md:col-span-8 bg-slate-950 rounded-xl border border-white/5 relative min-h-[300px] overflow-hidden flex items-center justify-center">
          
          {/* Legend absolute badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5 z-10 text-[8px] font-mono max-w-[90%]">
            <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">PEOPLE</span>
            <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">EVENTS</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">GOALS</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">LOCATIONS</span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">MEMORIES</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">TASKS</span>
          </div>

          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 select-none">
            <defs>
              <radialGradient id="hologram-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
              </radialGradient>
              <marker id="arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
              </marker>
            </defs>

            {/* Central scanning grid lines */}
            <rect width={width} height={height} fill="url(#hologram-glow)" />
            <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="rgba(255,255,255,0.02)" strokeDasharray="3 3"/>
            <line x1={width/2} y1="0" x2={width/2} y2={height} stroke="rgba(255,255,255,0.02)" strokeDasharray="3 3"/>

            {/* Relationship Lines */}
            {links.map((link, idx) => {
              const sourceNode = nodes.find(n => n.id === link.source);
              const targetNode = nodes.find(n => n.id === link.target);
              if (!sourceNode || !targetNode) return null;

              const isHighlighted = 
                selectedNode === link.source || 
                selectedNode === link.target || 
                hoveredNode === link.source || 
                hoveredNode === link.target;

              return (
                <g key={idx}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    className={`transition-all duration-300 ${
                      isHighlighted 
                        ? "stroke-indigo-400 stroke-[2px] opacity-100" 
                        : "stroke-slate-800 stroke-[1px] opacity-40"
                    }`}
                    markerEnd="url(#arrow)"
                  />
                  {isHighlighted && (
                    <text
                      x={(sourceNode.x + targetNode.x) / 2}
                      y={(sourceNode.y + targetNode.y) / 2 - 4}
                      className="fill-indigo-300 font-mono text-[8px] text-center"
                      textAnchor="middle"
                    >
                      {link.relationship}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Interactive Graph Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNode === node.id;
              const isHovered = hoveredNode === node.id;
              const colorClass = nodeColors[node.category] || "stroke-slate-500 fill-slate-500/20";
              const isRelated = selectedNode && links.some(l => 
                (l.source === selectedNode && l.target === node.id) || 
                (l.target === selectedNode && l.source === node.id)
              );

              return (
                <g 
                  key={node.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedNode(node.id)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Outer Pulsing Highlight Anchor circle */}
                  {(isSelected || isHovered || isRelated) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 18 : 14}
                      className={`fill-none ${isSelected ? "stroke-indigo-400 animate-ping opacity-35" : "stroke-indigo-400/40"}`}
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Absolute core node center bullet */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 8 : 6}
                    className={`transition-all duration-300 ${colorClass}`}
                    strokeWidth="2"
                  />

                  {/* Human Node labels */}
                  <text
                    x={node.x}
                    y={node.y + 18}
                    className={`font-sans text-[9px] text-center font-medium transition-all duration-300 ${
                      isSelected 
                        ? "fill-white font-bold" 
                        : isHovered || isRelated
                          ? "fill-slate-200"
                          : "fill-slate-500"
                    }`}
                    textAnchor="middle"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Panel: Selected node metadata details */}
        <div className="md:col-span-4 bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between text-xs space-y-4">
          {activeNode ? (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              
              {/* Header category info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-slate-950 border border-white/10">
                    {getCategoryIcon(activeNode.category)}
                  </div>
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-wider text-slate-500 block">
                      {activeNode.category} Node
                    </span>
                    <h5 className="font-sans font-bold text-slate-100 text-sm">
                      {activeNode.label}
                    </h5>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-2">
                  {activeNode.description}
                </p>
              </div>

              {/* Grid values */}
              <div className="bg-slate-950 p-2.5 rounded-lg border border-white/5 space-y-1.5 text-[10px] font-mono">
                <span className="text-[8px] text-indigo-400 font-bold block uppercase pb-1 border-b border-white/5 mb-1.5">
                  METADATA COORDINATES:
                </span>
                {Object.entries(activeNode.metadata).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center gap-2">
                    <span className="text-slate-500 uppercase">{k}:</span>
                    <span className="text-slate-300 font-semibold text-right max-w-[60%] truncate">{v}</span>
                  </div>
                ))}
              </div>

              {selectedNode === "node_harsh" && (
                <div className="py-2 px-2.5 rounded bg-purple-500/10 border border-purple-500/20 text-[10.5px] font-sans text-purple-300 flex items-start gap-1.5">
                  <Eye className="w-3.5 h-3.5 shrink-0 mt-0.5 text-purple-400 animate-pulse" />
                  <span>
                    <strong>Semantic recall:</strong> Met during Google Event. You can voice command: <em>"Who did I meet during the Google event?"</em>
                  </span>
                </div>
              )}

              {selectedNode === "node_alice" && (
                <div className="py-2 px-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-[10.5px] font-sans text-rose-300 flex items-start gap-1.5">
                  <Eye className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-400" />
                  <span>
                    <strong>Dynamic proxy:</strong> Interacted as stand-by rescue during Delta flight cancellations. Verified coordinate.
                  </span>
                </div>
              )}

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-slate-500">
              <HelpCircle className="w-8 h-8 text-slate-600 mb-2 animate-bounce" />
              <p className="font-mono text-[10px] mb-1">NO ACTIVE COORDINATE</p>
              <p className="text-[10px] font-sans">Select a node dynamically over the radar canvas grid to inspect semantic connection trees.</p>
            </div>
          )}

          <div className="border-t border-white/5 pt-3 text-[9px] font-mono text-slate-500 leading-normal">
            <span>Graph utilizes Cosine Vector Projections. Relationships dynamically linked in long-term MemoryDb index schema.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
