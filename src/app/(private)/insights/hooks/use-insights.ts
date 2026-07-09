"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { InsightsData } from "../types/insights";
import { mockInsights } from "../data/mock-insights";
import { fetchWeeklySummary } from "../services/insights-api";

export const useInsights = () => {
  const { data: session, status } = useSession();
  const token = (session as any)?.user?.token;
  const [insights, setInsights] = useState<InsightsData>(mockInsights);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchWeeklySummary(token)
      .then((data) => {
        setInsights(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, status]);

  return { insights, loading };
};