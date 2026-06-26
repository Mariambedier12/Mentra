"use client";

import { useState, useEffect, useRef } from "react";
import { BotMessageSquare, Send, X } from "lucide-react";
import { useSession } from "next-auth/react";

const BASE_URL = "http://mentraa.runasp.net";

type ChatMessage = {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
};

export default function ChatBot({ onClose, documentId }: { onClose: () => void; documentId: number }) {
  const { data: session } = useSession();
  const token = (session as any)?.user?.token;
  const [chatSessionId, setChatSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "bot-1",
      sender: "bot",
      text: "Hello! Ask me anything about your lecture 📚",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ابدأ الـ chat session
  useEffect(() => {
    if (!token || !documentId) return;
    fetch(`${BASE_URL}/api/Chat/start`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ documentId }),
    })
      .then((res) => res.json())
      .then((data) => { if (data.sessionId) setChatSessionId(data.sessionId); })
      .catch(() => { });
  }, [token, documentId]);

  const smoothScrollToBottom = (duration = 650) => {
    const container = scrollRef.current;
    if (!container) return;
    const start = container.scrollTop;
    const end = container.scrollHeight - container.clientHeight;
    const change = end - start;
    if (change === 0) return;
    const startTime = performance.now();
    const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollTop = Math.round(start + change * easeInOutQuad(progress));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const id = setTimeout(() => smoothScrollToBottom(650), 0);
    return () => clearTimeout(id);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      const response = await fetch(`${BASE_URL}/api/Chat/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: chatSessionId,
          message: userMessage.text,
        }),
      });

      const data = await response.json();
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.reply || data.message || "Sorry, I couldn't respond right now.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-error-${Date.now()}`,
          sender: "bot",
          text: "Something went wrong. Please try again.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "760px", margin: "0 auto", borderRadius: "28px", overflow: "hidden", background: "#FFFFFF", boxShadow: "0 30px 80px rgba(15, 23, 42, 0.15)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 28px", background: "#FFFFFF" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#0F1F5C", display: "grid", placeItems: "center", color: "#FFFFFF" }}>
            <BotMessageSquare size={20} />
          </div>
          <p style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#0F172A" }}>Chat Bot</p>
        </div>
        <button type="button" style={{ width: "40px", height: "40px", borderRadius: "999px", border: "1px solid rgba(15, 23, 42, 0.12)", background: "#FFFFFF", display: "grid", placeItems: "center", cursor: "pointer" }} onClick={onClose}>
          <X size={18} color="#0F172A" />
        </button>
      </div>

      <div ref={scrollRef} style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", minHeight: "400px", maxHeight: "500px", overflowY: "auto", boxSizing: "border-box" }}>
        <div style={{ display: "inline-flex", background: "#E9EEFF", borderRadius: "999px", padding: "8px 18px", fontSize: "12px", fontWeight: 700, color: "#5668E2", marginBottom: "24px", alignSelf: "center" }}>
          Today
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px", width: "100%" }}>
          {messages.map((message) => (
            <div key={message.id} style={{ display: "flex", justifyContent: message.sender === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "78%", padding: "18px 20px", borderRadius: "24px", background: message.sender === "user" ? "#0F1F5C" : "#F3F4F6", color: message.sender === "user" ? "#FFFFFF" : "#0F172A", boxShadow: message.sender === "user" ? "0 18px 30px rgba(15, 23, 42, 0.16)" : "none" }}>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.8 }}>{message.text}</p>
                <div style={{ marginTop: "10px", textAlign: "right", fontSize: "11px", color: message.sender === "user" ? "rgba(255,255,255,0.72)" : "#64748B" }}>
                  {message.time}
                </div>
              </div>
            </div>
          ))}
          {sending && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "18px 20px", borderRadius: "24px", background: "#F3F4F6", color: "#9ca3af", fontSize: "15px" }}>
                Typing...
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: "22px 24px 24px", background: "#FFFFFF", display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
          placeholder="Ask anything about your lecture..."
          style={{ flex: 1, minHeight: "54px", borderRadius: "999px", border: "1px solid #E5E7EB", padding: "0 20px", fontSize: "15px", outline: "none", background: "#F9FAFB", color: "#0F172A" }}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={sending || !input.trim()}
          style={{ width: "52px", height: "52px", borderRadius: "50%", border: "none", background: "#0F1F5C", color: "#FFFFFF", display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "0 12px 24px rgba(15, 23, 42, 0.18)" }}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}