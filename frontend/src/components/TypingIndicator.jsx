export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 animate-fade-up">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm ring-2 ring-white">
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
          <path d="M12 4 L13.5 9 L12 10.5 L10.5 9 Z" fill="white" stroke="none" />
          <circle cx="12" cy="12" r="1.5" fill="white" stroke="none" />
        </svg>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1 h-4">
          <span className="typing-dot w-2 h-2 rounded-full bg-indigo-400 block" />
          <span className="typing-dot w-2 h-2 rounded-full bg-indigo-400 block" />
          <span className="typing-dot w-2 h-2 rounded-full bg-indigo-400 block" />
        </div>
      </div>

      <span className="text-xs text-slate-400 mb-1">CareerCompass is thinking…</span>
    </div>
  );
}