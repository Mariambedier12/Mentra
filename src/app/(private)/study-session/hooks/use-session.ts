"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { SessionData, TabType } from "../types/session";
import { mockSession } from "../data/mock-session";

const BASE_URL = "http://mentraa.runasp.net";

const levelDuration: Record<string, number> = {
  "Mild": 40 * 60,
  "Mild ADHD": 40 * 60,
  "Moderate": 30 * 60,
  "Moderate ADHD": 30 * 60,
  "Severe": 20 * 60,
  "Severe ADHD": 20 * 60,
};

export const useStudySession = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const documentId = Number(searchParams.get("documentId")) || 1;
  const token = (session as any)?.user?.token;

  const [adhdLevel, setAdhdLevel] = useState("Mild");
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("summary");
  const [sessionData] = useState<SessionData>(mockSession);

  // جيب الـ level وابدأ الـ session
  useEffect(() => {
    if (!token) return;

    // جيب الـ level
    fetch(`${BASE_URL}/api/Quiz/my-level`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => { if (data.level) setAdhdLevel(data.level); });

    // ابدأ الـ session
    fetch(`${BASE_URL}/api/Insights/start-session`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ documentId }),
    })
      .then((res) => res.json())
      .then((data) => { if (data.sessionId) setSessionId(data.sessionId); });

  }, [token]);

  const totalTime = levelDuration[adhdLevel] || 40 * 60;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(totalTime);
  }, [totalTime]);

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

  const endSession = async () => {
    if (!sessionId || !token) return;
    await fetch(`${BASE_URL}/api/Insights/end-session/${sessionId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

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
    endSession,
    activeTab,
    setActiveTab,
    progress,
    sessionData,
  };
};