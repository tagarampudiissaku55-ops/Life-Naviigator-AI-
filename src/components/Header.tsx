import React from "react";
import { Cpu, ShieldAlert, Radio, Activity } from "lucide-react";

export default function Header() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-white/5 bg-slate-950/40 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10 relative">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-[1.5px] shadow-lg shadow-purple-500/20">
            <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-75 animate-ping" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-medium tracking-tight text-white text-lg">
              Life Navigator AI
            </h1>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/25">
              Agentic v2.5
            </span>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Voice-First Personal Life Operator & Autonomous Task Executor
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 w-full md:w-auto justify-between md:justify-end">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5">
          <Activity className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
          <span>Latency: <strong className="text-cyan-400">142ms</strong></span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5">
          <Radio className="w-3.5 h-3.5 text-indigo-400" />
          <span>Node Gateway: <strong className="text-indigo-400">Active Sec-4</strong></span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hidden sm:flex">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>UTC: {time}</span>
        </div>
      </div>
    </header>
  );
}
