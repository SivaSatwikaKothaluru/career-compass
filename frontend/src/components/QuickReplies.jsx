const QUICK_REPLIES = [
  { id: "tech-roadmap", icon: "🗺️", label: "Tech Roadmap", text: "Can you suggest a complete tech career roadmap for a beginner with no prior experience?" },
  { id: "non-tech", icon: "💼", label: "Non-Tech Options", text: "What are the best non-tech career options available for a student after graduation?" },
  { id: "ai-ml", icon: "🤖", label: "Break into AI/ML", text: "How do I start a career in Artificial Intelligence and Machine Learning from scratch?" },
  { id: "certifications", icon: "🎓", label: "Best Certifications", text: "Which certifications are most valuable for landing a job in 2026?" },
  { id: "resume", icon: "📄", label: "Resume Tips", text: "How do I build a strong resume as a fresher with no work experience?" },
  { id: "freelancing", icon: "🌐", label: "Start Freelancing", text: "How can I start freelancing as a student and earn while studying?" },
  { id: "abroad", icon: "✈️", label: "Study Abroad", text: "How should I plan to study abroad for my Masters? What are the steps?" },
  { id: "placement", icon: "🏢", label: "Campus Placements", text: "How do I prepare for campus placements and crack top company interviews?" },
];

export default function QuickReplies({ onSelect, visible }) {
  if (!visible) return null;

  return (
    <div className="flex-shrink-0 border-t border-slate-200/80 bg-white/80 backdrop-blur-sm px-4 py-2.5">
      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-2">
        Quick Starters
      </p>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
        {QUICK_REPLIES.map((qr) => (
          <button
            key={qr.id}
            onClick={() => onSelect(qr.text)}
            className="flex-shrink-0 flex items-center gap-1.5 text-xs bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 text-indigo-700 border border-indigo-200 hover:border-indigo-300 rounded-full px-3 py-1.5 transition-all duration-150 hover:shadow-sm active:scale-95 font-medium whitespace-nowrap"
          >
            <span>{qr.icon}</span>
            <span>{qr.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}