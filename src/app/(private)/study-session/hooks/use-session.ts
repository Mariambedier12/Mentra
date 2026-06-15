"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { SessionData, TabType } from "../types/session";
import { mockSession } from "../data/mock-session";

const BASE_URL = "http://mentraa.runasp.net";

export const useStudySession = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const documentId = Number(searchParams.get("documentId")) || 1;
  const token = (session as any)?.user?.token;

  const [sessionId, setSessionId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("summary");
  const [sessionData, setSessionData] = useState<SessionData>(mockSession);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<"study" | "break">("study");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const settingsTimeRef = useRef(false);
  const studyDurationRef = useRef(25 * 60);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const prevIsRunningRef = useRef(false);
  const bgAudioTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (sessionId) {
      setSessionData(prev => ({ ...prev, sessionId }));
    }
  }, [sessionId]);

  useEffect(() => {
    setSessionData(prev => ({ ...prev, duration: totalTime }));
  }, [totalTime]);

  // Clean up bgAudio and timeout on unmount
  useEffect(() => {
    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
      if (bgAudioTimeoutRef.current) {
        clearTimeout(bgAudioTimeoutRef.current);
      }
    };
  }, []);

  // Background music loop effect with a 3-second transition delay
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!bgAudioRef.current) {
      bgAudioRef.current = new Audio("/sounds/Walen - Dark Heart .mp3");
      bgAudioRef.current.loop = true;
    }

    if (bgAudioTimeoutRef.current) {
      clearTimeout(bgAudioTimeoutRef.current);
      bgAudioTimeoutRef.current = null;
    }

    if (isRunning && mode === "study") {
      // Delay playing background music by 3 seconds to avoid overlap with timer bell alert
      bgAudioTimeoutRef.current = setTimeout(() => {
        if (bgAudioRef.current) {
          bgAudioRef.current.play().catch(e => console.log("Background music play error:", e));
        }
      }, 3000);
    } else {
      bgAudioRef.current.pause();
    }

    return () => {
      if (bgAudioTimeoutRef.current) {
        clearTimeout(bgAudioTimeoutRef.current);
      }
    };
  }, [isRunning, mode]);

  // Play timer sound when timer starts running
  useEffect(() => {
    if (isRunning && !prevIsRunningRef.current && mode === "study" && !isLoading) {
      const audio = new Audio("/sounds/timer.mp3");
      audio.play().catch(e => console.log("Timer audio play error:", e));
    }
    prevIsRunningRef.current = isRunning;
  }, [isRunning, mode, isLoading]);

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);

    let userAdhdLevel: string | null = null;
    let customStudyTime: number | null = null;

    // Fetch user ADHD level
    const fetchMyLevel = fetch(`${BASE_URL}/api/Quiz/my-level`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.level) {
          userAdhdLevel = data.level;
        }
      })
      .catch((err) => console.error("Error fetching my-level:", err));

    // Fetch study settings
    const fetchStudySettings = fetch(`${BASE_URL}/api/Quiz/study-settings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.studyTime) {
          customStudyTime = data.studyTime * 60;
        }
      })
      .catch((err) => console.error("Error fetching study-settings:", err));

    // Fetch start session
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

    // Fetch summary and then resolve everything together
    Promise.all([fetchMyLevel, fetchStudySettings])
      .then(() => {
        return fetch(`${BASE_URL}/api/Document/summary/${documentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((res) => res.json())
      .then((data) => {
        let summaryAdhdLevel: string | null = null;
        let parsed: any = null;

        if (data.summary) {
          try {
            parsed = typeof data.summary === "string" ? JSON.parse(data.summary) : data.summary;
            if (parsed && parsed.adhd_level) {
              summaryAdhdLevel = parsed.adhd_level;
            }
          } catch (err) {
            console.error("Failed to parse summary API response JSON:", err);
          }
        }

        // Determine final ADHD level (prefer my-level API, fall back to summary adhd_level)
        const finalLevel = userAdhdLevel || summaryAdhdLevel;

        // Determine study session duration
        let secs = 25 * 60; // Default: 25 minutes
        if (finalLevel) {
          const lvl = finalLevel.toLowerCase();
          if (lvl.includes("mild")) secs = 25 * 60;
          else if (lvl.includes("moderate")) secs = 15 * 60;
          else if (lvl.includes("severe") || lvl.includes("high")) secs = 10 * 60;
        } else if (customStudyTime) {
          // If no ADHD level is detected, use custom study settings
          secs = customStudyTime;
        }

        setTotalTime(secs);
        setTimeLeft(secs);
        studyDurationRef.current = secs;

        // Set session data
        if (parsed) {
          setSessionData({
            sessionId: sessionId || 1,
            documentId,
            duration: secs,
            adhdLevel: finalLevel || undefined,
            studyRecommendation: parsed.study_recommendation || undefined,
            finalSummary: parsed.final_summary || undefined,
            chunks: parsed.chunks || undefined,
            finalQuiz: parsed.final_quiz || undefined,
            summary: {
              title: parsed.final_summary ? "Summary Overview" : "Core Concepts",
              points: parsed.chunks?.map((chunk: any, i: number) => ({
                heading: `Section ${i + 1}`,
                text: chunk.summary || "",
              })) || parsed.keyPoints?.map((kp: string) => ({
                heading: "",
                text: kp,
              })) || mockSession.summary.points,
            },
          });
        } else {
          setSessionData(prev => ({
            ...prev,
            duration: secs,
            adhdLevel: finalLevel || undefined,
          }));
        }
      })
      .catch((err) => {
        console.error("Fetch session data error:", err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsRunning(true);
      });

  }, [token, documentId]);

  // Timer Tick Effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
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

  // Transition mode effect when timeLeft hits 0
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      const alertAudio = new Audio("/sounds/timer.mp3");
      alertAudio.play().catch(e => console.log("Alert play error:", e));

      const nextMode = mode === "study" ? "break" : "study";
      setMode(nextMode);

      let newSecs = 5 * 60; // 5 mins break
      if (nextMode === "study") {
        newSecs = studyDurationRef.current;
      }
      setTotalTime(newSecs);
      setTimeLeft(newSecs);
    }
  }, [timeLeft, isRunning, mode]);

  const toggle = () => setIsRunning((prev) => !prev);
  
  const reset = () => {
    setMode("study");
    const secs = studyDurationRef.current;
    setTotalTime(secs);
    setTimeLeft(secs);
    setIsRunning(false);
  };

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
    mode,
    toggle,
    reset,
    endSession,
    activeTab,
    setActiveTab,
    progress,
    sessionData,
    isLoading,
  };
};