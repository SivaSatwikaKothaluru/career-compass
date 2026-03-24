import { useState, useEffect } from "react";
import { checkHealth } from "../utils/api.js";

export default function Header({ onClear }) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    checkHealth().then(setIsOnline);
  }, []);

  return (
    <header className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 shadow-lg flex-shrink-0">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
          <path d="M12 4 L13.5 9 L12 10.5 L10.5 9 Z" fill="white" stroke="none" />
          <path d="M12 20 L10.5 15 L12 13.5 L13.5 15 Z" fill="rgba(255,255,255,0.5)" stroke="none" />
          <circle cx="12" cy="12" r="1.5" fill="white" stroke="none" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <h1 className="text-white font-semibold text-base leading-tight tracking-tight truncate">
          CareerCompass
        </h1>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            isOnline === null ? "bg-yellow-300 animate-pulse" :
            isOnline ? "bg-emerald-400 animate-pulse" : "bg-red-400"
          }`} />
          <span className="text-indigo-200 text-xs truncate">
            {isOnline === null ? "Connecting…" :
             isOnline ? "AI Counselor • Online" : "Server offline — check backend"}
          </span>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-lg px-2.5 py-1 ring-1 ring-white/10">
        <svg className="w-3 h-3 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="text-xs text-indigo-200 font-medium">Groq · Llama 3</span>
      </div>

      <button
        onClick={onClear}
        title="Clear conversation"
        className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ring-1 ring-white/10 group"
      >
        <svg className="w-4 h-4 text-indigo-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </header>
  );
}