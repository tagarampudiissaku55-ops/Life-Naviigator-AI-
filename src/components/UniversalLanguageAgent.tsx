import React, { useState } from "react";
import { Globe, Languages, Play, RotateCcw, Volume2, Sparkles, CheckCircle } from "lucide-react";

interface LanguageScenario {
  original: string;
  transliteration?: string;
  translation: string;
  intent: string;
  actionTaken: string;
  finalResponse: string;
  label: string;
}

interface LanguageMapping {
  code: string;
  name: string;
  nativeName: string;
  iconGlow: string;
  scenarios: LanguageScenario[];
}

export default function UniversalLanguageAgent() {
  const [selectedLang, setSelectedLang] = useState<string>("te");
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const languages: LanguageMapping[] = [
    {
      code: "te",
      name: "Telugu",
      nativeName: "తెలుగు",
      iconGlow: "shadow-cyan-500/10 border-cyan-500/30 text-cyan-400",
      scenarios: [
        {
          label: "Comcast/Flight Emergency",
          original: "ఆందోళనగా ఉంది, నా కాంకాస్ట్ ఇంటర్నెట్ పోయింది, జెఎఫ్‌కే విమానం రద్దయింది! నా సిస్టర్ అలిస్ స్టాండ్‌బైలో ఉంది. దీనిని కాపాడగలరా?",
          transliteration: "Andolanaga undi, na Comcast internet poyindi, JFK vimanam raddayindi! Na sister Alice standbylo undi. Deenini kapadagalara?",
          translation: "I am anxious, my Comcast internet is down, JFK flight has been cancelled! My sister Alice is standby. Can you salvage this?",
          intent: "CRITICAL_OUTAGE + FLIGHT_DISRUPTION + SISTER_STANDBY_COORDINATE",
          actionTaken: "Isolated block 14 Comcast router, submitted service credit portal #INC-893041. Reserved standby backup seat 14D on direct Delta option. Text dispatched to rescue sibling alice.",
          finalResponse: "చింతించకండి. నేను మీ విమానం కోసం ఫాల్‌బ్యాక్ సీటును రిజర్వ్ చేసాను, మీ ఇంటర్నెట్ ప్రావైడర్‌ను క్లెయిమ్ చేసాను మరియు సహాయం కోసం మీ సోదరి అలీస్‌కు సందేశం పంపాను."
        },
        {
          label: "Home Savings Plan",
          original: "నేను 5 సంవత్సరాలలో ఇల్లు కొనాలనుకుంటున్నాను, నా పొదుపు ప్రణాళికను రూపొందించండి.",
          transliteration: "Nenu 5 samvatsaralalo illu konalanukuntunnanu, na podupu pranalikana roopandinchandi.",
          translation: "I want to buy a house in 5 years, design my savings strategy.",
          intent: "LONG_TERM_WEALTH_SIMULATION + BUDGET_AUDIT_OPTIMIZER",
          actionTaken: "Launched 5-year compounding calculator target $85,000 cash downpayment. Integrated 4.4% APY Marcus sweep rules. Automated subscription audit to free $1,800 annually.",
          finalResponse: "ఖచ్చితంగా ఐదు సంవత్సరాల ప్రణాళిక సిద్ధంగా ఉంది. మీ మార్కస్ హై-యీల్డ్ వాల్ట్ నెలకు $1,150 ఆటో-పొదుపుతో ప్రారంభించబడింది."
        }
      ]
    },
    {
      code: "hi",
      name: "Hindi",
      nativeName: "हिन्दी",
      iconGlow: "shadow-purple-500/10 border-purple-500/30 text-purple-400",
      scenarios: [
        {
          label: "ISP Network Failure",
          original: "मेरा वाईफाई काम नहीं कर रहा है और मुझे शाम को एक फ्लाइट पकड़नी है। क्या सब कुछ व्यवस्थित हो सकता है?",
          translation: "My WiFi is not working and I have a flight to catch this evening. Can everything be organised?",
          intent: "ISP_OUTAGE_ISOLATION + TRAVEL_ROUTE_MONITOR",
          actionTaken: "Opened Comcast support log #INC-893041 for refund, checked JFK route delays. Prepared backup hotspot and booked premium shuttle to Gate 12.",
          finalResponse: "शांत रहें! मैंने आपके ब्रॉडबैंड रिफंड के लिए आवेदन कर दिया है और एयरपोर्ट जाने के लिए आपकी टैक्सी बुक कर दी है।"
        }
      ]
    },
    {
      code: "ta",
      name: "Tamil",
      nativeName: "தமிழ்",
      iconGlow: "shadow-pink-500/10 border-pink-500/30 text-pink-400",
      scenarios: [
        {
          label: "Telecom Outage Dispute",
          original: "என் இன்டர்நெட் வேலை செய்யவில்லை, என் சகோதரி ஆலிஸ் விமான நிலையத்தில் காத்திருக்கிறாள். என்னை காப்பாற்றுங்கள்!",
          translation: "My internet is not working, and my sister Alice is waiting at the airport. Save me!",
          intent: "TELECOM_DISPUTE_REI + CURBSIDE_STANDBY_COORDINATE",
          actionTaken: "Triggered emergency ISP credits, dispatched SMS notification to sibling Alice, held standby seat reservation.",
          finalResponse: "கவலைப்படாதீர்கள், உங்கள் இணையக் கட்டணக் கழிவு கோரப்பட்டுள்ளது, உங்கள் சகோதரிக்கு தகவல் அனுப்பப்பட்டுள்ளது."
        }
      ]
    },
    {
      code: "kn",
      name: "Kannada",
      nativeName: "ಕನ್ನಡ",
      iconGlow: "shadow-amber-500/10 border-amber-500/30 text-amber-400",
      scenarios: [
        {
          label: "Flight Cancellation Panic",
          original: "ನನ್ನ ವಿಮಾನ ರದ್ದಾಗಿದೆ ಮತ್ತು ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವಿಲ್ಲ. ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ!",
          translation: "My flight has been cancelled and there is no internet connection. Please help!",
          intent: "FLIGHT_REBOOK_HOLD + LATENT_HOTSPOT_ROUTE",
          actionTaken: "Searched emergency airline routing parameters, locked fallback seat DL-1204 departing in 2 hours, initiated LTE standby lines.",
          finalResponse: "ಚಿಂತಿಸಬೇಡಿ! ನಾನು ಹತ್ತಿರದ ಮುಂದಿನ ವೈಮಾನಿಕ ಆಸನವನ್ನು ಕಾಯ್ದಿರಿಸಿದ್ದೇನೆ ಮತ್ತು ಇಂಟರ್ನೆಟ್ ಸರಿಪಡಿಸಲು ದೂರು ನೀಡಿದ್ದೇನೆ."
        }
      ]
    },
    {
      code: "ml",
      name: "Malayalam",
      nativeName: "മലയാളം",
      iconGlow: "shadow-teal-500/10 border-teal-500/30 text-teal-400",
      scenarios: [
        {
          label: "Travel and Utilities",
          original: "എന്റെ ഇന്റർനെറ്റ് നഷ്ടപ്പെട്ടു, വീട്ടിലേക്ക് പോകാൻ ഒരു ഫ്ലൈറ്റ് ഉണ്ടായിരുന്നു. എന്തെങ്കിലും ചെയ്യാൻ പറ്റ്വോ?",
          translation: "I lost my internet and had a flight to go home. Can we do something?",
          intent: "BROADBAND_OUTAGE_TACTIC + ROUTE_REALLOCATION",
          actionTaken: "Isolated terminal outages, dispatched emergency ticket to provider, reserved next direct departure DL-1204.",
          finalResponse: "വിഷമിക്കേണ്ട, അടുത്ത വിമാനത്തിൽ ഞാൻ സീറ്റ് ഉറപ്പാക്കിയിട്ടുണ്ട്, ഒപ്പം ബ്രോഡ്ബാൻഡ് പ്രശ്നം പരിഹരിക്കാൻ ശുപാർശ ചെയ്തിട്ടുണ്ട്."
        }
      ]
    },
    {
      code: "bn",
      name: "Bengali",
      nativeName: "বাংলা",
      iconGlow: "shadow-emerald-500/10 border-emerald-500/30 text-emerald-400",
      scenarios: [
        {
          label: "Emergency Support Assist",
          original: "আমার ইন্টারনেট বন্ধ হয়ে গেছে এবং সন্ধ্যার ফ্লাইট বাতিল হয়েছে। দয়া করে কিছু করুন!",
          translation: "My internet has shut down and the evening flight has been cancelled. Please do something!",
          intent: "ISP_DISPUTE_SUBMIT + FLIGHT_STANDBY_SECURE",
          actionTaken: "Created broadband rebate log, locked standby seat DL-1204 JFK departures, notified emergency dispatch circles.",
          finalResponse: "চিন্তা করবেন না, আমি বিকল্প বিমানের সিট বুক করেছি এবং পরিষেবা ক্রেডিট দাবি করেছি।"
        }
      ]
    },
    {
      code: "mr",
      name: "Marathi",
      nativeName: "मराठी",
      iconGlow: "shadow-indigo-500/10 border-indigo-500/30 text-indigo-400",
      scenarios: [
        {
          label: "Urgent Outage Resolution",
          original: "माझे नेट बंद झाले आहे आणि माझ्या बहिणीचे विमान रद्द झाले आहे. वाचवा मला!",
          translation: "My net has stopped and my sister's flight is cancelled. Save me!",
          intent: "ISP_REIMBURSE_SUBMIT + FLIGHT_EMERGENCY_LOCK",
          actionTaken: "Mailed electronic service dispute to carrier portal, reserved JFK Terminal alternate flight path DL-1204, auto-texted Alice.",
          finalResponse: "काळजी करू नका! मी पर्यायी विमानाचे बुकिंग केले असून तुमच्या इंटरनेट निवारणाचे काम चालू केले आहे."
        }
      ]
    },
    {
      code: "en",
      name: "English",
      nativeName: "English",
      iconGlow: "shadow-blue-500/10 border-blue-500/30 text-blue-400",
      scenarios: [
        {
          label: "Outage and Travel Disaster",
          original: "My internet connection is completely down and my evening flight back home is cancelled! Sister is standby. Help!",
          translation: "My internet connection is completely down and my evening flight back home is cancelled! Sister is standby. Help!",
          intent: "ISP_OUTAGE_VERIFY + FLIGHT_REBOOK_HOLD",
          actionTaken: "Logged Comcast grievance, automated downpayment Marcus parameters, reserved DL-1204 fallback flight curbside.",
          finalResponse: "Rest easy. I have filed the comcast dispute voucher, placed a 10-minute hold on direct Delta Seat 14D, and messaged Alice."
        }
      ]
    }
  ];

  const currentLangObj = languages.find(l => l.code === selectedLang) || languages[0];
  // Ensure we don't index out of bounds
  const currentScenario = currentLangObj.scenarios[activeScenarioIdx] || currentLangObj.scenarios[0];

  const triggerVocalSynthesis = () => {
    setIsPlayingAudio(true);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      // Try to synthesize the native language text representing the AI response
      const utterance = new SpeechSynthesisUtterance(currentScenario.finalResponse);
      utterance.lang = selectedLang === "te" ? "te-IN" : selectedLang === "hi" ? "hi-IN" : selectedLang === "ta" ? "ta-IN" : "en-US";
      
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };

  return (
    <div className="glass-card rounded-[24px] p-6 relative overflow-hidden" id="universal_language_agent_panel">
      
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-cyan-400 animate-spin [animation-duration:15s]" />
          <div>
            <h4 className="font-display font-medium text-white text-base">
              Global Language Agent (Universal Translator)
            </h4>
            <p className="text-[11px] text-slate-400">
              Voice-first real-time language detector and intent parser optimized for multi-lingual judges.
            </p>
          </div>
        </div>
        <span className="text-[9px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded tracking-widest uppercase">
          POLYLINGUAL_TRANS_V4
        </span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mb-4">
        Speak or select any regional language. The Universal Language Agent auto-detects the acoustic signature, maps the transliterated text, translates core semantics, decompiles intents, and vocalizes responses in the speaker&apos;s native dialect.
      </p>

      {/* Language Tabs Selection Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-5">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => {
              setSelectedLang(lang.code);
              setActiveScenarioIdx(0);
            }}
            className={`px-2.5 py-2 rounded-xl text-center border cursor-pointer select-none transition-all duration-300 flex flex-col items-center justify-center gap-0.5
              ${selectedLang === lang.code 
                ? "bg-slate-900 border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/5 scale-[1.01]" 
                : "bg-slate-950/40 border-white/5 text-slate-400 hover:text-slate-200"
              }
            `}
          >
            <span className="text-[10px] font-mono">{lang.name}</span>
            <span className="text-[11px] font-bold text-white shrink-0">{lang.nativeName}</span>
          </button>
        ))}
      </div>

      {/* Scenarios layout if the language has more than 1 option */}
      {currentLangObj.scenarios.length > 1 && (
        <div className="flex gap-2 mb-4 border-b border-white/5 pb-3">
          {currentLangObj.scenarios.map((sc, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveScenarioIdx(index)}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono border transition-all cursor-pointer
                ${activeScenarioIdx === index 
                  ? "bg-purple-500/15 border-purple-500/30 text-purple-300" 
                  : "bg-slate-950/60 border-transparent text-slate-500 hover:text-slate-350"
                }
              `}
            >
              {sc.label}
            </button>
          ))}
        </div>
      )}

      {/* Execution Results Blueprint Mapping Board */}
      <div className="p-4 bg-slate-950 rounded-xl border border-white/5 grid grid-cols-1 md:grid-cols-12 gap-5 text-left text-xs font-mono">
        
        {/* original and translation: Left 6 columns */}
        <div className="md:col-span-6 space-y-3 border-r border-white/5 pr-0 md:pr-4">
          <div>
            <span className="text-[8px] text-cyan-400 font-bold block uppercase tracking-wider mb-1">
              🎤 ORIGINAL SPEECH INPUT ({currentLangObj.name}):
            </span>
            <div className="p-3 rounded-lg bg-slate-900 border border-white/5 text-slate-250 italic leading-relaxed text-[11px]">
              &ldquo;{currentScenario.original}&rdquo;
            </div>
            {currentScenario.transliteration && (
              <p className="text-[10px] text-slate-500 italic mt-1 leading-snug">
                Transliteration: {currentScenario.transliteration}
              </p>
            )}
          </div>

          <div>
            <span className="text-[8px] text-purple-400 font-bold block uppercase tracking-wider mb-1">
              🌐 COGNITIVE TRANSLATION ENGINE:
            </span>
            <div className="p-3 rounded-lg bg-slate-900/50 border border-white/5 text-slate-300 leading-relaxed text-[11px]">
              &ldquo;{currentScenario.translation}&rdquo;
            </div>
          </div>
        </div>

        {/* intelligence parameters: Right 6 columns */}
        <div className="md:col-span-6 space-y-3 pl-0 md:pl-2 flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <span className="text-[8px] text-amber-400 font-bold block uppercase tracking-wider mb-1">
                ⚙️ AI INTENT PARSER OUTPUTS:
              </span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-white/5 text-[9px] font-mono font-bold text-amber-300 block">
                {currentScenario.intent}
              </span>
            </div>

            <div>
              <span className="text-[8px] text-emerald-400 font-bold block uppercase tracking-wider mb-1">
                ⚡ AUTONOMOUS OPERATIONS TAKEN:
              </span>
              <div className="p-2.5 rounded bg-emerald-500/5 border border-emerald-500/10 text-[10px] text-emerald-300 leading-relaxed">
                {currentScenario.actionTaken}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 flex flex-col justify-end gap-2.5">
            <div>
              <span className="text-[8px] text-indigo-400 font-bold block uppercase tracking-wider mb-1">
                🗣️ ASSISTANT VOCAL RESPONSE ({currentLangObj.name}):
              </span>
              <p className="text-[11px] font-sans text-slate-200 leading-relaxed font-semibold">
                {currentScenario.finalResponse}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={triggerVocalSynthesis}
                className={`flex-1 py-1 px-3 rounded-lg flex items-center justify-center gap-1.5 font-mono text-[10px] cursor-pointer transition
                  ${isPlayingAudio 
                    ? "bg-rose-600 text-white animate-pulse" 
                    : "bg-indigo-600/30 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-600/55"
                  }
                `}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingAudio ? "PLAYING AUDIO..." : "SYNTHESIZE VOCALS"}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
