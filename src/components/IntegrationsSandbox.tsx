import React, { useState } from "react";
import { Mail, Calendar, MapPin, CheckCircle, ChevronRight, Send, Clock, Map, Clipboard, ExternalLink } from "lucide-react";
import { TaskItem } from "../types";

interface IntegrationsSandboxProps {
  lastUserUtterance: string;
  tasks: TaskItem[];
}

export default function IntegrationsSandbox({ lastUserUtterance, tasks }: IntegrationsSandboxProps) {
  const [activeTab, setActiveTab] = useState<"maps" | "calendar" | "gmail">("calendar");
  const [copySuccess, setCopySuccess] = useState(false);

  const utteranceLower = lastUserUtterance.toLowerCase();

  // Dynamic values based on what the user actually said
  const hasInternetOutage = utteranceLower.includes("internet") || utteranceLower.includes("outage") || utteranceLower.includes("working");
  const hasFlightCancellation = utteranceLower.includes("flight") || utteranceLower.includes("stuck") || utteranceLower.includes("airport");
  const hasGymMembership = utteranceLower.includes("gym") || utteranceLower.includes("membership") || utteranceLower.includes("cancel");

  // Google Maps mock attributes
  const getMapsData = () => {
    if (hasFlightCancellation) {
      return {
        origin: "JFK Airport Terminal 4, Level 1",
        destination: "User Registered Primary Residence",
        distance: "18.3 miles",
        duration: "34 mins",
        status: "Cab Dispatched & En Route",
        routeSteps: [
          "Departure: JFK Access Rd (0.4 mi)",
          "Take Van Wyck Expy N & I-678 N (7.2 mi)",
          "Merge onto Grand Central Pkwy W (6.1 mi)",
          "Arrive at destination residence (4.6 mi)"
        ],
        latOffset: 25,
      };
    } else if (hasInternetOutage) {
      return {
        origin: "Comcast Local Dispatch Hub East",
        destination: "User Residence Utility Interface",
        distance: "2.4 miles",
        duration: "8 mins",
        status: "Technician Dispatched (On Tuesday schedule)",
        routeSteps: [
          "Departure: Service Way Terminal (0.2 mi)",
          "Continue west along Broadway Blvd (1.1 mi)",
          "Turn right onto local block 14 street (1.1 mi)"
        ],
        latOffset: -12,
      };
    } else {
      return {
        origin: "Primary User Residence",
        destination: "Regional Coordinate Center",
        distance: "4.1 miles",
        duration: "12 mins",
        status: "Mapping idle",
        routeSteps: [
          "Ready for next location-guided acoustic trigger"
        ],
        latOffset: 0,
      };
    }
  };

  // Google Calendar mock appointments
  const getCalendarEvents = () => {
    const baseline = [
      { id: "1", time: "10:00 AM - 11:30 AM", title: "Quarterly Executive Business Meet", category: "work" },
      { id: "2", time: "01:30 PM - 02:00 PM", title: "Post-Lunch Coordination Check", category: "work" }
    ];

    if (hasInternetOutage) {
      return [
        ...baseline,
        { id: "e1", time: "Tuesday, 08:00 AM - 10:00 AM", title: "🚨 Comcast Technical Line Repair Agent", category: "dispute" }
      ];
    } else if (hasFlightCancellation) {
      return [
        { id: "e2", time: "Today, 05:15 PM - 08:30 PM", title: "✈️ Re-routed Flight Delta DL-1204 (Hold Status)", category: "travel" },
        ...baseline
      ];
    } else if (hasGymMembership) {
      return [
        ...baseline,
        { id: "e3", time: "Tomorrow, 09:00 AM - 09:15 AM", title: "📞 Outgoing Support Rep Subscription Call verification", category: "dispute" }
      ];
    }

    return baseline;
  };

  // Gmail / Outbound Draft letter generator
  const getEmailDraft = () => {
    if (hasInternetOutage) {
      return {
        to: "comcast-billing-support@comcast-claims.com",
        subject: "Dispute Claim: Utility outage invoice refund request INC-892415",
        body: `Dear Comcast Support,

This message serves as a formal dispute regarding wide-area service outages experienced on my account (Billing Block 14) which resulted in terminal offline status during core business hours, disrupting my meetings.

Under federal and regional service provider requirements, I am claiming utility incident credits matching the downtime window for support ticket #INC-892415.

Please refund $25.00 back to the automated payment card associated with my fiber line immediately.

Warm regards,
Life Navigator AI Operator on behalf of client`
      };
    } else if (hasFlightCancellation) {
      return {
        to: "refunds-desk@delta-airlines.com",
        subject: "Urgent Outage Reimbursement: Flight Cancellation Delay, JF-1204",
        body: `To the Delta Airlines Passenger Relations Division,

This document holds an official passenger compensation request for flight cancellation refund matching modern regional transit rights. My scheduled departure from JFK was cancelled abruptly with zero pre-notification, triggering acute logistical difficulties.

I demand a standard statutory $400 flight cancel credit refund directly to my account, in tandem with priority seating re-routing on Delta Flight DL-1204.

Signed,
Life Navigator AI Agentic Proxy`
      };
    } else if (hasGymMembership) {
      return {
        to: "cancellations@regional-gym-co.com",
        subject: "Membership Rescission Notification: Account #Gym-78401",
        body: `Dear Gym Management Team,

Please be notified that I am exercising my cancellation rights concerning contract Gym-78401 immediately on grounds of premium tariff inflation.

This certified letter demands that you discontinue all recurring credit sweeps and close out my active billing files within the standard 24-hour statutory cancellation threshold. Please send email confirmation when completed.

Regards,
Life Navigator AI Proxy on behalf of client`
      };
    } else {
      return {
        to: "support-recipient@integration-sandbox.org",
        subject: "Life Operator Draft ready",
        body: "Awaiting next trigger to generate automated email dispute forms on your behalf..."
      };
    }
  };

  const mapInfo = getMapsData();
  const calendarEvents = getCalendarEvents();
  const emailDraft = getEmailDraft();

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(emailDraft.body);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="glass-card rounded-[24px] p-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-semibold block mb-1">
            Google Workspace & Maps Linkage
          </span>
          <h4 className="font-display font-medium text-white text-base">
            Live Shared Integrations Hub
          </h4>
        </div>

        {/* Navigation tabs inside Sandbox */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 text-xs text-slate-400">
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 cursor-pointer transition-colors
              ${activeTab === "calendar" ? "bg-purple-500/20 text-purple-300 border border-purple-500/20 font-medium" : "hover:text-slate-200"}
            `}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab("maps")}
            className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 cursor-pointer transition-colors
              ${activeTab === "maps" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 font-medium" : "hover:text-slate-200"}
            `}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Google Maps</span>
          </button>

          <button
            onClick={() => setActiveTab("gmail")}
            className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 cursor-pointer transition-colors
              ${activeTab === "gmail" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "hover:text-slate-200"}
            `}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Gmail drafts</span>
          </button>
        </div>
      </div>

      {/* CALENDAR TAB VIEW */}
      {activeTab === "calendar" && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-xs text-slate-400 leading-relaxed">
            Automatic coordination ensures the Life Operator schedules meetings or repairs without conflicting with your quarterly calendar locks.
          </p>

          <div className="rounded-xl border border-white/5 overflow-hidden">
            <div className="bg-slate-950 p-3 flex justify-between items-center text-xs font-mono border-b border-white/5">
              <span className="text-slate-400">Timeblock Calendar</span>
              <span className="text-purple-400">Google Calendar API V3</span>
            </div>

            <div className="bg-slate-900/10 p-3 divide-y divide-white/5">
              {calendarEvents.map((event) => (
                <div key={event.id} className="py-2.5 flex items-start gap-4 justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full 
                        ${event.category === "work" ? "bg-indigo-400" : ""}
                        ${event.category === "dispute" ? "bg-rose-400 animate-pulse" : ""}
                        ${event.category === "travel" ? "bg-cyan-400 animate-pulse" : ""}
                      `} />
                      <strong className="text-xs font-medium text-slate-200">
                        {event.title}
                      </strong>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5 block ml-4">
                      Scheduled period: {event.time}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider border
                    ${event.category === "work" ? "bg-slate-800 text-slate-300 border-slate-700" : ""}
                    ${event.category === "dispute" ? "bg-rose-500/10 text-rose-400 border-rose-500/20 font-bold" : ""}
                    ${event.category === "travel" ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 font-bold" : ""}
                  `}>
                    {event.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MAPS TAB VIEW */}
      {activeTab === "maps" && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 rounded-xl bg-slate-950 p-4 border border-white/5 relative min-h-[160px] overflow-hidden flex flex-col justify-between">
              
              {/* Dynamic Interactive HUD visualization element representing mapping vectors */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950 -z-10" />
              
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] -z-10" />

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block mb-0.5">
                    Live Vector Overlay
                  </span>
                  <strong className="text-xs text-white block">
                    {mapInfo.origin} &rarr; {mapInfo.destination}
                  </strong>
                </div>
                <div className="text-right">
                  <span className="inline-block px-1.5 py-0.5 text-[8px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/20 rounded animate-pulse">
                    Tracking API
                  </span>
                </div>
              </div>

              {/* Decorative line coordinate maps representation */}
              <div className="my-6 h-1 w-full bg-slate-800 rounded-full relative overflow-hidden">
                <div className="absolute left-[20%] right-[30%] h-full bg-gradient-to-r from-cyan-500 to-indigo-500 animate-pulse" />
                <div 
                  className="absolute w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-slate-950 -top-1.5 transition-all duration-1000 animate-bounce" 
                  style={{ left: `${50 + mapInfo.latOffset}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Dist: <strong className="text-white">{mapInfo.distance}</strong></span>
                <span>ETA: <strong className="text-white">{mapInfo.duration}</strong></span>
                <span className="text-cyan-400 font-semibold">{mapInfo.status}</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-950 p-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                  Routing Directions
                </span>
                <div className="space-y-2 max-h-[110px] overflow-y-auto pr-1">
                  {mapInfo.routeSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-2 items-start text-[11px] text-slate-400">
                      <ChevronRight className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[9px] font-mono text-slate-600 mt-2">
                Coordinates fed to local ride-hail and dispatch services autonomously.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* GMAIL TAB VIEW */}
      {activeTab === "gmail" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center text-xs">
            <p className="text-slate-400">
              The Operator automatically drafts professional letters to corporate support divisions for reimbursement claims.
            </p>
            <button
              onClick={handleCopyDraft}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-white/10 text-xs text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>{copySuccess ? "Copied!" : "Copy Letter"}</span>
            </button>
          </div>

          <div className="rounded-xl border border-white/5 overflow-hidden">
            <div className="bg-slate-950 px-4 py-3 border-b border-white/5 space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex gap-2">
                <span className="text-slate-500 w-12 text-right">To:</span>
                <span className="text-slate-200 font-semibold">{emailDraft.to}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-500 w-12 text-right">Subject:</span>
                <span className="text-slate-200 font-semibold">{emailDraft.subject}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 font-mono text-slate-300 text-xs leading-relaxed whitespace-pre-line max-h-[200px] overflow-y-auto">
              {emailDraft.body}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
