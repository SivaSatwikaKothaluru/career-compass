import { useChat } from "./hooks/useChat.js";
import Header from "./components/Header.jsx";
import MessageList from "./components/MessageList.jsx";
import QuickReplies from "./components/QuickReplies.jsx";
import ChatInput from "./components/ChatInput.jsx";
import ErrorBanner from "./components/ErrorBanner.jsx";

export default function App() {
  const { messages, isTyping, error, sendMessage, clearChat, dismissError } = useChat();

  const userHasSentMessage = messages.some((m) => m.role === "user");

  const handleSend = (text) => {
    sendMessage(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-indigo-50/60 to-slate-200 flex items-center justify-center p-0 md:p-6">
      <div className="w-full max-w-2xl h-screen md:h-[88vh] md:max-h-[820px] bg-white md:rounded-2xl shadow-2xl shadow-indigo-200/30 flex flex-col overflow-hidden border border-slate-200/60 md:border">
        <Header onClear={clearChat} />
        <MessageList messages={messages} isTyping={isTyping} />
        <QuickReplies
          onSelect={handleSend}
          visible={!userHasSentMessage && !isTyping}
        />
        <ErrorBanner message={error} onDismiss={dismissError} />
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}