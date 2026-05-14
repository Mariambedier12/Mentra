"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { SessionData, TabType } from "../types/session";
import { mockSession } from "../data/mock-session";

const levelDuration: Record<string, number> = {
  "Mild": 40 * 60,
  "Moderate": 30 * 60,
  "Moderate ADHD": 30 * 60,
  "Mild ADHD": 40 * 60,
  "Severe": 20 * 60,
  "Severe ADHD": 20 * 60,
};

export const useStudySession = () => {
  const { data: session } = useSession();
  const level = (session as any)?.user?.adhdLevel || "Mild";

  const totalTime = levelDuration[level] || 40 * 60;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("summary");
  const [sessionData] = useState<SessionData>({ ...mockSession, duration: totalTime });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const toggle = () => setIsRunning((prev) => !prev);
  const reset = () => { setTimeLeft(totalTime); setIsRunning(false); };

  const progress = Math.round(((totalTime - timeLeft) / totalTime) * 100);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isRunning,
    toggle,
    reset,
    activeTab,
    setActiveTab,
    progress,
    sessionData,
  };
};