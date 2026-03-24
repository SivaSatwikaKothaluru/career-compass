import { useState, useCallback } from "react";
import { sendChatMessage } from "../utils/api.js";

const INITIAL_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content: `Hi there! 👋 I'm **CareerCompass** — your personal AI career counselor.\n\nI'm here to help you navigate your academic journey, explore career options, build skill roadmaps, and make confident decisions about your future.\n\nWhether you're a first-year student exploring options or a final-year student prepping for placements — I've got you.\n\nWhat's on your mind today?`,
  timestamp: new Date(),
};

export function useChat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      setError(null);

      const userMsg = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      const history = [...messages, userMsg]
        .filter((m) => m.id !== "welcome")
        .map(({ role, content }) => ({ role, content }));

      try {
        const data = await sendChatMessage(history);
        const botMsg = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: data.content,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setIsTyping(false);
      }
    },
    [messages, isTyping]
  );

  const clearChat = useCallback(() => {
    setMessages([{ ...INITIAL_MESSAGE, timestamp: new Date() }]);
    setError(null);
  }, []);

  const dismissError = useCallback(() => setError(null), []);

  return { messages, isTyping, error, sendMessage, clearChat, dismissError };
}