import React from "react";
import { Sparkles, Key, CheckCircle, Shield, BrainCircuit, Eye, AlertCircle } from "lucide-react";

interface ExplainableAILedgerProps {
  confidenceScore?: number;
  retrievedMemories?: string[];
  trustMetrics?: {
    whyActionTaken: string;
    evidenceUsed: string;
    riskMitigation: string;
  };
  reasoningFlow?: string[];
}

export default function ExplainableAILedger({
  confidenceScore = 96,
  retrievedMemories = [],
  trustMetrics,
  reasoningFlow = []
}: ExplainableAILedgerProps) {

  // Fallback Trust specifications matching default scenarios
  const defaultTrust = {
    whyActionTaken: "Outbound carrier rebate claiming and standby calendar routing triggered following offline service status.",
    evidenceUsed: "Regional outage network map logs, customer billing index ACCT-892415 page 1, and personal memory nodes.",
    riskMitigation: "Overrouted primary connection via celular proxy hotspot to guarantee meeting continuity."
  };

  const activeTrust = trustMetrics || defaultTrust;

  const defaultReasoning = [
    "Activated cognitive planner sub-routine to decompose instructions.",
    "Queried local memory database for related sibling and billing tags.",
    "Dispatched active API requests to carrier dispute endpoints.",
    "Streaming voice frequencies for micro-acoustic stress telemetry."
  ];

  const activeReasoning = reasoningFlow.length > 0 ? reasoningFlow : defaultReasoning;

  return (
    <div className="glass-card rounded-[24px] p-6 border-purple-500/15 relative overflow-hidden" id="explainable_ai_ledger">
      
      {/* Neon glowing line effect */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-cyan-500/0 via-purple-500/60 to-cyan-500/0" />

      <div className="mb-5 flex justify-between items-center pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-purple-400" />
          <div>
            <h4 className="font-display font-medium text-white text-sm">
              Explainable AI (XAI) & Trust Audit Ledger
            </h4>
            <span className="text-[10px] font-mono text-slate-500 mt-0.5 block uppercase">Dynamic grounding and safety alignment metrics</span>
          </div>
        </div>
        
        {/* Dynamic neon confidence indicator */}
        <div className="bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-white/5 text-center min-w-[95px] shrink-0 font-mono">
          <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">AI CONFIDENCE</span>
          <span className="text-sm font-extrabold text-cyan-400 glow-text-cyan">{confidenceScore}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Semantic Retrieval Vault used (Grounding Nodes) size 5 */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
              📚 Grounded Memories Retrieved (Vector Cosine match)
            </span>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-white/5 min-h-[140px] flex flex-col justify-between">
              
              {retrievedMemories.length > 0 ? (
                <div className="space-y-2">
                  {retrievedMemories.map((mem, mIdx) => (
                    <div key={mIdx} className="flex gap-2 items-start text-[11px] text-slate-300 leading-relaxed font-mono">
                      <Key className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <p>{mem}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-center text-slate-500 flex-1 my-auto">
                  <Eye className="w-5 h-5 opacity-25 mb-1.5" />
                  <p className="text-[10px] font-mono italic leading-relaxed">
                    No matching memories triggered. System loaded fresh baseline coordinates.
                  </p>
                </div>
              )}

              <div className="border-t border-white/[0.03] pt-2 mt-2 text-[9px] text-slate-500 font-mono flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-cyan-400" />
                <span>Checked 4 cosine vector nodes in long-term database.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Grounded Trust Evidence Columns (Trust Layer) size 7 */}
        <div className="md:col-span-7 space-y-4">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
            🛡️ Safety & Evidence Validation (Trust Layer Audit)
          </span>

          <div className="grid grid-cols-1 gap-3">
            
            {/* Why Action Taken */}
            <div className="p-3 bg-slate-950/50 rounded-xl border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-slate-100">
                <Shield className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-[11px] font-bold text-slate-200">Why Action Taken (Strategic Intent)</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans pl-5 pr-1">
                {activeTrust.whyActionTaken}
              </p>
            </div>

            {/* Evidence Used */}
            <div className="p-3 bg-slate-950/50 rounded-xl border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-slate-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[11px] font-bold text-slate-200">Evidence Grounding (Sourcing Checks)</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans pl-5 pr-1">
                {activeTrust.evidenceUsed}
              </p>
            </div>

            {/* Risk Mitigation */}
            <div className="p-3 bg-slate-950/50 rounded-xl border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-slate-100">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="text-[11px] font-bold text-slate-200">Safety & Risk Mitigation Safeguard</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans pl-5 pr-1">
                {activeTrust.riskMitigation}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
