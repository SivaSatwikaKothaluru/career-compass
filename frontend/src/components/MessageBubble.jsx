import BotMessage from "./BotMessage.jsx";

const BOT_AVATAR = (
  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm ring-2 ring-white">
    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
      <path d="M12 4 L13.5 9 L12 10.5 L10.5 9 Z" fill="white" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="white" stroke="none" />
    </svg>
  </div>
);

const USER_AVATAR = (
  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center shadow-sm ring-2 ring-white">
    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  </div>
);

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-end gap-2.5 animate-fade-up ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {isUser ? USER_AVATAR : BOT_AVATAR}

      <div className={`group relative max-w-[78%] md:max-w-[72%] lg:max-w-[65%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div className={`px-4 py-3 rounded-2xl shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-br-sm"
            : "bg-white border border-slate-200/80 rounded-bl-sm"
        }`}>
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <BotMessage content={message.content} />
          )}
        </div>

        <span className={`text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity px-1 ${isUser ? "text-right" : "text-left"}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}