import React from "react";
import { Clock, TrendingUp, Sparkles, Smile, ShieldAlert, Heart, Activity, Percent } from "lucide-react";
import { HOVER_EMOTIONS } from "../demoData";
import { EmotionMetrics } from "../types";

interface CXDashboardProps {
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
}

export default function CXDashboard({ metrics, emotionMetrics, detectedEmotion }: CXDashboardProps) {
  // Compute color configurations based on detected dominant emotions
  const activeEmotionGlow = HOVER_EMOTIONS[detectedEmotion as keyof typeof HOVER_EMOTIONS] || {
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    description: "Adaptive response frequency operational. Optimising for structured strategic planning.",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Prime KPI Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric Card 1: Time Saved */}
        <div className="glass-card rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-slate-700 group-hover:text-cyan-500/40 transition-colors">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">Time Transferred Back</p>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2 glow-text-cyan">
              {metrics.timeSavedHours.toFixed(1)} <span className="text-sm font-normal text-slate-400">Hrs</span>
            </h3>
          </div>
          <p className="text-[10px] text-slate-400 font-mono mt-3 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Saved calling menus & hold lines
          </p>
        </div>

        {/* Metric Card 2: Money Reimbursed/Saved */}
        <div className="glass-card rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-slate-700 group-hover:text-emerald-500/40 transition-colors">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">Funds Recovered</p>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2">
              ${metrics.moneySavedDollars} <span className="text-xs font-normal text-emerald-400">Claims settled</span>
            </h3>
          </div>
          <p className="text-[10px] text-slate-400 font-mono mt-3 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Automatic carrier refund tracking
          </p>
        </div>

        {/* Metric Card 3: Stress Index Score */}
        <div className="glass-card rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-slate-700 group-hover:text-rose-500/40 transition-colors">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">Stress Alleviation</p>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2">
              {metrics.stressReductionScore}% <span className="text-xs font-normal text-rose-400">Reduced Index</span>
            </h3>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-slate-900 rounded-full h-1 overflow-hidden">
              <div 
                className="bg-rose-400 h-full transition-all duration-1000" 
                style={{ width: `${metrics.stressReductionScore}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-rose-300">Target: 95%</span>
          </div>
        </div>

        {/* Metric Card 4: AI Agent Confidence */}
        <div className="glass-card rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-slate-700 group-hover:text-purple-500/40 transition-colors">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">Operator Accuracy</p>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2 glow-text-purple">
              {metrics.aiConfidence}% <span className="text-xs font-normal text-purple-400">Auto confidence</span>
            </h3>
          </div>
          <p className="text-[10px] text-slate-400 font-mono mt-3 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Asynchronous task completion yield
          </p>
        </div>
      </div>

      {/* Main Emotional Intelligence Engine Panel & Live State */}
      <div className="glass-card rounded-[24px] p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full filter blur-3xl -z-10" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 pb-5 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              <h4 className="font-display font-medium text-white text-base">
                Emotional Intelligence Engine (EIE)
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Analyzing user vocal acoustics, speed, syntactic vocabulary, and sentiment levels.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Dominant state:</span>
            <span className={`px-3 py-1 rounded-lg text-xs font-mono border uppercase tracking-wider font-semibold animate-pulse ${activeEmotionGlow.color}`}>
              {detectedEmotion}
            </span>
          </div>
        </div>

        {/* Emotion Spectrum Meter Displays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            {/* Stress level */}
            <div>
              <div className="flex justify-between text-xs font-semibold font-mono mb-1.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Stress Level
                </span>
                <span className="text-rose-400">{emotionMetrics.stress}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-rose-500 to-red-500 h-full transition-all duration-1000" 
                  style={{ width: `${emotionMetrics.stress}%` }}
                />
              </div>
            </div>

            {/* Urgency */}
            <div>
              <div className="flex justify-between text-xs font-semibold font-mono mb-1.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Urgency & Priority
                </span>
                <span className="text-red-400">{emotionMetrics.urgency}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-amber-500 to-red-500 h-full transition-all duration-1000" 
                  style={{ width: `${emotionMetrics.urgency}%` }}
                />
              </div>
            </div>

            {/* Frustration */}
            <div>
              <div className="flex justify-between text-xs font-semibold font-mono mb-1.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Frustration Score
                </span>
                <span className="text-amber-400">{emotionMetrics.frustration}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-yellow-500 to-amber-500 h-full transition-all duration-1000" 
                  style={{ width: `${emotionMetrics.frustration}%` }}
                />
              </div>
            </div>

            {/* Happiness */}
            <div>
              <div className="flex justify-between text-xs font-semibold font-mono mb-1.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Satisfaction & Happiness
                </span>
                <span className="text-emerald-400">{emotionMetrics.happiness}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-slate-800 to-emerald-400 h-full transition-all duration-1000" 
                  style={{ width: `${emotionMetrics.happiness}%` }}
                />
              </div>
            </div>
          </div>

          {/* Calibrator advice based on EIE active parameters */}
          <div className="rounded-xl bg-slate-950/40 p-4 border border-white/5 flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] font-mono tracking-wider font-semibold text-cyan-400 uppercase">
                Active Acoustics Filter
              </span>
              <p className="text-xs text-slate-300 mt-2 font-mono leading-relaxed">
                {activeEmotionGlow.description}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-900 grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded bg-slate-900/60">
                <span className="block text-[10px] text-slate-500 font-mono">Productivity Boost</span>
                <strong className="text-xs text-indigo-400 mt-1 block">+{metrics.productivityScore}%</strong>
              </div>
              <div className="p-2 rounded bg-slate-900/60">
                <span className="block text-[10px] text-slate-500 font-mono">Channel Bandwidth</span>
                <strong className="text-xs text-cyan-400 mt-1 block">Parallel-Multi</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
