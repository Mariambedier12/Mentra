"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { getTodos, getTomorrowReminder } from "../todo/_services/todo.service";

export default function ReminderWatcher() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const token = (session?.user as any)?.token;

  const [message, setMessage] = useState<string | null>(null);
  const [dismissedMessages, setDismissedMessages] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("reminder_dismissed_messages");
        if (stored) {
          setDismissedMessages(JSON.parse(stored));
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Reset dismissed reminders list every 5 minutes to show them again if tasks remain unfinished
    const interval = setInterval(() => {
      setDismissedMessages([]);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("reminder_dismissed_messages");
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (status !== "authenticated" || !token || pathname === "/study-session") return;

    async function checkReminders() {
      try {
        const now = new Date();
        const localDate = new Date(
          now.getTime() - now.getTimezoneOffset() * 60000
        );
        const yyyy = localDate.getFullYear();
        const mm = String(localDate.getMonth() + 1).padStart(2, '0');
        const dd = String(localDate.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;

        // 1. Check today's tasks
        const data = await getTodos(token);
        const todos = Array.isArray(data)
          ? data
          : data.data || [];

        const todayUnfinished = todos.filter((todo: any) => {
          if (todo.isCompleted) return false;
          if (!todo.dueDate) return false;
          return todo.dueDate.substring(0, 10) === todayStr;
        });

        if (todayUnfinished.length > 0) {
          if (todayUnfinished.length === 1) {
            setMessage(`You have a pending task today: "${todayUnfinished[0].title}". Do not forget to complete it!`);
          } else {
            const taskTitles = todayUnfinished.map((t: any) => `"${t.title}"`).join(", ");
            setMessage(`You have ${todayUnfinished.length} pending tasks today: ${taskTitles}. Do not forget to complete them!`);
          }
          return; // Skip tomorrow check if today has reminders
        }

        // 2. Check tomorrow's reminder from API
        try {
          const tomorrowData = await getTomorrowReminder(token);
          const tomorrowTodos = Array.isArray(tomorrowData)
            ? tomorrowData
            : tomorrowData.data || [];

          const tomorrowUnfinished = tomorrowTodos.filter((todo: any) => !todo.isCompleted);

          if (tomorrowUnfinished.length > 0) {
            if (tomorrowUnfinished.length === 1) {
              setMessage(`You have a task scheduled for tomorrow: "${tomorrowUnfinished[0].title}"!`);
            } else {
              const tomorrowTitles = tomorrowUnfinished.map((t: any) => `"${t.title}"`).join(", ");
              setMessage(`You have ${tomorrowUnfinished.length} tasks scheduled for tomorrow: ${tomorrowTitles}!`);
            }
          } else {
            setMessage(null);
          }
        } catch (tomorrowErr) {
          console.error("Error fetching tomorrow reminder in ReminderWatcher:", tomorrowErr);
          setMessage(null);
        }

      } catch (err) {
        console.error("Error in ReminderWatcher:", err);
      }
    }

    checkReminders();
  }, [status, token, pathname]);

  const handleDismiss = () => {
    if (!message) return;
    const nextDismissed = [...dismissedMessages, message];
    setDismissedMessages(nextDismissed);
    sessionStorage.setItem("reminder_dismissed_messages", JSON.stringify(nextDismissed));
  };

  // Auto-dismiss after 30 seconds
  useEffect(() => {
    if (message && !dismissedMessages.includes(message)) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, 30000); // 30 seconds
      return () => clearTimeout(timer);
    }
  }, [message, dismissedMessages]);

  if (pathname === "/study-session" || !message || dismissedMessages.includes(message)) return null;

  return (
    <div 
      className="fixed right-6 bottom-6 z-50 transition-all duration-500 transform translate-y-0"
      style={{
        background: "#091A58",
        borderRadius: "16px",
        padding: "1.25rem",
        color: "#FAF9F7",
        width: "360px",
        boxShadow: "0 20px 25px -5px rgba(9, 26, 88, 0.25), 0 10px 10px -5px rgba(9, 26, 88, 0.15)",
        border: "1.5px solid rgba(250, 249, 247, 0.15)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#E1E2EC", opacity: 0.8 }}>
          🔔 Task Reminder
        </span>
        <button 
          onClick={handleDismiss}
          style={{
            background: "transparent",
            border: "none",
            color: "#FAF9F7",
            cursor: "pointer",
            fontSize: "16px",
            opacity: 0.7,
            padding: 0,
            lineHeight: 1
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}
        >
          ✕
        </button>
      </div>
      <p style={{ fontSize: "14px", lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
        {message}
      </p>
      {/* Visual countdown progress line */}
      <div style={{ height: "3px", background: "rgba(250, 249, 247, 0.2)", borderRadius: "99px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: "#10b981",
          width: "100%",
          animation: "countdown 30s linear forwards"
        }} />
      </div>
      {/* CSS Animation keyframes */}
      <style>{`
        @keyframes countdown {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}