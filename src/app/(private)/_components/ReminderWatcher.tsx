"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { getTodos, getTomorrowReminder } from "../todo/_services/todo.service";

export default function ReminderWatcher() {
  const { data: session, status } = useSession();
  const token = (session?.user as any)?.token;

  const [message, setMessage] = useState<string | null>(null);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this browser session
    const dismissed = sessionStorage.getItem("reminder_dismissed");
    if (dismissed === "true") {
      setIsClosed(true);
    }
  }, []);

  useEffect(() => {
    if (status !== "authenticated" || !token || isClosed) return;

    async function checkReminders() {
      try {
        const now = new Date();
        const localDate = new Date(
          now.getTime() - now.getTimezoneOffset() * 60000
        );
        const todayStr = localDate.toLocaleDateString("sv-SE"); // YYYY-MM-DD

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
            setMessage(`Reminder: You have a pending task today: "${todayUnfinished[0].title}". Do not forget to complete it! ⏰`);
          } else {
            const taskTitles = todayUnfinished.map((t: any) => `"${t.title}"`).join(", ");
            setMessage(`Reminder: You have ${todayUnfinished.length} pending tasks today: ${taskTitles}. Do not forget to complete them! ⏰`);
          }
          return; // Skip tomorrow check if today has reminders
        }

        // 2. Check tomorrow's reminder from API
        const tomorrowData = await getTomorrowReminder(token);
        const tomorrowTodos = Array.isArray(tomorrowData)
          ? tomorrowData
          : tomorrowData.data || [];

        const tomorrowUnfinished = tomorrowTodos.filter((todo: any) => !todo.isCompleted);

        if (tomorrowUnfinished.length > 0) {
          if (tomorrowUnfinished.length === 1) {
            setMessage(`Reminder for tomorrow: You have a task scheduled: "${tomorrowUnfinished[0].title}"! 🌟`);
          } else {
            const tomorrowTitles = tomorrowUnfinished.map((t: any) => `"${t.title}"`).join(", ");
            setMessage(`Reminder for tomorrow: You have ${tomorrowUnfinished.length} tasks scheduled: ${tomorrowTitles}! 🌟`);
          }
        }

      } catch (err) {
        console.error("Error in ReminderWatcher:", err);
      }
    }

    checkReminders();
  }, [status, token, isClosed]);

  const handleDismiss = () => {
    setIsClosed(true);
    sessionStorage.setItem("reminder_dismissed", "true");
  };

  if (isClosed || !message) return null;

  return (
    <div 
      className="fixed left-0 w-full bg-[#091A58] text-[#FAF9F7] text-xs md:text-sm py-2.5 px-6 z-40 flex items-center justify-between shadow-sm border-t border-[#FAF9F7]/10 transition-all duration-300"
      style={{ top: "72px" }}
    >
      <div className="flex items-center gap-2 mx-auto text-center font-medium">
        <span>{message}</span>
      </div>
      <button 
        onClick={handleDismiss} 
        className="text-[#FAF9F7]/80 hover:text-white text-xs font-semibold bg-white/10 hover:bg-white/20 rounded-full px-3 py-1 transition cursor-pointer flex-shrink-0"
      >
        Dismiss
      </button>
    </div>
  );
}