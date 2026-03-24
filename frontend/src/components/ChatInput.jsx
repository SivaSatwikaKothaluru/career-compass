import { useState, useRef, useCallback } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="flex-shrink-0 px-4 py-3 bg-white border-t border-slate-200/80">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Ask about careers, skills, roadmaps…"
            rows={1}
            className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 focus:bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed leading-relaxed"
            style={{ minHeight: "46px", maxHeight: "140px" }}
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!canSend}
          className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-150 shadow-md hover:shadow-indigo-200 active:scale-95"
          aria-label="Send message"
        >
          <svg className="w-5 h-5 text-white translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>

      <p className="text-center text-[10px] text-slate-400 mt-2 select-none">
        <kbd className="bg-slate-100 border border-slate-300 rounded px-1 py-px font-mono text-[10px]">Enter</kbd>
        {" "}to send &nbsp;·&nbsp;{" "}
        <kbd className="bg-slate-100 border border-slate-300 rounded px-1 py-px font-mono text-[10px]">Shift+Enter</kbd>
        {" "}for new line
      </p>
    </div>
  );
}