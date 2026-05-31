import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Send, HelpCircle, AudioLines, Info, Volume2, Sparkles, Smile, RefreshCw } from "lucide-react";
import { HOVER_EMOTIONS } from "../demoData";

interface VoiceOrbProps {
  onSendMessage: (text: string) => void;
  status: "idle" | "listening" | "thinking" | "speaking";
  setStatus: (status: "idle" | "listening" | "thinking" | "speaking") => void;
  detectedEmotion: string;
  responseText: string;
  lastUserUtterance: string;
  onClear: () => void;
  chatHistory: { role: "user" | "assistant"; text: string }[];
}

export default function VoiceOrb({
  onSendMessage,
  status,
  setStatus,
  detectedEmotion,
  responseText,
  lastUserUtterance,
  onClear,
  chatHistory,
}: VoiceOrbProps) {
  const [inputText, setInputText] = useState("");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [micAvailable, setMicAvailable] = useState(true);
  const [displayMode, setDisplayMode] = useState<"voice" | "chat">("voice");
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Web Speech Recognition
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
        onSendMessage(text);
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
  }, [setStatus, onSendMessage, status]);

  // Handle native Speech Synthesis (Talking back to user)
  useEffect(() => {
    if (responseText && status === "speaking") {
      // Cancel previous speech if active
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(responseText);
      
      // Calibrate speech pace based on emotion
      const emotionLower = detectedEmotion.toLowerCase();
      if (emotionLower.includes("stress") || emotionLower.includes("anxious") || emotionLower.includes("flight")) {
        utterance.rate = 0.85; // Speak slower, reassuringly
        utterance.pitch = 1.05; // Slightly higher/warmer pitch
      } else if (emotionLower.includes("urgency") || emotionLower.includes("urgent")) {
        utterance.rate = 1.05; // Slightly faster for quick assistance
        utterance.pitch = 0.98;
      } else {
        utterance.rate = 0.95;
        utterance.pitch = 1.02;
      }

      utterance.onend = () => {
        setIsSynthesizing(false);
        setStatus("idle");
      };

      utterance.onerror = () => {
        setIsSynthesizing(false);
        setStatus("idle");
      };

      speechUtteranceRef.current = utterance;
      setIsSynthesizing(true);
      window.speechSynthesis.speak(utterance);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [responseText, status, detectedEmotion, setStatus]);

  const toggleMicListening = () => {
    if (!micAvailable) {
      alert("Speech recognition is not fully supported in your browser. Feel free to type your prompt instead!");
      return;
    }

    if (status === "listening") {
      recognitionRef.current?.stop();
    } else {
      window.speechSynthesis.cancel(); // Stop talking on voice activation
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn("Recognition start failed:", err);
      }
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText("");
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setStatus("idle");
    setIsSynthesizing(false);
  };

  useEffect(() => {
    if (displayMode === "chat") {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, displayMode]);

  return (
    <div className="glass-card rounded-[32px] p-6 md:p-8 flex flex-col items-center justify-between min-h-[500px] h-full overflow-hidden relative group/orb">
      {/* Background glow matching the agent state */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full filter blur-[80px] opacity-25 transition-all duration-1000 -z-10
        ${status === "listening" ? "bg-cyan-500" : ""}
        ${status === "thinking" ? "bg-amber-400" : ""}
        ${status === "speaking" ? "bg-purple-600" : ""}
        ${status === "idle" ? "bg-indigo-600" : ""}
      `} />

      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AudioLines className={`w-5 h-5 text-purple-400 ${status !== "idle" ? "animate-pulse" : ""}`} />
            <span className="text-xs font-mono font-medium text-purple-300 uppercase tracking-widest">
              Life Operator Console
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {responseText && (
              <button
                type="button"
                onClick={onClear}
                className="px-2 py-1 text-[10px] font-mono rounded bg-white/5 hover:bg-white/10 text-slate-400 transition cursor-pointer"
                title="Reset Sandbox Application State"
              >
                Reset Session
              </button>
            )}
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider
              ${status === "idle" ? "bg-slate-800 text-slate-300" : ""}
              ${status === "listening" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 animate-pulse" : ""}
              ${status === "thinking" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse" : ""}
              ${status === "speaking" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : ""}
            `}>
              {status}
            </span>
          </div>
        </div>

        {/* Sub-navigation controller within Life Operator Widget */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 text-xs text-slate-400 w-full">
          <button
            type="button"
            onClick={() => setDisplayMode("voice")}
            className={`flex-1 py-1.5 rounded-lg font-mono flex items-center justify-center gap-1.5 cursor-pointer transition-colors
              ${displayMode === "voice" ? "bg-purple-500/25 text-purple-300 font-semibold border border-purple-500/20" : "hover:text-slate-200"}
            `}
          >
            <span>🎙️ Operator Orb</span>
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode("chat")}
            className={`flex-1 py-1.5 rounded-lg font-mono flex items-center justify-center gap-1.5 cursor-pointer transition-colors
              ${displayMode === "chat" ? "bg-cyan-500/25 text-cyan-300 font-semibold border border-cyan-500/20" : "hover:text-slate-200"}
            `}
          >
            <span>💬 Active Chatbot</span>
            {chatHistory.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {displayMode === "voice" ? (
        /* Main Animated Voice Orb */
        <div className="my-8 flex flex-col items-center relative transition-all duration-300">
          <button
            type="button"
            id="trigger_voice_mic_btn"
            onClick={toggleMicListening}
            className="relative group transition-transform hover:scale-105 active:scale-95 outline-none cursor-pointer"
          >
            {/* External ripple sound waves on listening/speaking */}
            {status === "listening" && (
              <>
                <div className="absolute inset-0 rounded-full border border-cyan-400/40 ripple-circle" />
                <div className="absolute inset-0 rounded-full border border-cyan-400/20 ripple-circle [animation-delay:0.8s]" />
                <div className="absolute inset-0 rounded-full border border-cyan-400/10 ripple-circle [animation-delay:1.6s]" />
              </>
            )}

            {status === "speaking" && (
              <>
                <div className="absolute inset-0 rounded-full border border-purple-400/30 ripple-circle" />
                <div className="absolute inset-0 rounded-full border border-purple-400/10 ripple-circle [animation-delay:1.2s]" />
              </>
            )}

            {/* Core Orb Sphere */}
            <div className={`w-36 h-36 md:w-40 md:h-40 rounded-full flex items-center justify-center relative transition-all duration-700
              ${status === "idle" ? "bg-gradient-to-tr from-slate-900 via-indigo-950 to-purple-950 voice-orb-active shadow-indigo-500/20" : ""}
              ${status === "listening" ? "bg-gradient-to-tr from-cyan-950 via-teal-900 to-slate-950 shadow-cyan-400/30 scale-110" : ""}
              ${status === "thinking" ? "bg-gradient-to-tr from-amber-950 via-slate-900 to-purple-950 animate-spin [animation-duration:12s] shadow-amber-400/25" : ""}
              ${status === "speaking" ? "bg-gradient-to-tr from-indigo-950 via-fuchsia-950 to-slate-950 shadow-purple-500/40" : ""}
              border border-white/10 glow-border-cyan
            `}>
              <div className="absolute inset-[3px] rounded-full bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center text-slate-300">
                {status === "idle" && <Mic className="w-8 h-8 text-indigo-400 group-hover:text-cyan-400 transition-colors" />}
                {status === "listening" && <Mic className="w-8 h-8 text-cyan-400 animate-pulse" />}
                {status === "thinking" && <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />}
                {status === "speaking" && <Volume2 className="w-8 h-8 text-purple-400 animate-bounce" />}
                
                <span className="text-[10px] font-mono mt-2 tracking-widest text-slate-500 uppercase">
                  {status === "idle" && "TAP TO SPEAK"}
                  {status === "listening" && "LISTENING..."}
                  {status === "thinking" && "DECOMPOSING..."}
                  {status === "speaking" && "SPEAKING"}
                </span>
              </div>
            </div>
          </button>

          {/* Live Audio Equalizer Lines for active audio feedback */}
          {(status === "speaking" || status === "listening") && (
            <div className="flex gap-1 items-center justify-center mt-6 h-8">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className={`w-0.5 rounded-full transition-all duration-300 
                    ${status === "listening" ? "bg-cyan-400" : "bg-purple-500"}
                  `}
                  style={{
                    height: status === "listening" ? "8px" : "12px",
                    animation: `bounce 0.8s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          )}

          {status === "speaking" && (
            <button
              onClick={stopSpeaking}
              className="mt-4 px-3 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono hover:bg-rose-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MicOff className="w-3 h-3" /> Stop Operator Voice
            </button>
          )}
        </div>
      ) : (
        /* Chat Messenger bubble stream representing interactive AI chatbot */
        <div className="w-full flex-1 my-4 bg-slate-950/60 rounded-2xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden min-h-[220px] transition-all duration-300">
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[240px] text-xs">
            {chatHistory.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-500 font-mono space-y-2">
                <Smile className="w-8 h-8 text-indigo-400 opacity-60" />
                <p className="text-slate-400 text-xs font-sans">
                  No chat history yet. Send a goals template or write a message to trigger the smart operator thread.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} max-w-full animate-fade-in`}
                  >
                    <span className="text-[9px] font-mono text-slate-500 mb-0.5 block px-1">
                      {msg.role === "user" ? "USER CLIENT" : "LIFE ADVISOR AI"}
                    </span>
                    <div className={`p-3 rounded-2xl leading-relaxed whitespace-pre-line max-w-[90%] font-sans
                      ${msg.role === "user" 
                        ? "bg-purple-600 text-white rounded-tr-none text-right" 
                        : "bg-slate-900 border border-white/5 text-slate-200 rounded-tl-none text-left"
                      }
                    `}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>
        </div>
      )}

      {/* Transcription Window */}
      {displayMode === "voice" && (
        <div className="w-full bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 min-h-[120px] max-h-[160px] overflow-y-auto flex flex-col justify-end text-sm">
          {lastUserUtterance ? (
            <p className="text-slate-400 mb-2 border-l-2 border-indigo-500 pl-3 italic font-sans text-xs">
              User says: &ldquo;{lastUserUtterance}&rdquo;
            </p>
          ) : (
            <div className="text-slate-600 italic text-xs mb-2 flex items-center justify-center gap-1.5 py-2">
              <Info className="w-3.5 h-3.5 text-slate-500" />
              <span>Speak or choose a trigger scenario to instruct the AI agent.</span>
            </div>
          )}

          {responseText && (
            <div className="text-emerald-400/90 font-sans leading-relaxed text-sm animate-fade-in flex items-start gap-1 pb-1">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span className="text-slate-200 text-xs">{responseText}</span>
            </div>
          )}
        </div>
      )}

      {/* Manual Input Form */}
      <form onSubmit={handleTextSubmit} className="w-full flex gap-2 mt-2">
        <input
          id="custom_agent_prompt_input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={displayMode === "voice" ? "Speak or type custom request..." : "Ask your AI Advisor chatbot..."}
          disabled={status === "thinking"}
          className="flex-1 bg-slate-950/60 border border-white/10 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 text-slate-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 disabled:opacity-50 transition-all font-mono"
        />
        <button
          id="send_custom_agent_prompt_btn"
          type="submit"
          disabled={status === "thinking" || !inputText.trim()}
          className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:bg-slate-800 disabled:text-slate-500 transition-all cursor-pointer flex items-center justify-center shrink-0"
          title="Send goal to agent"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
