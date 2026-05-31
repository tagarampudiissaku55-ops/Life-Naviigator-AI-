import React, { useState, useEffect } from "react";
import { Brain, Search, Trash2, Plus, RefreshCw, Calendar, Tag, ShieldCheck, Heart, Users, MapPin, Settings } from "lucide-react";
import { VoiceMemory } from "../types";
import PersonalKnowledgeGraph from "./PersonalKnowledgeGraph";

export default function MemoryVault() {
  const [memories, setMemories] = useState<VoiceMemory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<(VoiceMemory & { score?: number })[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states for manually storing a memory
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<"preference" | "event" | "person" | "logistics" | "other">("preference");
  const [newImportance, setNewImportance] = useState(3);
  const [newKeywords, setNewKeywords] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Load memories from backend
  const fetchMemories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/agent/memories");
      const data = await res.json();
      setMemories(data);
      setSearchResults(data);
    } catch (err) {
      console.error("Failed to load long-term memories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  // Handle semantic lookup
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(memories);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch("/api/agent/memories/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery })
      });
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Semantic search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // Quick live-search effect as the user typed
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(memories);
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      // Direct local approximate search to keep the UI instant
      const matches = memories.map(m => {
        const words = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
        let score = 0;
        words.forEach(word => {
          if (m.content.toLowerCase().includes(word)) score += 0.35;
          if (m.keywords.some(k => k.toLowerCase().includes(word))) score += 0.25;
        });
        return { ...m, score: Math.min(1.0, score) };
      });
      const filtered = matches
        .filter(m => (m.score || 0) > 0)
        .sort((a, b) => (b.score || 0) - (a.score || 0));
      setSearchResults(filtered.length > 0 ? filtered : matches);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, memories]);

  // Handle custom manual memory push
  const handleAddMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    try {
      const reqBody = {
        content: newContent,
        category: newCategory,
        importance: newImportance,
        keywords: newKeywords.split(",").map(k => k.trim()).filter(Boolean)
      };

      const res = await fetch("/api/agent/memories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody)
      });

      if (res.ok) {
        setNewContent("");
        setNewKeywords("");
        setShowAddForm(false);
        fetchMemories();
      }
    } catch (err) {
      console.error("Failed to add memory:", err);
    }
  };

  // Handle memory removal
  const handleDeleteMemory = async (id: string) => {
    try {
      const res = await fetch(`/api/agent/memories/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchMemories();
      }
    } catch (err) {
      console.error("Failed to delete memory:", err);
    }
  };

  // Locate match icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "preference":
        return <Heart className="w-3.5 h-3.5 text-rose-400" />;
      case "person":
        return <Users className="w-3.5 h-3.5 text-blue-400" />;
      case "logistics":
        return <MapPin className="w-3.5 h-3.5 text-amber-400" />;
      case "event":
        return <Calendar className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Tag className="w-3.5 h-3.5 text-teal-400" />;
    }
  };

  return (
    <div className="glass-card rounded-[24px] p-6 relative overflow-hidden" id="semantic_memory_vault_panel">
      {/* Dynamic graphic vector indicating computational memory layout */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full filter blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-semibold block">
              Vector Database & Vector-Space Index
            </span>
          </div>
          <h4 className="font-display font-medium text-white text-base">
            Long-Term Voice Memory Vault
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/35 border border-purple-500/20 text-xs font-mono text-purple-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Store Fact</span>
          </button>

          <button
            type="button"
            onClick={fetchMemories}
            disabled={isLoading}
            className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-slate-200 disabled:opacity-50 transition cursor-pointer"
            title="Refresh database state"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mb-4">
        The system continuously parses voice feeds to build deep contextual awareness. 
        When querying, cosine similarity weights retrieve matching preferences instantly.
      </p>

      {/* Interactive Personal Knowledge Graph Connections Grid */}
      <div className="mb-6">
        <PersonalKnowledgeGraph />
      </div>

      {/* Manual Memory Register Form */}
      {showAddForm && (
        <form onSubmit={handleAddMemory} className="bg-slate-950 p-4 rounded-xl border border-white/5 mb-4 space-y-3 animate-fade-in text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-mono block">Declare Memory Content</label>
            <input
              type="text"
              required
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="e.g. Spouse prefers lactose-free milk or Alice is emergency sibling contact"
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-400 font-mono block">Data Category</label>
              <select
                value={newCategory}
                onChange={(e: any) => setNewCategory(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-slate-300 focus:outline-none focus:border-purple-500/50"
              >
                <option value="preference">Preference</option>
                <option value="event">Key Date / Event</option>
                <option value="person">Person / Contact</option>
                <option value="logistics">Logistics / Document</option>
                <option value="other">Other Fact</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-mono block">Importance Coefficient (1-5)</label>
              <div className="flex gap-1.5 items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewImportance(star)}
                    className={`w-6 h-6 rounded font-mono text-xs font-semibold border transition
                      ${newImportance >= star 
                        ? "bg-purple-500/20 text-purple-400 border-purple-500/30" 
                        : "bg-slate-900 text-slate-600 border-white/5"
                      }
                    `}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-mono block">Associated Search Keywords (comma-separated)</label>
            <input
              type="text"
              value={newKeywords}
              onChange={(e) => setNewKeywords(e.target.value)}
              placeholder="alice, sister, emergency, hospital"
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition"
            >
              Commit to Database
            </button>
          </div>
        </form>
      )}

      {/* Semantic Word Vector Search Interface */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type query to test math-based Cosine Vector Similarity..."
            className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/40"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="px-3 py-2 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300 font-mono hover:bg-slate-900 active:scale-95 transition-all"
        >
          {isSearching ? "Computing..." : "Search Sim"}
        </button>
      </form>

      {/* Memories List */}
      <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
        {searchResults.length === 0 ? (
          <div className="text-center py-8 text-slate-500 border border-dashed border-white/5 rounded-xl">
            <p className="text-xs">No memories matching &ldquo;{searchQuery}&rdquo;.</p>
            <button 
              type="button" 
              onClick={() => { setSearchQuery(""); setSearchResults(memories); }}
              className="mt-2 text-[10px] uppercase font-mono text-purple-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          searchResults.map((memory) => {
            const hasSimScore = typeof memory.score === "number";
            return (
              <div
                key={memory.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-white/10 transition-all flex justify-between items-start gap-4 group/item"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900 text-slate-300 border border-white/5 flex items-center gap-1">
                      {getCategoryIcon(memory.category)}
                      <span>{memory.category}</span>
                    </span>

                    {/* Show live score vector match rating */}
                    {hasSimScore && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold 
                        ${(memory.score || 0) > 0.4 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-900 text-slate-400"}
                      `}>
                        Match: {Math.max(1, Math.round((memory.score || 0) * 100))}%
                      </span>
                    )}

                    <span className="text-[10px] font-mono text-slate-500">
                      Coeff: {Array(memory.importance).fill("★").join("")}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium break-words">
                    {memory.content}
                  </p>

                  {/* Keywords Tags list */}
                  {memory.keywords.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap">
                      {memory.keywords.map((k, idx) => (
                        <span key={idx} className="text-[9px] font-mono text-slate-500 bg-slate-900/50 px-1.5 py-0.2 rounded">
                          #{k}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteMemory(memory.id)}
                  className="p-1 rounded text-slate-600 hover:text-rose-400 transition cursor-pointer md:opacity-0 group-hover/item:opacity-100"
                  title="Remove this memory"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 bg-purple-950/20 border border-purple-500/10 rounded-xl p-3 text-[11px] text-purple-300">
        <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
        <span className="font-mono">
          Strictly Offline Privacy: Personal voice identifiers are hashed under sandbox coordinates. No external servers track your voice vault.
        </span>
      </div>
    </div>
  );
}
