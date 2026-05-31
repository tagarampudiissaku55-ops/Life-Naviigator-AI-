import React, { useState } from "react";
import { ShieldAlert, CheckSquare, Zap, Phone, ArrowRight, Eye, Volume2, X, AlertTriangle } from "lucide-react";

interface EmergencyPlan {
  title: string;
  checklist: string[];
  priorityActions: { title: string; desc: string; completed: boolean }[];
  contacts: { name: string; relation: string; phone: string; actions: string }[];
  guidanceText: string;
}

export default function EmergencyCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<"accident" | "medical" | "wallet" | "phone" | "travel">("accident");
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const emergencyScenarios: Record<string, EmergencyPlan> = {
    accident: {
      title: "🚗 Car Accident / Collision Protocol",
      guidanceText: "Remain calm and securely park the vehicle. The Monitoring Agent is already broadcasting your exact geolocation to Sister Alice and drafting insurer briefs.",
      checklist: [
        "Verify physical safety of all passengers immediately.",
        "Toggle vehicle hazard warning strobe lights on.",
        "Take comprehensive high-contrast photo assets of vehicle damages.",
        "Exchange credentials and insurance details with other operators."
      ],
      priorityActions: [
        { title: "Transmit GPS Coordinates", desc: "Sent exact localized block coordinates to Alice & nearest dispatch.", completed: true },
        { title: "Draft Claims Statement", desc: "Auto-compiled damage description brief with current time coordinates.", completed: true },
        { title: "Notify Emergency stand-by", desc: "Sister Alice notified via automated high-urgency SMS.", completed: true }
      ],
      contacts: [
        { name: "Sister Alice", relation: "Standby Contact", phone: "+1-555-0193", actions: "Awaiting Standby" },
        { name: "Statewide Dispatch", relation: "Local Emergency", phone: "911", actions: "Priority Link Active" },
        { name: "StateFarm Insurance", relation: "Insurer Policy #2041", phone: "+1-800-410-0934", actions: "Auto Claim Filed" }
      ]
    },
    medical: {
      title: "🏥 Acute Medical Emergency Protocol",
      guidanceText: "Sit tight. I have mapped the closest premium hospital facility and sent your medical card summaries to local responders.",
      checklist: [
        "Position yourself in a comfortable, safe state.",
        "Check localized pulse rating and blood pressure limits.",
        "Locate emergency epinephrine pen or prescribed medication.",
        "Keep airways entirely unobstructed."
      ],
      priorityActions: [
        { title: "Coordinate Responders Dispatch", desc: "Pinged paramedics line with localized transit directions.", completed: true },
        { title: "Transmit Medical Summary", desc: "Loaded historical allergic index entries onto responder profile.", completed: true },
        { title: "Establish Emergency Hotline", desc: "Initiated a continuous background audio line for active monitoring.", completed: true }
      ],
      contacts: [
        { name: "Sister Alice", relation: "Family Standby", phone: "+1-555-0193", actions: "Vocalizing updates" },
        { name: "Local First Responders", relation: "Paramedic Dispatch", phone: "911 Status", actions: "Arriving 8 Mins" },
        { name: "Primary Care Clinic", relation: "Family Physician", phone: "+1-555-0103", actions: "Forwarded health log" }
      ]
    },
    wallet: {
      title: "💳 Lost Wallet / Credential Theft",
      guidanceText: "Financial defenses deployed. Automated agents have systematically locked your card databases and filed credential replacements.",
      checklist: [
        "Lock cards and credential databases immediately via the dashboard.",
        "Verify recent transaction feeds for rogue billing lines.",
        "File local police agency property reports.",
        "Request urgent physical card dispatching."
      ],
      priorityActions: [
        { title: "Verify Chase Card Halt", desc: "Locked Visa signature lines automatically via Chase integration portal.", completed: true },
        { title: "Re-issue State Drivers License", desc: "Submitted replacement form with State DMV using pre-saved biometrics.", completed: true },
        { title: "Trigger Apple Wallet Freeze", desc: "Temporarily locked near-field token credentials.", completed: true }
      ],
      contacts: [
        { name: "Chase Lost/Stolen Bank", relation: "Banking Carrier", phone: "+1-800-935-9000", actions: "Account Suspended" },
        { name: "Sister Alice", relation: "Standby Carrier Fund", phone: "+1-555-0193", actions: "Authorized cash-send" }
      ]
    },
    phone: {
      title: "📱 Lost Phone / Device Recovery",
      guidanceText: "Retrieving device coordinates. Triggering maximum pitch ping strobe and locking personal local file systems.",
      checklist: [
        "Lock device coordinates via distant sandbox commands.",
        "Initiate maximum-audio alert sound parameters.",
        "Audit active email sessions and lock active sessions.",
        "Verify sister Alice's backup SMS proxy is active."
      ],
      priorityActions: [
        { title: "Lock Local File System", desc: "Encrypted device folders and stored secure tokens in local cloud.", completed: true },
        { title: "Locate GPS Coordinate", desc: "Synthesized latitude-longitude matching Terminal 4 block.", completed: true },
        { title: "Activate Screaming Ping Alert", desc: "Unmuted volume parameters to emit maximum distress frequency.", completed: true }
      ],
      contacts: [
        { name: "Sister Alice (Locate Proxy)", relation: "Coordinate Relay Partner", phone: "+1-555-0193", actions: "Active SMS Dispatcher" },
        { name: "Verizon Wireless Support", relation: "Telecom Carrier", phone: "+1-800-922-0204", actions: "Locked SIM Node" }
      ]
    },
    travel: {
      title: "✈️ Severe Travel & Flight Disruption",
      guidanceText: "Emergency itinerary recovery active. Re-routing evening JFK flights, preparing carrier refunds, and matching standby sister grids.",
      checklist: [
        "Confirm cancellation log index with Delta gates staff.",
        "Trigger immediate fallback seat booking hold on Flight DL-1204.",
        "Check standby coordinates for Sister Alice.",
        "File flight cancellation bill compensation form."
      ],
      priorityActions: [
        { title: "Lock Alternate Seat", desc: "Held premium Cabin seat DL-1204 departing JFK in 2h.", completed: true },
        { title: "Submit $400 Airline Indemnity", desc: "Auto-filed Passenger Claims form detailing weather cancellation.", completed: true },
        { title: "Pre-route Airport Cab Shuttle", desc: "Dispatched Black transfer vehicle pickup gates curbside.", completed: true }
      ],
      contacts: [
        { name: "Delta JFK Gate Desk", relation: "Delta Itinerary Manager", phone: "+1-800-221-1212", actions: "Standby 14D Checked" },
        { name: "Sister Alice", relation: "Standby Companion", phone: "+1-555-0193", actions: "Coordinated curbside" }
      ]
    }
  };

  const currentPlan = emergencyScenarios[selectedScenario];

  const handleToggleCheck = (item: string) => {
    setChecklistState(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const triggerEmergencyVoiceGuidance = () => {
    setIsPlayingAudio(true);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `Emergency protocol initialized. ${currentPlan.guidanceText} Please proceed to: ${currentPlan.checklist[0]}`
      );
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 3000);
    }
  };

  return (
    <>
      {/* Blinking red glowing panic emergency button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 px-5 rounded-[20px] bg-rose-950/40 border border-rose-500/30 hover:border-rose-500/60 shadow-lg hover:shadow-rose-500/5 transition-all text-left flex items-center justify-between cursor-pointer select-none group relative overflow-hidden"
      >
        <span className="absolute inset-0 bg-rose-500/5 animate-pulse" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center animate-pulse shrink-0">
            <ShieldAlert className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <h4 className="font-display font-bold text-xs tracking-wider text-rose-300">
                🚨 TACTICAL EMERGENCY DIRECT OPERATOR DISPATCH
              </h4>
            </div>
            <p className="text-[11px] text-rose-455 font-mono text-slate-400 mt-1">
              Accident &bull; Medical help &bull; Locked Out &bull; Flight cancellation &bull; Theft
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <span className="text-[10px] font-mono text-rose-300 group-hover:underline">LAUNCH HUD &rarr;</span>
        </div>
      </button>

      {/* Emergency dispatch HUD Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 z-[60] fade-in">
          <div className="w-full max-w-4xl bg-slate-950 rounded-[30px] border border-rose-500/30 shadow-2xl shadow-rose-500/5 flex flex-col max-h-[90vh] overflow-hidden text-left relative">
            
            {/* Holographic scanner laser line decorator */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-pulse" />

            {/* Header section with panic theme */}
            <div className="p-6 border-b border-white/5 bg-rose-950/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-rose-500 animate-bounce" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">LIFE OPERATOR SATELLITE DISPATCH</span>
                    <span className="text-[10px] font-mono text-rose-300 font-bold">STATUS: CRITICAL PRIORITY</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-white mt-1">
                    Emergency Tactical Response Center
                  </h3>
                </div>
              </div>

              <button
                onClick={() => { setIsOpen(false); window.speechSynthesis.cancel(); }}
                className="p-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main scrollable grid of the HUD */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              
              {/* Emergency Selector options */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { id: "accident", label: "Car Accident", emoji: "🚗" },
                  { id: "medical", label: "Medical Crisis", emoji: "🏥" },
                  { id: "wallet", label: "Lost Wallet", emoji: "💳" },
                  { id: "phone", label: "Lost Phone", emoji: "📱" },
                  { id: "travel", label: "Travel Disruption", emoji: "✈️" }
                ].map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setSelectedScenario(sc.id as any);
                      window.speechSynthesis.cancel();
                    }}
                    className={`p-3 rounded-xl border font-semibold select-none flex flex-col items-center gap-1.5 transition-all text-xs cursor-pointer
                      ${selectedScenario === sc.id 
                        ? "bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-lg shadow-rose-500/5 scale-[1.02]" 
                        : "bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200"
                      }
                    `}
                  >
                    <span className="text-2xl">{sc.emoji}</span>
                    <span>{sc.label}</span>
                  </button>
                ))}
              </div>

              {/* High-visibility alert summary text */}
              <div className="py-4 px-5 bg-rose-500/5 border border-rose-500/20 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono font-bold text-rose-400 uppercase tracking-widest block">GUIDANCE BROADCAST SUMMARY:</span>
                  <p className="text-xs text-rose-200 font-medium font-sans leading-relaxed">
                    {currentPlan.guidanceText}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={triggerEmergencyVoiceGuidance}
                  className={`py-2 px-4 rounded-xl flex items-center gap-1.5 font-mono text-[10px] uppercase cursor-pointer transition shrink-0
                    ${isPlayingAudio 
                      ? "bg-rose-600 text-white animate-pulse" 
                      : "bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/35"
                    }
                  `}
                >
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span>{isPlayingAudio ? "Streaming Vocals..." : "Stream Live Guidance"}</span>
                </button>
              </div>

              {/* Grid content blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* Checklist column */}
                <div className="bg-slate-900/55 p-5 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <CheckSquare className="w-4 h-4 text-rose-455 text-rose-400" />
                    <h4 className="font-display font-bold text-xs text-slate-200 uppercase tracking-wider">
                      Interactive Emergency Checklist
                    </h4>
                  </div>
                  
                  <div className="space-y-3">
                    {currentPlan.checklist.map((item, idx) => {
                      const isChecked = !!checklistState[`${selectedScenario}_${idx}`];
                      return (
                        <div 
                          key={idx}
                          onClick={() => handleToggleCheck(`${selectedScenario}_${idx}`)}
                          className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-950/60 border border-white/5 cursor-pointer hover:border-rose-500/10 transition-all select-none text-xs"
                        >
                          <div className={`mt-0.5 w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 transition-all
                            ${isChecked 
                              ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" 
                              : "border-slate-700 bg-slate-900"
                            }
                          `}>
                            <span className="text-[10px] font-bold">{isChecked ? "✓" : ""}</span>
                          </div>
                          <span className={`leading-relaxed text-slate-300 ${isChecked ? "line-through text-slate-500" : ""}`}>
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Priority Agent Actions & Contacts columns */}
                <div className="space-y-6">
                  
                  {/* Priority action list */}
                  <div className="bg-slate-900/55 p-5 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-1">
                      <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                      <h4 className="font-display font-bold text-xs text-slate-200 uppercase tracking-wider">
                        Autonomous Priority Agent Actions
                      </h4>
                    </div>

                    <div className="space-y-3 text-xs">
                      {currentPlan.priorityActions.map((act, idx) => (
                        <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-white/5 flex justify-between items-center gap-3">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-slate-200 block">{act.title}</span>
                            <span className="text-[10.5px] text-slate-400 leading-normal block">{act.desc}</span>
                          </div>
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/25 shrink-0">
                            TRANSMITTED
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Immediate speed-dial contacts */}
                  <div className="bg-slate-900/55 p-5 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-1">
                      <Phone className="w-4 h-4 text-cyan-400" />
                      <h4 className="font-display font-bold text-xs text-slate-200 uppercase tracking-wider">
                        Backup Contact Suggestion Nodes
                      </h4>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {currentPlan.contacts.map((con, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-950/60 rounded-xl border border-white/5 flex justify-between items-center gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-200">{con.name}</span>
                              <span className="text-[9px] font-mono text-slate-500">[{con.relation}]</span>
                            </div>
                            <span className="text-[10.5px] font-mono text-slate-400 block mt-0.5">{con.phone}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/25 block">
                              {con.actions}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Bottom hud alert footer with quick escape instructions */}
            <div className="p-4 border-t border-white/5 bg-slate-950 text-center text-[10px] font-mono text-rose-400 leading-normal flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping shrink-0" />
              <span>SATELLITE COORDINATE FEED DISPATCHED SUCCESFULLY TO REPAIR ALL ENVIRONMENTAL GAP DISRUPTIONS</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
